#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
source "${SCRIPT_DIR}/../bin/common.sh"
load_env_config

test_start "release-manual-all" "Release all packages using manual dispatch with no existing tags"

MOTO_URL="http://127.0.0.1:${MOTO_PORT}"

print_section "Prepare: reset state"

reset_github_state
reset_git_repo
load_package_versions

print_section "Run release workflow (manual dispatch, all packages)"

event_file="config/events/workflow-dispatch-release-manual-all.json"

cat > "${ENV_DIR}/${event_file}" <<EOF
{
  "inputs": {},
  "pull_request": {
    "head": {
      "sha": "${HEAD_SHA}",
      "ref": "${BRANCH_NAME}"
    }
  },
  "repository": {
    "full_name": "${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}",
    "default_branch": "main"
  }
}
EOF

if should_skip_amd64; then
	# Skip flutter release since it only runs on amd64
  create_bare_tag "vivid-design-tokens-v${DESIGN_TOKENS_VERSION}"
  run_act_workflow workflow_dispatch "${event_file}" release.yml
else
  run_act_workflow_amd64 workflow_dispatch "${event_file}" release.yml
fi

print_section "Assert packages published to npm and GitHub Packages"

npm_packages=(
  "@vonage/vivid|${VIVID_VERSION}"
  "@vonage/vivid-vue|${VIVID_VUE_VERSION}"
  "@vonage/vivid-test-utils|${TEST_UTILS_VERSION}"
  "@vonage/eslint-plugin-vivid|${ESLINT_PLUGIN_VERSION}"
)

if ! should_skip_amd64; then
  npm_packages+=("@vonage/vivid-design-tokens|${DESIGN_TOKENS_VERSION}")
fi

for entry in "${npm_packages[@]}"; do
  pkg="${entry%%|*}"
  ver="${entry#*|}"
  assert_package_published_to_npm "${pkg}" "${ver}"
  assert_package_published_to_github "${pkg}" "${ver}"
done

print_section "Assert flutter package published"

if ! should_skip_amd64; then
  assert_file_exists "${ENV_DIR}/state/pub-artifactory/vivid_design_tokens-${DESIGN_TOKENS_VERSION}.tar.gz"
else
  echo "Skipped (design-tokens tag pre-created to bypass flutter step)."
fi

print_section "Assert icons were uploaded"

icons_manifest_listing="$(curl -fsS "${MOTO_URL}/${ICONS_BUCKET}?prefix=${ICONS_BASE_FOLDER}/v${ICONS_VERSION}/manifest.json")"
[[ "${icons_manifest_listing}" == *"<Key>${ICONS_BASE_FOLDER}/v${ICONS_VERSION}/manifest.json</Key>"* ]] \
  || test_fail "Expected icons manifest in s3://${ICONS_BUCKET}/${ICONS_BASE_FOLDER}/v${ICONS_VERSION}/manifest.json"

print_section "Assert marketing icons were uploaded"

marketing_icons_listing="$(curl -fsS "${MOTO_URL}/${ICONS_BUCKET}?prefix=${ICONS_BASE_FOLDER}/marketing/v${MARKETING_ICONS_VERSION}/index.json")"
[[ "${marketing_icons_listing}" == *"<Key>${ICONS_BASE_FOLDER}/marketing/v${MARKETING_ICONS_VERSION}/index.json</Key>"* ]] \
  || test_fail "Expected marketing icons index in s3://${ICONS_BUCKET}/${ICONS_BASE_FOLDER}/marketing/v${MARKETING_ICONS_VERSION}/index.json"

print_section "Assert docs were deployed"

docs_index_listing="$(curl -fsS "${MOTO_URL}/${DOCS_S3_BUCKET_NAME}?prefix=index.html")"
[[ "${docs_index_listing}" == *"<Key>index.html</Key>"* ]] \
  || test_fail "Expected docs index.html in s3://${DOCS_S3_BUCKET_NAME}/index.html"

print_section "Assert docs deploy invalidated CloudFront"

assert_json_contains "${ENV_DIR}/state/cloudfront-stub.json" '.invalidations | length > 0'

print_section "Assert GitHub releases were created"

releases_json="$(get_releases)"

release_specs=(
  "vivid-v${VIVID_VERSION}|vivid: v${VIVID_VERSION}"
  "vivid-icons-v${ICONS_VERSION}|vivid-icons: v${ICONS_VERSION}"
  "eslint-plugin-v${ESLINT_PLUGIN_VERSION}|eslint-plugin: v${ESLINT_PLUGIN_VERSION}"
  "vivid-marketing-icons-v${MARKETING_ICONS_VERSION}|vivid-marketing-icons: v${MARKETING_ICONS_VERSION}"
)

if ! should_skip_amd64; then
  release_specs+=("vivid-design-tokens-v${DESIGN_TOKENS_VERSION}|vivid-design-tokens: v${DESIGN_TOKENS_VERSION}")
fi

for spec in "${release_specs[@]}"; do
  tag="${spec%%|*}"
  title="${spec#*|}"
  release_has_title "${releases_json}" "${tag}" "${title}" \
    || test_fail "Expected GitHub release with tag '${tag}' and title '${title}'"
done

print_section "Assert tags were created for derived packages"

tags_json="$(get_tags)"

tag_specs=(
  "vivid-vue-v${VIVID_VUE_VERSION}"
  "test-utils-v${TEST_UTILS_VERSION}"
)

for tag in "${tag_specs[@]}"; do
  tag_exists "${tags_json}" "${tag}" \
    || test_fail "Expected tag '${tag}'"
done

test_success
