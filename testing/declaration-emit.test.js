import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..');

const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));

const declarationFilesUnder = (relativeDir) => {
  const directory = path.join(root, relativeDir);
  if (!fs.existsSync(directory)) return [];

  const found = [];
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (entry.name.endsWith('.d.ts')) found.push(path.relative(root, fullPath));
    }
  };

  walk(directory);
  return found;
};

describe('TypeScript declarations', () => {
  jest.setTimeout(120000);

  test('stay inside the React package and out of the standard JS build', () => {
    execFileSync(process.execPath, [path.join(root, 'packages/react/scripts/build-types.mjs')], {
      cwd: root,
      stdio: 'pipe',
    });

    execFileSync(process.execPath, [path.join(root, 'scripts/assert-standard-build-has-no-types.mjs')], {
      cwd: root,
      stdio: 'pipe',
    });

    expect(declarationFilesUnder('src')).toEqual([]);
    expect(declarationFilesUnder('dist')).toEqual([]);
    expect(declarationFilesUnder('packages/vue')).toEqual([]);

    const reactTypes = declarationFilesUnder('packages/react/dist-types');
    expect(reactTypes).toContain(path.join('packages/react/dist-types', 'index.d.ts'));

    const boundary = fs.readFileSync(path.join(root, 'packages/react/dist-types/custom-elements.d.ts'), 'utf8');
    expect(boundary).toContain('export {};');
    expect(boundary).not.toMatch(/src\/components\//);

    const pkg = readJson('package.json');
    expect(pkg.types).toBeUndefined();
    expect(pkg.typings).toBeUndefined();
    expect(JSON.stringify(pkg.exports)).not.toMatch(/\.d\.ts/);
    expect(pkg.scripts.build).not.toMatch(/tsc/);
  });
});
