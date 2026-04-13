#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CHANGELOG_FILE="$ROOT_DIR/CHANGELOG.md"
FRAGMENTS_DIR="$ROOT_DIR/.changelog"

VERSION="${1:-}"
RELEASE_DATE="${2:-$(date +%F)}"

if [[ -z "$VERSION" ]]; then
  echo "Usage: $0 <version> [YYYY-MM-DD]"
  exit 1
fi

if [[ ! -f "$CHANGELOG_FILE" ]]; then
  echo "Missing CHANGELOG.md at $CHANGELOG_FILE"
  exit 1
fi

if [[ ! -d "$FRAGMENTS_DIR" ]]; then
  echo "Missing fragments directory at $FRAGMENTS_DIR"
  exit 1
fi

mapfile -t FRAGMENTS < <(find "$FRAGMENTS_DIR" -maxdepth 1 -type f -name '*.md' \
  ! -name 'README.md' | sort)

if [[ "${#FRAGMENTS[@]}" -eq 0 ]]; then
  echo "No changelog fragments found in .changelog"
  exit 1
fi

tmp_added="$(mktemp)"
tmp_changed="$(mktemp)"
tmp_fixed="$(mktemp)"
tmp_removed="$(mktemp)"
tmp_deprecated="$(mktemp)"
cleanup() {
  rm -f "$tmp_added" "$tmp_changed" "$tmp_fixed" "$tmp_removed" "$tmp_deprecated"
}
trap cleanup EXIT

append_entry() {
  local section_file="$1"
  local scope="$2"
  local content="$3"

  if [[ -n "$scope" ]]; then
    echo "- $scope: $content" >> "$section_file"
  else
    echo "- $content" >> "$section_file"
  fi
}

for fragment in "${FRAGMENTS[@]}"; do
  type_line="$(sed -n 's/^type:[[:space:]]*//p' "$fragment" | head -n 1 | tr -d '\r')"
  scope_line="$(sed -n 's/^scope:[[:space:]]*//p' "$fragment" | head -n 1 | tr -d '\r')"

  body="$(awk 'BEGIN{d=0} /^---[[:space:]]*$/ {d++; next} d>=2 {print}' "$fragment" | sed '/^[[:space:]]*$/d')"
  body="$(echo "$body" | tr '\n' ' ' | sed 's/[[:space:]]\+/ /g; s/^ //; s/ $//')"

  if [[ -z "$type_line" || -z "$body" ]]; then
    echo "Invalid fragment format: $fragment"
    echo "Expected frontmatter with type and body content."
    exit 1
  fi

  case "$type_line" in
    Added) append_entry "$tmp_added" "$scope_line" "$body" ;;
    Changed) append_entry "$tmp_changed" "$scope_line" "$body" ;;
    Fixed) append_entry "$tmp_fixed" "$scope_line" "$body" ;;
    Removed) append_entry "$tmp_removed" "$scope_line" "$body" ;;
    Deprecated) append_entry "$tmp_deprecated" "$scope_line" "$body" ;;
    *)
      echo "Invalid type '$type_line' in $fragment"
      echo "Allowed: Added, Changed, Fixed, Removed, Deprecated"
      exit 1
      ;;
  esac
done

release_block="## [$VERSION] - $RELEASE_DATE\n\n"

if [[ -s "$tmp_added" ]]; then
  release_block+="### Added\n\n$(cat "$tmp_added")\n\n"
fi
if [[ -s "$tmp_changed" ]]; then
  release_block+="### Changed\n\n$(cat "$tmp_changed")\n\n"
fi
if [[ -s "$tmp_fixed" ]]; then
  release_block+="### Fixed\n\n$(cat "$tmp_fixed")\n\n"
fi
if [[ -s "$tmp_removed" ]]; then
  release_block+="### Removed\n\n$(cat "$tmp_removed")\n\n"
fi
if [[ -s "$tmp_deprecated" ]]; then
  release_block+="### Deprecated\n\n$(cat "$tmp_deprecated")\n\n"
fi

if grep -q '^## \[Unreleased\]' "$CHANGELOG_FILE"; then
  awk -v block="$release_block" '
    { print }
    /^## \[Unreleased\]$/ {
      print ""
      printf "%s", block
    }
  ' "$CHANGELOG_FILE" > "$CHANGELOG_FILE.tmp"
  mv "$CHANGELOG_FILE.tmp" "$CHANGELOG_FILE"
else
  awk -v block="$release_block" '
    BEGIN { inserted=0 }
    {
      if (!inserted && /^## \[/) {
        print "## [Unreleased]"
        print ""
        printf "%s", block
        inserted=1
      }
      print
    }
    END {
      if (!inserted) {
        print ""
        print "## [Unreleased]"
        print ""
        printf "%s", block
      }
    }
  ' "$CHANGELOG_FILE" > "$CHANGELOG_FILE.tmp"
  mv "$CHANGELOG_FILE.tmp" "$CHANGELOG_FILE"
fi

echo "Updated CHANGELOG.md with version $VERSION"
