import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const stageDir = path.join(projectRoot, '.release', 'npm', 'package');

const pkg = JSON.parse(readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));

const packageFiles = [
  'dist',
  'DESIGN_SYSTEM_FOR_AI.md',
  'tokens.json',
  'components.json',
  'layouts.json',
  'README.md',
  'LICENSE',
];

const llmsFiles = [
  ['docs/public/llms.txt', 'llms.txt'],
  ['docs/public/llms-full.txt', 'llms-full.txt'],
];

rmSync(stageDir, { recursive: true, force: true });
mkdirSync(stageDir, { recursive: true });

for (const relativePath of packageFiles) {
  const sourcePath = path.join(projectRoot, relativePath);
  if (!existsSync(sourcePath)) {
    throw new Error(`Missing release asset: ${relativePath}`);
  }

  const destinationPath = path.join(stageDir, relativePath);
  cpSync(sourcePath, destinationPath, { recursive: true });
}

for (const [sourceRelativePath, destinationRelativePath] of llmsFiles) {
  const sourcePath = path.join(projectRoot, sourceRelativePath);
  if (!existsSync(sourcePath)) {
    throw new Error(`Missing release asset: ${sourceRelativePath}`);
  }

  cpSync(sourcePath, path.join(stageDir, destinationRelativePath));
}

const stagedPackageJson = {
  ...pkg,
  files: [
    'dist',
    'DESIGN_SYSTEM_FOR_AI.md',
    'tokens.json',
    'components.json',
    'layouts.json',
    'llms.txt',
    'llms-full.txt',
  ],
};

writeFileSync(
  path.join(stageDir, 'package.json'),
  `${JSON.stringify(stagedPackageJson, null, 2)}\n`,
  'utf8'
);

console.log(`Staged release package at ${path.relative(projectRoot, stageDir)}`);