#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
source "${SCRIPT_DIR}/../bin/common.sh"
load_env_config

VERDACCIO_NPM_URL="http://127.0.0.1:${VERDACCIO_NPM_PORT}"
VERDACCIO_GITHUB_URL="http://127.0.0.1:${VERDACCIO_GITHUB_PORT}"
MOTO_URL="http://127.0.0.1:${MOTO_PORT}"

print_section "Run release-please workflow"

event_file="config/events/workflow-dispatch-release-please.json"

cat > "${ENV_DIR}/${event_file}" <<EOF
{
  "inputs": {
    "force-release": "true"
  },
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

# Flutter SDK is only available for amd64
# Run each job individually, so that only the flutter publish job needs to use amd64
run_act_workflow workflow_dispatch "${event_file}" release-please.yml -j vivid-publish
run_act_workflow workflow_dispatch "${event_file}" release-please.yml -j vivid-design-tokens-publish
run_act_workflow workflow_dispatch "${event_file}" release-please.yml -j vivid-icons-publish
run_act_workflow workflow_dispatch "${event_file}" release-please.yml -j vivid-vue-publish
run_act_workflow workflow_dispatch "${event_file}" release-please.yml -j test-utils-publish
run_act_workflow workflow_dispatch "${event_file}" release-please.yml -j eslint-plugin-publish
run_act_workflow workflow_dispatch "${event_file}" release-please.yml -j deploy-s3
run_act_workflow_amd64 workflow_dispatch "${event_file}" release-please.yml -j vivid-design-tokens-flutter-publish

print_section "Read expected release versions"
vivid_version="$(jq -r '.version' "${ENV_DIR}/repo/libs/components/package.json")"
vivid_vue_version="$(jq -r '.version' "${ENV_DIR}/repo/libs/vue-wrappers/package.json")"
test_utils_version="$(jq -r '.version' "${ENV_DIR}/repo/libs/test-utils/package.json")"
eslint_plugin_version="$(jq -r '.version' "${ENV_DIR}/repo/libs/eslint-plugin/package.json")"
design_tokens_version="$(jq -r '.version' "${ENV_DIR}/repo/libs/design-tokens/package.json")"
icons_version="$(jq -r '.version' "${ENV_DIR}/repo/libs/icons/package.json")"

print_section "Assert Vivid components version exists in local npm registry"
assert_npm_package_published "${VERDACCIO_NPM_URL}" "@vonage%2fvivid" "@vonage/vivid" "${vivid_version}"

print_section "Assert Vivid components version exists in local GitHub Packages registry"
assert_npm_package_published "${VERDACCIO_GITHUB_URL}" "@vonage%2fvivid" "@vonage/vivid" "${vivid_version}"

print_section "Assert Vivid Vue version exists in local npm registry"
assert_npm_package_published "${VERDACCIO_NPM_URL}" "@vonage%2fvivid-vue" "@vonage/vivid-vue" "${vivid_vue_version}"

print_section "Assert Vivid Vue version exists in local GitHub Packages registry"
assert_npm_package_published "${VERDACCIO_GITHUB_URL}" "@vonage%2fvivid-vue" "@vonage/vivid-vue" "${vivid_vue_version}"

print_section "Assert Vivid test-utils version exists in local npm registry"
assert_npm_package_published "${VERDACCIO_NPM_URL}" "@vonage%2fvivid-test-utils" "@vonage/vivid-test-utils" "${test_utils_version}"

print_section "Assert Vivid test-utils version exists in local GitHub Packages registry"
assert_npm_package_published "${VERDACCIO_GITHUB_URL}" "@vonage%2fvivid-test-utils" "@vonage/vivid-test-utils" "${test_utils_version}"

print_section "Assert Vivid ESLint plugin version exists in local npm registry"
assert_npm_package_published "${VERDACCIO_NPM_URL}" "@vonage%2feslint-plugin-vivid" "@vonage/eslint-plugin-vivid" "${eslint_plugin_version}"

print_section "Assert Vivid ESLint plugin version exists in local GitHub Packages registry"
assert_npm_package_published "${VERDACCIO_GITHUB_URL}" "@vonage%2feslint-plugin-vivid" "@vonage/eslint-plugin-vivid" "${eslint_plugin_version}"

print_section "Assert Vivid design tokens version exists in local npm registry"
assert_npm_package_published "${VERDACCIO_NPM_URL}" "@vonage%2fvivid-design-tokens" "@vonage/vivid-design-tokens" "${design_tokens_version}"

print_section "Assert Vivid design tokens version exists in local GitHub Packages registry"
assert_npm_package_published "${VERDACCIO_GITHUB_URL}" "@vonage%2fvivid-design-tokens" "@vonage/vivid-design-tokens" "${design_tokens_version}"

print_section "Assert Flutter package was published"
assert_file_exists "${ENV_DIR}/state/pub-artifactory/vivid_design_tokens-${design_tokens_version}.tar.gz"

print_section "Assert icons were uploaded"
icons_manifest_listing="$(curl -fsS "${MOTO_URL}/${ICONS_BUCKET}?prefix=${ICONS_BASE_FOLDER}/v${icons_version}/manifest.json")"
[[ "${icons_manifest_listing}" == *"<Key>${ICONS_BASE_FOLDER}/v${icons_version}/manifest.json</Key>"* ]] || {
  echo "Expected icons manifest in s3://${ICONS_BUCKET}/${ICONS_BASE_FOLDER}/v${icons_version}/manifest.json" >&2
  exit 1
}

print_section "Assert docs were deployed"
docs_index_listing="$(curl -fsS "${MOTO_URL}/${DOCS_S3_BUCKET_NAME}?prefix=index.html")"
[[ "${docs_index_listing}" == *"<Key>index.html</Key>"* ]] || {
  echo "Expected docs index.html in s3://${DOCS_S3_BUCKET_NAME}/index.html" >&2
  exit 1
}

print_section "Assert docs deploy invalidated CloudFront"
assert_json_contains "${ENV_DIR}/state/cloudfront-stub.json" '.invalidations | length > 0'

echo "Release-please test passed"
