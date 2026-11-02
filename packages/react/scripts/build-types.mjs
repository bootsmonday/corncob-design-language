import { execFileSync } from 'node:child_process';
import { mkdirSync, unlinkSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(packageRoot, '../..');
const tsc = path.join(repoRoot, 'node_modules/typescript/bin/tsc');
const project = path.join(packageRoot, 'tsconfig.json');
const typesDir = path.join(packageRoot, 'dist-types');
const checkOnly = process.argv.includes('--check');

const normalize = (file) => {
  const resolved = path.resolve(file);
  return process.platform === 'win32' || process.platform === 'darwin' ? resolved.toLowerCase() : resolved;
};

const isInside = (parent, child) => {
  const relative = path.relative(normalize(parent), normalize(child));
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
};

const runTsc = (args) => {
  try {
    return execFileSync(tsc, ['--project', project, '--pretty', 'false', ...args], {
      cwd: packageRoot,
      encoding: 'utf8',
    });
  } catch (error) {
    if (error.stdout) process.stdout.write(error.stdout);
    if (error.stderr) process.stderr.write(error.stderr);
    process.exit(error.status || 1);
  }
};

const programFiles = runTsc(['--noEmit', '--listFiles']).split('\n').map((line) => line.trim()).filter(Boolean);

const outsideProgram = programFiles.filter((file) => {
  return !normalize(file).includes(`${path.sep}node_modules${path.sep}`) && !isInside(packageRoot, file);
});

if (outsideProgram.length > 0) {
  console.error('TypeScript program includes files outside packages/react:');
  for (const file of outsideProgram) console.error(`  ${file}`);
  console.error('Keep vanilla component imports out of this program so declaration emit stays in packages/react.');
  process.exit(1);
}

if (checkOnly) {
  process.exit(0);
}

const emittedOutput = runTsc(['--listEmittedFiles']);
const emittedFiles = [...emittedOutput.matchAll(/^TSFILE: (.+)$/gm)].map((match) => match[1].trim());
const leakedFiles = emittedFiles.filter((file) => !isInside(typesDir, file));

if (leakedFiles.length > 0) {
  for (const file of leakedFiles) {
    if (file.endsWith('.d.ts')) unlinkSync(file);
  }

  console.error('Declaration emit wrote files outside packages/react/dist-types:');
  for (const file of leakedFiles) console.error(`  ${file}`);
  process.exit(1);
}

mkdirSync(typesDir, { recursive: true });
writeFileSync(
  path.join(typesDir, 'custom-elements.d.ts'),
  [
    '// Resolves the side-effect import kept in the React component declarations.',
    '// This stub must not import the vanilla component sources.',
    'export {};',
    '',
  ].join('\n'),
);
