import { defineConfig } from 'vite';
import { resolve } from 'path';
import viteString from 'vite-plugin-string';
import path from 'node:path';
import fs from 'node:fs';

function renderTemplate(template, locals) {
  return template.replace(/{{\s*([^{}\s]+)\s*}}/g, (_, key) => {
    return locals[key] !== undefined ? String(locals[key]) : '';
  });
}

function parseLocals(localsStr) {
  if (!localsStr) return {};
  const cleaned = localsStr.trim().replace(/^['"]|['"]$/g, '');
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error(`Failed to parse locals attribute: ${localsStr}`, err);
    return {};
  }
}

function processIncludes(html, parentDir, parentLocals = {}, visited = new Set()) {
  // Flexible regex: supports self-closing tag, quotes, extra whitespace

  const includeRegex = /<include\s+src="([^"]+)"(?:\s+locals=(['"])([\s\S]*?)\2)?\s*(?:\/)?>/gi;

  let result = html;
  const matches = [];

  let match;
  while ((match = includeRegex.exec(html)) !== null) {
    const [, src, , localsStr] = match;
    matches.push({ full: match[0], src, localsStr });
  }

  for (const { full, src, localsStr } of matches) {
    const filePath = path.resolve(parentDir, src.trim());

    if (visited.has(filePath)) {
      console.warn(`Circular include prevented: ${src}`);
      result = result.replace(full, `<!-- Circular include: ${src} -->`);
      continue;
    }

    visited.add(filePath);

    let content;
    try {
      content = fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
      console.error(`Cannot include file: ${src} (${filePath})`);
      content = `<!-- Failed to include: ${src} -->`;
      continue;
    }

    const mergedLocals = { ...parentLocals, ...parseLocals(localsStr) };
    content = renderTemplate(content, mergedLocals);
    content = processIncludes(content, path.dirname(filePath), mergedLocals, new Set(visited));

    result = result.replace(full, content);
  }

  return result;
}

/**
 * To include the src is relative to the location that contains the file
 * 
<include src="./partials/header.html" locals='{"title": "Welcome Home", "theme": "dark"}'></include>

where the partial looks like: 
<header class="{{ theme }}">
  <h1>{{ title }}</h1>
  <nav>...</nav>
</header>

*/
function htmlIncludePlugin() {
  return {
    name: 'custom-html-include-locals',
    enforce: 'pre',
    transformIndexHtml(html, { filename }) {
      return processIncludes(html, path.dirname(filename));
    },
  };
}

// Vite configuration that allows importing .html components as raw strings
// and serves the index.html as the entry point.

export default defineConfig({
  plugins: [htmlIncludePlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'CorncobDL',
      formats: ['es', 'umd'],
      fileName: (format) => `edl.${format === 'es' ? 'esm' : 'umd'}.js`,
    },
    // Ensures CSS is not inlined in the JS bundle (default behavior)
    cssCodeSplit: true,
    // Customize the output file name for the CSS
    cssFileName: 'corncob-dl.css',
    sourcemap: true,
    rollupOptions: {
      external: [],
      output: {
        assetFileNames: 'corn-cob-dl.css',
        globals: {},
      },
    },
    minify: 'esbuild',
  },
  server: {
    open: '/public/index.html',
    hmr: true,
  },
  preview: {
    open: '/dist/index.html',
  },
});
