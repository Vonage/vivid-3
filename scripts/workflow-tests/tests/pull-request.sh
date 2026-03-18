#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
source "${SCRIPT_DIR}/../bin/common.sh"
load_env_config

test_start "pull-request" "Pull request workflow runs lint, unit-tests, and metadata checks"

event_file="config/events/pull-request.json"

cat > "${ENV_DIR}/${event_file}" <<EOF
{
  "pull_request": {
    "number": 1,
    "draft": false,
    "head": {
      "sha": "${HEAD_SHA}",
      "ref": "${BRANCH_NAME}",
      "repo": {
        "full_name": "${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}"
      }
    },
    "base": {
      "ref": "main",
      "repo": {
        "full_name": "${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}"
      }
    }
  },
  "repository": {
    "full_name": "${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}",
    "default_branch": "main"
  }
}
EOF

# Skip visual regression and deploy deno jobs for now
run_act_workflow pull_request "${event_file}" pull-request.yml -j call-lint
run_act_workflow pull_request "${event_file}" pull-request.yml -j unit-tests
run_act_workflow pull_request "${event_file}" pull-request.yml -j check-metadata

test_success
