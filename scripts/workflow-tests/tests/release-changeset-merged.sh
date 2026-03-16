#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
source "${SCRIPT_DIR}/../bin/common.sh"
load_env_config

test_start "release-changeset-merged" "A merged changeset commit causes the release workflow to open a release PR"

print_section "Prepare: reset state and add changeset"

reset_github_state
reset_git_repo
delete_changesets

cat > "${ENV_DIR}/repo/.changeset/test-changeset.md" <<'CHANGESET'
---
"@vonage/vivid": minor
---

feat(button): allow clicking on buttons (VIV-1234)
CHANGESET

commit_to_repo "chore: add test changeset"

print_section "Run release workflow (push to main)"

event_file="config/events/push-main-release-changeset-merged.json"

cat > "${ENV_DIR}/${event_file}" <<EOF
{
  "ref": "refs/heads/main",
  "after": "${HEAD_SHA}",
  "head_commit": {
    "id": "${HEAD_SHA}"
  },
  "repository": {
    "full_name": "${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}",
    "default_branch": "main"
  }
}
EOF

run_act_workflow push "${event_file}" release.yml

print_section "Assert release PR was created"

pulls_json="$(get_pulls)"
pull_count="$(echo "${pulls_json}" | jq 'length')"

[[ "${pull_count}" -ge 1 ]] \
  || test_fail "Expected at least one pull request, got ${pull_count}"

echo "${pulls_json}" | jq -e '
  map(select(
    .head.ref == "changeset-release/main" and
    .base.ref == "main"
  )) | length > 0
' >/dev/null \
  || test_fail "Expected a PR from changeset-release/main → main"

print_section "Assert changeset-release/main branch was pushed"

bare_repo="${ENV_DIR}/config/repos/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}"
git -C "${bare_repo}" rev-parse "refs/heads/changeset-release/main" >/dev/null 2>&1 \
  || test_fail "Expected changeset-release/main branch to exist in the bare repo"

test_success
