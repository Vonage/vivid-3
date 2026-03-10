#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
source "${SCRIPT_DIR}/../bin/common.sh"
load_env_config

VERDACCIO_NPM_URL="http://127.0.0.1:${VERDACCIO_NPM_PORT}"
VERDACCIO_GITHUB_URL="http://127.0.0.1:${VERDACCIO_GITHUB_PORT}"

current_version="$(jq -r '.version' "${ENV_DIR}/repo/libs/components/package.json")"
IFS=. read -r major minor patch <<<"${current_version}"
preview_version="${major}.$((minor + 1)).0-preview.0"

print_section "Run pre-release workflow"

event_file="config/events/workflow-dispatch-pre-release.json"

cat > "${ENV_DIR}/${event_file}" <<EOF
{
  "inputs": {
    "change_type": "minor",
    "preview_version": "0"
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

run_act_workflow workflow_dispatch "${event_file}" pre-release.yml

print_section "Assert preview version exists in local npm registry"
assert_npm_package_published "${VERDACCIO_NPM_URL}" "@vonage%2fvivid" "@vonage/vivid" "${preview_version}"
assert_npm_package_published "${VERDACCIO_GITHUB_URL}" "@vonage%2fvivid" "@vonage/vivid" "${preview_version}"

echo "Pre-release test passed"
