import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const stageDir = path.join(projectRoot, '.release', 'npm', 'package');

const pkg = JSON.parse(readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));

const publishedFiles = [
  'dist/corncob-design-language.css',
  'dist/corncob-design-language.esm.js',
  'dist/corncob-design-language.umd.js',
  'DESIGN_SYSTEM_FOR_AI.md',
  'tokens.json',
  'components.json',
  'layouts.json',
  'README.md',
  'LICENSE',
  'CHANGELOG.md',
];

const llmsFiles = [
  ['docs/public/llms.txt', 'llms.txt'],
  ['docs/public/llms-full.txt', 'llms-full.txt'],
];

rmSync(stageDir, { recursive: true, force: true });
mkdirSync(stageDir, { recursive: true });

for (const relativePath of publishedFiles) {
  const sourcePath = path.join(projectRoot, relativePath);
  if (!existsSync(sourcePath)) {
    throw new Error(`Missing release asset: ${relativePath}`);
  }

  const destinationPath = path.join(stageDir, relativePath);
  mkdirSync(path.dirname(destinationPath), { recursive: true });
  cpSync(sourcePath, destinationPath);
}

for (const [sourceRelativePath, destinationRelativePath] of llmsFiles) {
  const sourcePath = path.join(projectRoot, sourceRelativePath);
  if (!existsSync(sourcePath)) {
    throw new Error(`Missing release asset: ${sourceRelativePath}`);
  }

  cpSync(sourcePath, path.join(stageDir, destinationRelativePath));
}

const stagedPackageJson = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  main: 'dist/corncob-design-language.umd.js',
  module: 'dist/corncob-design-language.esm.js',
  style: 'dist/corncob-design-language.css',
  exports: pkg.exports,
  sideEffects: [
    './dist/corncob-design-language.css',
    './dist/corncob-design-language.esm.js',
    './dist/corncob-design-language.umd.js',
  ],
  files: [
    'dist/corncob-design-language.css',
    'dist/corncob-design-language.esm.js',
    'dist/corncob-design-language.umd.js',
    'DESIGN_SYSTEM_FOR_AI.md',
    'tokens.json',
    'components.json',
    'layouts.json',
    'llms.txt',
    'llms-full.txt',
    'CHANGELOG.md',
  ],
  keywords: pkg.keywords,
  repository: pkg.repository,
  bugs: pkg.bugs,
  homepage: pkg.homepage,
  author: pkg.author,
  license: pkg.license,
  publishConfig: pkg.publishConfig,
};

writeFileSync(
  path.join(stageDir, 'package.json'),
  `${JSON.stringify(stagedPackageJson, null, 2)}\n`,
  'utf8'
);

console.log(`Staged release package at ${path.relative(projectRoot, stageDir)}`);
