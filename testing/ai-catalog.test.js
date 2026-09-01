import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..');

const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));

const readText = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const listFiles = (dir, predicate) =>
  fs.readdirSync(dir).filter((name) => predicate(name, path.join(dir, name)));

const pkg = readJson('package.json');
const catalog = readJson('components.json');
const tokens = readJson('tokens.json');
const layouts = readJson('layouts.json');

const sourceComponentDirs = listFiles(path.join(root, 'src/components'), (_, fullPath) =>
  fs.statSync(fullPath).isDirectory()
);

const tokenFiles = listFiles(path.join(root, 'src/tokens'), (name) => name.endsWith('.css'));

describe('AI catalog sync', () => {
  test('manifest versions match package.json', () => {
    expect(catalog.version).toBe(pkg.version);
    expect(tokens.metadata.version).toBe(pkg.version);
    expect(layouts.version).toBe(pkg.version);
  });

  test('every catalog component has an explicit implemented flag', () => {
    for (const [key, component] of Object.entries(catalog.components)) {
      expect({ key, implemented: component.implemented }).toEqual({
        key,
        implemented: expect.any(Boolean),
      });
    }
  });

  test('implemented components have source, canonical examples, and no placeholder markup', () => {
    for (const [key, component] of Object.entries(catalog.components)) {
      if (!component.implemented) continue;

      expect(component.sourceDir).toBeTruthy();
      expect(fs.existsSync(path.join(root, component.sourceDir))).toBe(true);
      expect(component.example).toEqual(expect.any(String));
      expect(component.example.trim()).not.toBe('...');
      expect(component.example).not.toMatch(/>\s*\.\.\.\s*</);
      expect(component.baseClass).toBeTruthy();
    }
  });

  test('unimplemented components have no example markup or sourceDir', () => {
    for (const [key, component] of Object.entries(catalog.components)) {
      if (component.implemented) continue;

      expect({
        key,
        example: component.example,
        fullExamples: component.fullExamples,
        sourceDir: component.sourceDir,
      }).toEqual({
        key,
        example: undefined,
        fullExamples: undefined,
        sourceDir: undefined,
      });
    }
  });

  test('every source component directory is referenced by an implemented catalog entry', () => {
    const referenced = new Set(
      Object.values(catalog.components)
        .filter((component) => component.implemented)
        .map((component) => path.basename(component.sourceDir))
    );

    expect([...sourceComponentDirs].sort()).toEqual([...referenced].sort());
  });

  test('implemented baseClass appears in component CSS', () => {
    for (const [key, component] of Object.entries(catalog.components)) {
      if (!component.implemented) continue;

      const sourceDir = path.join(root, component.sourceDir);
      const css = listFiles(sourceDir, (name) => name.endsWith('.css'))
        .map((name) => fs.readFileSync(path.join(sourceDir, name), 'utf8'))
        .join('\n');

      expect({ key, cssContainsBaseClass: css.includes(`.${component.baseClass}`) }).toEqual({
        key,
        cssContainsBaseClass: true,
      });
    }
  });

  test('catalog custom elements are defined in source JS', () => {
    for (const [key, component] of Object.entries(catalog.components)) {
      if (!component.implemented || !component.customElement) continue;

      const sourceDir = path.join(root, component.sourceDir);
      const js = listFiles(
        sourceDir,
        (name) => name.endsWith('.js') && !name.includes('.visual.') && !name.includes('.test.')
      )
        .map((name) => fs.readFileSync(path.join(sourceDir, name), 'utf8'))
        .join('\n');

      const defined = new RegExp(
        `customElements\\.define\\(['"]${component.customElement}['"]`
      ).test(js);

      expect({ key, customElement: component.customElement, defined }).toEqual({
        key,
        customElement: component.customElement,
        defined: true,
      });
    }
  });

  test('token file lists match src/tokens', () => {
    const expected = tokenFiles.map((name) => `src/tokens/${name}`).sort();
    expect([...catalog.designTokens.files].sort()).toEqual(expected);
    expect([...tokens.metadata.files].sort()).toEqual(expected);
  });

  test('root llms files match docs/public copies', () => {
    expect(readText('llms.txt')).toBe(readText('docs/public/llms.txt'));
    expect(readText('llms-full.txt')).toBe(readText('docs/public/llms-full.txt'));
  });
});
