import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const declarationFilesUnder = (relativeDir) => {
  const directory = path.join(repoRoot, relativeDir);
  const found = [];

  const walk = (current) => {
    let entries;
    try {
      entries = readdirSync(current, { withFileTypes: true });
    } catch (error) {
      if (error.code === 'ENOENT') return;
      throw error;
    }

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (entry.isFile() && entry.name.endsWith('.d.ts')) {
        found.push(path.relative(repoRoot, fullPath));
      }
    }
  };

  walk(directory);
  return found;
};

const leaked = [
  ...declarationFilesUnder('src'),
  ...declarationFilesUnder('dist'),
];

if (leaked.length > 0) {
  console.error('TypeScript declarations were emitted with the standard JS package:');
  for (const file of leaked) console.error(`  ${file}`);
  process.exit(1);
}

console.log('Standard JS build has no TypeScript declarations.');
