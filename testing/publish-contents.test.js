import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
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
});
