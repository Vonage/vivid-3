#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/packages.sh"

for name in "${!PKG_DIRS[@]}"; do
  dir="${PKG_DIRS[$name]}"
  version=$(jq -r .version "$dir/package.json")
  tag_prefix="${TAG_PREFIXES[$name]}"
  tag="${tag_prefix}-v${version}"
  output_key="${OUTPUT_KEYS[$name]}"

  if git ls-remote --tags origin "refs/tags/$tag" | grep -q .; then
    echo "Tag $tag already exists – skipping $name"
    echo "${output_key}=false" >> "$GITHUB_OUTPUT"
    continue
  fi

  echo "Planning release for $name@$version"
  echo "${output_key}=true" >> "$GITHUB_OUTPUT"
done
