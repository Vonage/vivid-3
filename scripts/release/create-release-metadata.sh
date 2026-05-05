#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/packages.sh"

declare -A RELEASE_FLAGS=(
  ["@vonage/vivid"]="$SHOULD_RELEASE_VIVID"
  ["@vonage/vivid-design-tokens"]="$SHOULD_RELEASE_DESIGN_TOKENS"
  ["@vonage/vivid-icons"]="$SHOULD_RELEASE_ICONS"
  ["@vonage/eslint-plugin-vivid"]="$SHOULD_RELEASE_ESLINT_PLUGIN"
  ["@vonage/vivid-vue"]="$SHOULD_RELEASE_VUE"
  ["@vonage/vivid-test-utils"]="$SHOULD_RELEASE_TEST_UTILS"
  ["@vonage/vivid-marketing-icons"]="$SHOULD_RELEASE_MARKETING_ICONS"
)

declare -A REQUIRED_RESULTS=(
  ["@vonage/vivid"]="$VIVID_PUBLISH_RESULT|$DEPLOY_S3_RESULT"
  ["@vonage/vivid-design-tokens"]="$DESIGN_TOKENS_PUBLISH_RESULT|$DESIGN_TOKENS_FLUTTER_PUBLISH_RESULT"
  ["@vonage/vivid-icons"]="$ICONS_PUBLISH_RESULT"
  ["@vonage/eslint-plugin-vivid"]="$ESLINT_PLUGIN_PUBLISH_RESULT"
  ["@vonage/vivid-vue"]="$VIVID_VUE_PUBLISH_RESULT"
  ["@vonage/vivid-test-utils"]="$TEST_UTILS_PUBLISH_RESULT"
  ["@vonage/vivid-marketing-icons"]="$MARKETING_ICONS_PUBLISH_RESULT"
)

is_github_release_pkg() {
  local name="$1"
  for pkg in "${GITHUB_RELEASE_PACKAGES[@]}"; do
    [[ "$pkg" == "$name" ]] && return 0
  done
  return 1
}

extract_changelog() {
  local file="$1" version="$2"
  awk -v ver="$version" '
    /^## / {
      if (found) exit
      if (index($0, ver)) { found=1; next }
    }
    found { print }
  ' "$file"
}

release_jobs_succeeded() {
  local name="$1"
  local result
  IFS='|' read -r -a results <<< "${REQUIRED_RESULTS[$name]}"
  for result in "${results[@]}"; do
    if [[ "$result" != "success" ]]; then
      echo "::warning::Skipping release metadata for $name because a required release job did not succeed (result: $result)"
      return 1
    fi
  done
  return 0
}

for name in "${!PKG_DIRS[@]}"; do
  if [[ "${RELEASE_FLAGS[$name]}" != "true" ]]; then
    continue
  fi

  if ! release_jobs_succeeded "$name"; then
    continue
  fi

  dir="${PKG_DIRS[$name]}"
  version=$(jq -r .version "$dir/package.json")
  tag_prefix="${TAG_PREFIXES[$name]}"
  tag="${tag_prefix}-v${version}"

  if git ls-remote --tags origin "refs/tags/$tag" | grep -q .; then
    echo "Tag $tag already exists – skipping $name"
    continue
  fi

  echo "Creating release metadata for $name@$version"

  if is_github_release_pkg "$name"; then
    body_file=$(mktemp)
    extract_changelog "$dir/CHANGELOG.md" "$version" > "$body_file"

    gh release create "$tag" \
      --target "$GITHUB_SHA" \
      --title "${tag_prefix}: v${version}" \
      --notes-file "$body_file"

    rm -f "$body_file"
  else
    gh api "repos/$GITHUB_REPOSITORY/git/refs" \
      -f ref="refs/tags/$tag" \
      -f sha="$GITHUB_SHA"
  fi
done
