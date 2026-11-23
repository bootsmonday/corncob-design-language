import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve(__dirname, '..');

const packEntries = (cwd) => {
  const output = execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
    cwd,
    encoding: 'utf8',
  });
  const parsed = JSON.parse(output);
  const packed = Array.isArray(parsed) ? parsed[0] : parsed[Object.keys(parsed)[0]];
  return packed.files.map((file) => file.path);
};

const packTarball = (cwd, destination) => {
  const output = execFileSync('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', destination], {
    cwd,
    encoding: 'utf8',
  });
  const parsed = JSON.parse(output);
  const packed = Array.isArray(parsed) ? parsed[0] : parsed[Object.keys(parsed)[0]];
  return path.join(destination, packed.filename);
};

const forbidden = (entries, pattern) => entries.filter((entry) => pattern.test(entry));

describe('published package contents', () => {
  jest.setTimeout(60000);

  test('the plain package ships the library and AI contract only', () => {
    execFileSync(process.execPath, [path.join(root, 'scripts/stage-release-package.mjs')], {
      cwd: root,
      stdio: 'pipe',
    });

    const entries = packEntries(path.join(root, '.release/npm/package'));

    expect(entries).toEqual(expect.arrayContaining([
      'package.json',
      'README.md',
      'LICENSE',
      'CHANGELOG.md',
      'dist/corncob-design-language.css',
      'dist/corncob-design-language.esm.js',
      'dist/corncob-design-language.umd.js',
      'DESIGN_SYSTEM_FOR_AI.md',
      'tokens.json',
      'components.json',
      'layouts.json',
      'llms.txt',
      'llms-full.txt',
    ]));

    expect(forbidden(entries, /\.(map|html|svg)$/)).toEqual([]);
    expect(forbidden(entries, /(^|\/)(src|packages|docs|testing|stickersheets|node_modules)\//)).toEqual([]);
    expect(entries.some((entry) => entry.endsWith('.d.ts'))).toBe(false);

    const manifest = JSON.parse(fs.readFileSync(path.join(root, '.release/npm/package/package.json'), 'utf8'));
    expect(manifest.workspaces).toBeUndefined();
    expect(manifest.devDependencies).toBeUndefined();
    expect(manifest.peerDependencies).toBeUndefined();
    expect(manifest.scripts).toBeUndefined();
    expect(manifest.main).toBe('dist/corncob-design-language.umd.js');
  });

  test('the React package ships wrappers and public types only', () => {
    const entries = packEntries(path.join(root, 'packages/react'));

    expect(entries).toEqual(expect.arrayContaining([
      'package.json',
      'src/index.js',
      'src/custom-elements.js',
      'src/components/buttons/button.jsx',
      'dist-types/index.d.ts',
      'dist-types/components/buttons/button.d.ts',
      'CHANGELOG.md',
    ]));

    expect(forbidden(entries, /\.test\./)).toEqual([]);
    expect(forbidden(entries, /stickersheet/i)).toEqual([]);
    expect(forbidden(entries, /\.html$/)).toEqual([]);
    expect(forbidden(entries, /(jest\.config|jest\.setup|tsconfig|build-types)/)).toEqual([]);
    expect(forbidden(entries, /\.map$/)).toEqual([]);
  });

  test('packed core package resolves from an isolated consumer', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'corncob-core-package-test-'));
    const tarballs = path.join(tempRoot, 'tarballs');
    const consumer = path.join(tempRoot, 'consumer');
    fs.mkdirSync(tarballs);
    fs.mkdirSync(consumer);

    try {
      execFileSync(process.execPath, [path.join(root, 'scripts/stage-release-package.mjs')], {
        cwd: root,
        stdio: 'pipe',
      });

      const coreTarball = packTarball(path.join(root, '.release/npm/package'), tarballs);

      fs.writeFileSync(path.join(consumer, 'package.json'), JSON.stringify({
        private: true,
        type: 'module',
      }));
      execFileSync('npm', [
        'install',
        '--ignore-scripts',
        '--no-audit',
        '--no-fund',
        coreTarball,
      ], {
        cwd: consumer,
        stdio: 'pipe',
      });

      const entry = path.join(consumer, 'index.js');
      fs.writeFileSync(entry, [
        "import '@bootsmonday/corncob-design-language/style.css';",
        "import { CornButtonBar, CornExpandable, CornPopover, CornSelect, CornToast, CornTooltip } from '@bootsmonday/corncob-design-language';",
        'export { CornButtonBar, CornExpandable, CornPopover, CornSelect, CornToast, CornTooltip };',
      ].join('\n'));

      const bundle = path.join(consumer, 'bundle.js');
      execFileSync(path.join(root, 'node_modules/esbuild/bin/esbuild'), [
        entry,
        '--bundle',
        '--format=esm',
        '--platform=browser',
        `--outfile=${bundle}`,
        '--log-level=warning',
      ], {
        cwd: consumer,
        stdio: 'pipe',
      });

      const bundledSource = fs.readFileSync(bundle, 'utf8');
      expect(bundledSource).toContain('customElements.define');
      [
        'corn-button-bar',
        'corn-expandable',
        'corn-popover',
        'corn-select',
        'corn-toast',
        'corn-tooltip',
      ].forEach((elementName) => expect(bundledSource).toContain(elementName));
      expect(fs.existsSync(path.join(consumer, 'bundle.css'))).toBe(true);
    } finally {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  });

  test('packed React package resolves from an isolated consumer using a local core tarball', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'corncob-package-test-'));
    const tarballs = path.join(tempRoot, 'tarballs');
    const consumer = path.join(tempRoot, 'consumer');
    fs.mkdirSync(tarballs);
    fs.mkdirSync(consumer);

    try {
      execFileSync(process.execPath, [path.join(root, 'scripts/stage-release-package.mjs')], {
        cwd: root,
        stdio: 'pipe',
      });

      const coreTarball = packTarball(path.join(root, '.release/npm/package'), tarballs);
      const reactTarball = packTarball(path.join(root, 'packages/react'), tarballs);

      fs.writeFileSync(path.join(consumer, 'package.json'), JSON.stringify({
        private: true,
        type: 'module',
      }));
      execFileSync('npm', [
        'install',
        '--ignore-scripts',
        '--no-audit',
        '--no-fund',
        '--legacy-peer-deps',
        coreTarball,
        reactTarball,
      ], {
        cwd: consumer,
        stdio: 'pipe',
      });

      const entry = path.join(consumer, 'index.js');
      fs.writeFileSync(entry, [
        "import { CornButtonBar, CornExpandable, CornPopover, CornSelect, CornToast, CornTooltip } from '@bootsmonday/corncob-design-language-react';",
        'export { CornButtonBar, CornExpandable, CornPopover, CornSelect, CornToast, CornTooltip };',
      ].join('\n'));

      const bundle = path.join(consumer, 'bundle.js');
      execFileSync(path.join(root, 'node_modules/esbuild/bin/esbuild'), [
        entry,
        '--bundle',
        '--format=esm',
        '--platform=browser',
        `--outfile=${bundle}`,
        '--external:react',
        '--external:react/*',
        '--external:react-dom',
        '--external:react-dom/*',
        '--log-level=warning',
      ], {
        cwd: consumer,
        stdio: 'pipe',
      });

      const bundledSource = fs.readFileSync(bundle, 'utf8');
      expect(bundledSource).toContain('customElements.define');
      [
        'corn-button-bar',
        'corn-expandable',
        'corn-popover',
        'corn-select',
        'corn-toast',
        'corn-tooltip',
      ].forEach((elementName) => expect(bundledSource).toContain(elementName));
      expect(bundledSource).not.toContain('../../../src/components');
    } finally {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  });
});
