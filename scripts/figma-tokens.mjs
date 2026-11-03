import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const outDir = path.join(projectRoot, 'docs', 'public', 'assets', 'figma');

const REM_PX = 16;

const COLLECTIONS = {
  primitives: 'Corncob Primitives',
  semantic: 'Corncob Semantic',
  components: 'Corncob Components',
};

const MODES = ['light', 'dark'];
const ORDERED_COLLECTION_NAMES = [COLLECTIONS.primitives, COLLECTIONS.semantic, COLLECTIONS.components];
const LEGACY_COLLECTION_FILE_NAMES = MODES.flatMap((mode) => [`corncob-primitives.${mode}.tokens.json`, `corncob-semantic.${mode}.tokens.json`, `corncob-components.${mode}.tokens.json`]);

/** @type {Record<string, 'primitives' | 'semantic' | 'components'>} */
const FILE_COLLECTION = {
  'src/tokens/colors.css': 'primitives',
  'src/tokens/spacing.css': 'primitives',
  'src/tokens/sizes.css': 'primitives',
  'src/tokens/typography.css': 'primitives',
  'src/tokens/animations.css': 'primitives',
  'src/tokens/borders.css': 'primitives',
  'src/tokens/forms.css': 'semantic',
  'src/tokens/status.css': 'semantic',
  'src/tokens/shadows.css': 'semantic',
};

/** Variables routed to semantic despite living in a primitives file. */
const SEMANTIC_OVERRIDES = new Set(['--cc-body--background', '--cc-body--color', '--cc-border--color']);

/** Variables that Figma cannot represent cleanly, mapped to explanatory notes. */
const UNSKIPPABLE_VARIABLES = new Map([
  ['--cc-form--item--border', 'Complex shorthand border property cannot be fully represented in Figma.'],
  ['--cc-form--item--focus-ring', 'Complex multi-property focus ring cannot be represented as a single Figma variable.'],
  ['--cc-form--item--focus-ring--inverted', 'Complex multi-property focus ring cannot be represented as a single Figma variable.'],
  ['--cc-form--item--focus-ring--active', 'Complex multi-property focus ring cannot be represented as a single Figma variable.'],
  ['--cc-form--item--focus-ring--disabled', 'Complex multi-property focus ring cannot be represented as a single Figma variable.'],
  ['--cc-status--success--box-shadow', 'Complex shadow value with multiple layers cannot be represented in Figma.'],
  ['--cc-status--error--box-shadow', 'Complex shadow value with multiple layers cannot be represented in Figma.'],
  ['--cc-status--warning--box-shadow', 'Complex shadow value with multiple layers cannot be represented in Figma.'],
  ['--cc-status--info--box-shadow', 'Complex shadow value with multiple layers cannot be represented in Figma.'],
  ['--cc-shadow--drop', 'Complex shadow value with multiple layers cannot be represented in Figma.'],
  ['--cc-shadow--drop--heavy', 'Complex shadow value with multiple layers cannot be represented in Figma.'],
  ['--cc-shadow--inset', 'Complex shadow value with multiple layers cannot be represented in Figma.'],
  ['--cc-shadow--inset--heavy', 'Complex shadow value with multiple layers cannot be represented in Figma.'],
  ['--cc-shadow--text', 'Complex shadow value with multiple layers cannot be represented in Figma.'],
  ['--cc-shadow--text--reverse', 'Complex shadow value with multiple layers cannot be represented in Figma.'],
]);

function cssVarToTokenKey(name) {
  if (name.startsWith('--cc-')) {
    return name.slice(5);
  }
  if (name.startsWith('--')) {
    return name.slice(2);
  }
  return name;
}

