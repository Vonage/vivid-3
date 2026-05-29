#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
source "${SCRIPT_DIR}/../bin/common.sh"
load_env_config

test_start "pre-release" "Pre-release workflow publishes a preview package to npm and GitHub Packages"

load_package_versions
IFS=. read -r major minor patch <<<"${VIVID_VERSION}"
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

print_section "Assert preview packages published to npm and GitHub Packages"

packages_to_check=(
  "@vonage/vivid|${preview_version}"
  "@vonage/vivid-vue|${preview_version}"
  "@vonage/vivid-test-utils|${preview_version}"
  "@vonage/vivid-react|${preview_version}"
)

for entry in "${packages_to_check[@]}"; do
  pkg="${entry%%|*}"
  ver="${entry#*|}"
  assert_package_published_to_npm "${pkg}" "${ver}"
  assert_package_published_to_github "${pkg}" "${ver}"
done

test_success
