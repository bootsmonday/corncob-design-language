#!/usr/bin/env bash
set -euo pipefail

BASE_REF="${1:-origin/main}"
HEAD_REF="${2:-HEAD}"

changed_src="$(git diff --name-only "$BASE_REF"..."$HEAD_REF" -- 'src/**' || true)"
changed_fragments="$(git diff --name-only "$BASE_REF"..."$HEAD_REF" -- '.changelog/*.md' || true)"

if [[ -z "$changed_src" ]]; then
  echo "No changes in src/. Fragment not required."
  exit 0
fi

if [[ -n "$changed_fragments" ]]; then
  echo "Found changelog fragment update."
  exit 0
fi

echo "Changes detected under src/, but no .changelog/*.md fragment was added."
echo "Add a fragment file in .changelog/ following .changelog/README.md"
exit 1