function normalizeCssValue(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function parseCssVariables(content) {
  /** @type {Record<string, string>} */
  const vars = {};
  const declPattern = /(--[a-zA-Z0-9-]+)\s*:\s*([\s\S]*?);/g;
  let match;

  while ((match = declPattern.exec(content)) !== null) {
    vars[match[1]] = normalizeCssValue(match[2]);
  }

  return vars;
}

function parseLightDark(value) {
  const match = value.match(/^light-dark\(\s*(#[0-9a-fA-F]{3,8})\s*,\s*(#[0-9a-fA-F]{3,8})\s*\)$/);
  if (!match) return null;
  return { light: normalizeHex(match[1]), dark: normalizeHex(match[2]) };
}

function normalizeHex(hex) {
  let value = hex.replace('#', '').toLowerCase();
  if (value.length === 3) {
    value = value
      .split('')
      .map((char) => char + char)
      .join('');
  }
  return `#${value}`;
}

function hexToDtcgColor(hex) {
  const normalized = normalizeHex(hex).slice(1);
  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;

  return {
    colorSpace: 'srgb',
    components: [r, g, b],
    alpha: 1,
    hex: `#${normalized}`,
  };
}

function parseVarReference(value) {
  const match = value.match(/^var\(\s*(--[a-zA-Z0-9-]+)\s*\)$/);
  return match ? match[1] : null;
}

function parseRgbFrom(value) {
  const match = value.match(/^rgb\(from\s+var\(\s*(--[a-zA-Z0-9-]+)\s*\)\s+r\s+g\s+b\s*\/\s*([0-9.]+%?)\)$/);
  if (!match) return null;
  return { ref: match[1], alpha: parseAlpha(match[2]) };
}

function parseAlpha(raw) {
  if (raw.endsWith('%')) {
    return parseFloat(raw) / 100;
  }
  return parseFloat(raw);
}

function applyAlpha(color, alpha) {
  return {
    ...color,
    alpha,
    hex: color.hex,
  };
}

function parseDimension(value, entry) {
  const pxMatch = value.match(/^(-?[0-9.]+)px$/);
  if (pxMatch) {
    return { value: round(parseFloat(pxMatch[1])), unit: 'px' };
  }

  const remMatch = value.match(/^(-?[0-9.]+)rem$/);
  if (remMatch) {
    return { value: round(parseFloat(remMatch[1]) * REM_PX), unit: 'px' };
  }

  const percentMatch = value.match(/^(-?[0-9.]+)%$/);

  if (percentMatch) {
    if (parseFloat(percentMatch[1]) === 50) {
      return { value: 9999, unit: 'px', description: 'Actual css variable is 50%, Figma workaround' };
    }
    return { value: parseFloat(percentMatch[1]), unit: '%' };
  }

  return null;
}

function parseDuration(value) {
  const match = value.match(/^(-?[0-9.]+)ms$/);
  if (!match) return null;
  return { value: parseFloat(match[1]), unit: 'ms' };
}

function round(value) {
  return Math.round(value * 1000) / 1000;
}

function tokenReference(collectionName, tokenKey) {
  return `{${collectionName}.${tokenKey}}`;
}

function parseShadowLength(raw) {
  const pxMatch = raw.match(/^(-?[0-9.]+)px$/);
  if (pxMatch) {
    return { value: round(parseFloat(pxMatch[1])), label: `${round(parseFloat(pxMatch[1]))}px` };
  }

  const numberMatch = raw.match(/^(-?[0-9.]+)$/);
  if (numberMatch) {
    return { value: round(parseFloat(numberMatch[1])), label: `${round(parseFloat(numberMatch[1]))}` };
  }

  return null;
}

function splitTopLevelCommas(value) {
  /** @type {string[]} */
  const parts = [];
  let current = '';
  let depth = 0;

  for (const char of value) {
    if (char === '(') depth += 1;
    if (char === ')') depth = Math.max(0, depth - 1);

    if (char === ',' && depth === 0) {
      if (current.trim()) {
        parts.push(current.trim());
      }
      current = '';
      continue;
    }

    current += char;
  }

  if (current.trim()) {
    parts.push(current.trim());
  }

  return parts;
}

function resolveShadowColorToken(colorRaw, mode, registry, numericVars, colorCache) {
  const colorVarRef = parseVarReference(colorRaw);
  if (colorVarRef && registry[colorVarRef]) {
    const target = registry[colorVarRef];
    return {
      $type: 'color',
      $value: tokenReference(target.collection, target.tokenKey),
      $description: `Linked alias pointing to the ${target.tokenKey} variable color.`,
    };
  }

  const colorValue = resolveColor(colorRaw, mode, registry, numericVars, colorCache);
  if (!colorValue) {
    return null;
  }

  return {
    $type: 'color',
    $value: colorValue,
    $description: `Resolved from CSS color value (${colorRaw}).`,
  };
}

function parseSingleShadowLayer(rawLayer, mode, registry, numericVars, colorCache) {
  let layer = rawLayer.trim();
  if (!layer) {
    return null;
  }

  if (layer.startsWith('inset ')) {
    layer = layer.slice(6).trim();
  }

  const colorMatch = layer.match(/(var\(\s*--[a-zA-Z0-9-]+\s*\)|rgb\(from\s+var\(\s*--[a-zA-Z0-9-]+\s*\)\s+r\s+g\s+b\s*\/\s*[0-9.]+%?\)|#[0-9a-fA-F]{3,8}|light-dark\(\s*#[0-9a-fA-F]{3,8}\s*,\s*#[0-9a-fA-F]{3,8}\s*\))$/);
  if (!colorMatch) {
    return null;
  }

  const colorRaw = colorMatch[1];
  const lengthsRaw = layer.slice(0, colorMatch.index).trim();
  const lengthParts = lengthsRaw.split(/\s+/).filter(Boolean);
  if (lengthParts.length < 3 || lengthParts.length > 4) {
    return null;
  }

  const [xRaw, yRaw, blurRaw, spreadRaw] = lengthParts;
  const x = parseShadowLength(xRaw);
  const y = parseShadowLength(yRaw);
  const blur = parseShadowLength(blurRaw);
  const spread = spreadRaw ? parseShadowLength(spreadRaw) : { value: 0, label: '0' };

  if (!x || !y || !blur || !spread) {
    return null;
  }

  const color = resolveShadowColorToken(colorRaw, mode, registry, numericVars, colorCache);
  if (!color) {
    return null;
  }

  return {
    'x-offset': {
      $type: 'number',
      $value: x.value,
      $description: `CSS box-shadow X-offset (${x.label})`,
    },
    'y-offset': {
      $type: 'number',
      $value: y.value,
      $description: `CSS box-shadow Y-offset (${y.label})`,
    },
    blur: {
      $type: 'number',
      $value: blur.value,
      $description: `CSS box-shadow Blur radius (${blur.label})`,
    },
    spread: {
      $type: 'number',
      $value: spread.value,
      $description: `CSS box-shadow Spread radius (${spread.label})`,
    },
    color,
  };
}

function resolveShadowToken(raw, mode, registry, numericVars, colorCache) {
  if (raw === 'none') {
    return {
      $type: 'string',
      $value: 'none',
    };
  }

  const layers = splitTopLevelCommas(raw);
  if (layers.length === 0) {
    return null;
  }

  const parsedLayers = layers.map((layer) => parseSingleShadowLayer(layer, mode, registry, numericVars, colorCache));
  if (parsedLayers.some((layer) => !layer)) {
    return null;
  }

  if (parsedLayers.length === 1) {
    return parsedLayers[0];
  }

  return Object.fromEntries(parsedLayers.map((layer, index) => [`layer-${index + 1}`, layer]));
}

function loadTokenSources() {
  /** @type {Array<{ file: string, collection: 'primitives' | 'semantic' | 'components', vars: Record<string, string> }>} */
  const sources = [];

  for (const [file, collection] of Object.entries(FILE_COLLECTION)) {
    const absolutePath = path.join(projectRoot, file);
    sources.push({
      file,
      collection,
      vars: parseCssVariables(readFileSync(absolutePath, 'utf8')),
    });
  }

  const componentsDir = path.join(projectRoot, 'src/components');
  for (const entry of walkComponentTokenFiles(componentsDir)) {
    sources.push({
      file: path.relative(projectRoot, entry),
      collection: 'components',
      vars: parseCssVariables(readFileSync(entry, 'utf8')),
    });
  }

  return sources;
}

function walkComponentTokenFiles(dir) {
  /** @type {string[]} */
  const files = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkComponentTokenFiles(absolutePath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('-tokens.css')) {
      files.push(absolutePath);
    }
  }

  return files;
}

function buildRegistry(sources) {
  /** @type {Record<string, { collection: string, raw: string, tokenKey: string, unskippable?: boolean }>} */
  const registry = {};

  for (const source of sources) {
    for (const [name, raw] of Object.entries(source.vars)) {
      if (!name.startsWith('--cc-') && !name.startsWith('--radius-') && !name.startsWith('--transition-')) {
        continue;
      }

      let collection = source.collection;
      if (SEMANTIC_OVERRIDES.has(name)) {
        collection = 'semantic';
      }

      registry[name] = {
        collection: COLLECTIONS[collection],
        raw,
        tokenKey: cssVarToTokenKey(name),
        unskippable: UNSKIPPABLE_VARIABLES.has(name),
      };
    }
  }

  return registry;
}

function resolveNumericVars(allVars) {
  /** @type {Record<string, number>} */
  const resolved = {
    '--cc-spacing-unit': 0.75 * REM_PX,
    '--cc-size-ratio': 1.25,
    '--cc-size-0': REM_PX,
  };

  for (let pass = 0; pass < 32; pass += 1) {
    let changed = false;

    for (const [name, raw] of Object.entries(allVars)) {
      if (resolved[name] !== undefined) {
        continue;
      }

      const dimension = parseDimension(raw, name);
      if (dimension && dimension.unit === 'px') {
        resolved[name] = dimension.value;
        changed = true;
        continue;
      }

      const calcValue = evaluateCalc(raw, resolved);
      if (calcValue !== null) {
        resolved[name] = calcValue;
        changed = true;
      }
    }

    if (!changed) {
      break;
    }
  }

  return resolved;
}

function evaluateCalc(raw, resolved) {
  const calcMatch = raw.match(/^calc\((.+)\)$/);
  if (!calcMatch) {
    return null;
  }

  let expression = calcMatch[1];
  let unresolved = false;

  expression = expression.replace(/var\(\s*(--[a-zA-Z0-9-]+)\s*\)/g, (_, varName) => {
    if (resolved[varName] === undefined) {
      unresolved = true;
      return 'NaN';
    }
    return String(resolved[varName]);
  });

  if (unresolved) {
    return null;
  }

  if (!/^[0-9+\-*/().\sNa]+$/.test(expression)) {
    return null;
  }

  // eslint-disable-next-line no-new-func
  const value = Function(`"use strict"; return (${expression});`)();
  return typeof value === 'number' && Number.isFinite(value) ? round(value) : null;
}

function resolveColor(raw, mode, registry, numericVars, colorCache, seenVars = new Set()) {
  const cacheKey = `${mode}:${raw}`;
  if (colorCache.has(cacheKey)) {
    return colorCache.get(cacheKey);
  }

  const lightDark = parseLightDark(raw);
  if (lightDark) {
    const color = hexToDtcgColor(lightDark[mode]);
    colorCache.set(cacheKey, color);
    return color;
  }

  const rgbFrom = parseRgbFrom(raw);
  if (rgbFrom) {
    const baseRaw = registry[rgbFrom.ref]?.raw;
    if (!baseRaw) {
      return null;
    }
    const baseColor = resolveColor(baseRaw, mode, registry, numericVars, colorCache);
    if (!baseColor) {
      return null;
    }
    const color = applyAlpha(baseColor, rgbFrom.alpha);
    colorCache.set(cacheKey, color);
    return color;
  }

  const hexMatch = raw.match(/^#[0-9a-fA-F]{3,8}$/);
  if (hexMatch) {
    const color = hexToDtcgColor(raw);
    colorCache.set(cacheKey, color);
    return color;
  }

  const varRef = parseVarReference(raw);
  if (varRef && registry[varRef]) {
    if (seenVars.has(varRef)) {
      return null;
    }
    seenVars.add(varRef);
    const resolved = resolveColor(registry[varRef].raw, mode, registry, numericVars, colorCache, seenVars);
    seenVars.delete(varRef);
    if (resolved) {
      colorCache.set(cacheKey, resolved);
      return resolved;
    }
  }

  return null;
}

function resolveToken(name, mode, registry, numericVars, colorCache, seenTokens = new Set()) {
  if (seenTokens.has(name)) {
    return null;
  }
  seenTokens.add(name);

  const entry = registry[name];
  if (!entry) {
    seenTokens.delete(name);
    return null;
  }

  const raw = entry.raw;

  const lightDark = parseLightDark(raw);
  if (lightDark) {
    const token = {
      $type: 'color',
      $value: hexToDtcgColor(lightDark[mode]),
    };
    seenTokens.delete(name);
    return token;
  }

  const rgbFrom = parseRgbFrom(raw);
  if (rgbFrom) {
    const baseRaw = registry[rgbFrom.ref]?.raw;
    if (!baseRaw) {
      seenTokens.delete(name);
      return null;
    }
    const baseColor = resolveColor(baseRaw, mode, registry, numericVars, colorCache);
    if (!baseColor) {
      seenTokens.delete(name);
      return null;
    }
    const token = {
      $type: 'color',
      $value: applyAlpha(baseColor, rgbFrom.alpha),
    };
    seenTokens.delete(name);
    return token;
  }

  const shadowToken = resolveShadowToken(raw, mode, registry, numericVars, colorCache);
  if (shadowToken) {
    seenTokens.delete(name);
    return shadowToken;
  }

  const varRef = parseVarReference(raw);
  if (varRef && registry[varRef]) {
    const target = registry[varRef];
    const type = inferType(target.raw, registry, numericVars);
    if (type === 'shadow') {
      const resolvedShadow = resolveToken(varRef, mode, registry, numericVars, colorCache, seenTokens);
      seenTokens.delete(name);
      return resolvedShadow;
    }
    const token = {
      $type: type,
      $value: tokenReference(target.collection, target.tokenKey),
    };
    seenTokens.delete(name);
    return token;
  }

  if (numericVars[name] !== undefined) {
    const token = {
      $type: 'dimension',
      $value: { value: numericVars[name], unit: 'px' },
    };
    seenTokens.delete(name);
    return token;
  }

  const dimension = parseDimension(raw, name);
  if (dimension) {
    const token = {
      $type: 'dimension',
      $value: dimension,
    };
    seenTokens.delete(name);
    return token;
  }

  const duration = parseDuration(raw);
  if (duration) {
    const token = {
      $type: 'duration',
      $value: duration,
    };
    seenTokens.delete(name);
    return token;
  }

  if (/^-?[0-9.]+$/.test(raw)) {
    const token = {
      $type: 'number',
      $value: parseFloat(raw),
    };
    seenTokens.delete(name);
    return token;
  }

  if (/^#[0-9a-fA-F]{3,8}$/.test(raw)) {
    const token = {
      $type: 'color',
      $value: hexToDtcgColor(raw),
    };
    seenTokens.delete(name);
    return token;
  }

  if (/^(none|solid|ease-out|ease-in-out)$/.test(raw)) {
    const token = {
      $type: 'string',
      $value: raw,
    };
    seenTokens.delete(name);
    return token;
  }

  seenTokens.delete(name);
  return null;
}

function inferType(raw, registry, numericVars) {
  if (parseLightDark(raw) || parseRgbFrom(raw) || /^#[0-9a-fA-F]{3,8}$/.test(raw)) {
    return 'color';
  }

  const varRef = parseVarReference(raw);
  if (varRef && registry[varRef]) {
    return inferType(registry[varRef].raw, registry, numericVars);
  }

  if (parseDuration(raw)) {
    return 'duration';
  }

  if (raw !== 'none' && resolveShadowToken(raw, MODES[0], registry, numericVars, new Map())) {
    return 'shadow';
  }

  if (parseDimension(raw) || /^calc\(/.test(raw)) {
    return 'dimension';
  }

  if (/^-?[0-9.]+$/.test(raw)) {
    return 'number';
  }

  return 'string';
}

function buildCollectionFiles(registry, allVars) {
  const numericVars = resolveNumericVars(allVars);
  /** @type {Record<string, Record<string, Record<string, unknown>>>} */
  const files = {};

  for (const mode of MODES) {
    /** @type {Map<string, Record<string, unknown>>} */
    const collections = new Map(ORDERED_COLLECTION_NAMES.map((collectionName) => [collectionName, {}]));
    const colorCache = new Map();

    for (const [name] of Object.entries(registry)) {
      const entry = registry[name];

      if (entry.unskippable) {
        const { collection, tokenKey } = entry;
        const parsedToken = resolveShadowToken(entry.raw, mode, registry, numericVars, colorCache) || resolveToken(name, mode, registry, numericVars, colorCache);
        if (parsedToken) {
          collections.get(collection)[tokenKey] = parsedToken;
          continue;
        }

        collections.get(collection)[tokenKey] = {
          $type: 'string',
          $value: entry.raw,
          $description: entry.raw,
          devNote: UNSKIPPABLE_VARIABLES.get(name),
        };
        continue;
      }

      const token = resolveToken(name, mode, registry, numericVars, colorCache);
      if (!token) {
        continue;
      }

      const { collection, tokenKey } = entry;
      collections.get(collection)[tokenKey] = token;
    }

    files[`corncob.${mode}.tokens.json`] = Object.fromEntries(ORDERED_COLLECTION_NAMES.map((collectionName) => [collectionName, sortKeys(collections.get(collectionName))]));
  }

  return files;
}

function sortKeys(object) {
  return Object.fromEntries(Object.entries(object).sort(([a], [b]) => a.localeCompare(b)));
}

function main() {
  const sources = loadTokenSources();
  const allVars = Object.assign({}, ...sources.map((source) => source.vars));
  const registry = buildRegistry(sources);
  const files = buildCollectionFiles(registry, allVars);

  mkdirSync(outDir, { recursive: true });
  for (const fileName of LEGACY_COLLECTION_FILE_NAMES) {
    const legacyPath = path.join(outDir, fileName);
    if (existsSync(legacyPath)) {
      unlinkSync(legacyPath);
    }
  }

  for (const [fileName, content] of Object.entries(files)) {
    const outputPath = path.join(outDir, fileName);
    writeFileSync(outputPath, `${JSON.stringify(content, null, 2)}\n`);
  }

  const tokenCount = Object.values(files).reduce((total, file) => {
    return (
      total +
      ORDERED_COLLECTION_NAMES.reduce((collectionTotal, collectionName) => {
        return collectionTotal + Object.keys(file[collectionName]).length;
      }, 0)
    );
  }, 0);

  console.log(`Exported ${tokenCount} token entries across ${Object.keys(files).length} files:`);
  for (const fileName of Object.keys(files).sort()) {
    console.log(`  docs/public/assets/figma/${fileName}`);
  }
}

try {
  main();
} catch (error) {
  console.error('Figma token export failed:', error.message);
  process.exitCode = 1;
}
