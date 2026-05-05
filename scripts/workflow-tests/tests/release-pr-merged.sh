#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
source "${SCRIPT_DIR}/../bin/common.sh"
load_env_config

test_start "release-pr-merged" "After a release PR is merged, the release workflow publishes only affected packages and creates tags and releases"

print_section "Prepare: reset state"

reset_github_state
reset_git_repo

print_section "Prepare: simulate merged release PR with changesets"

delete_changesets

cat > "${ENV_DIR}/repo/.changeset/ci-test-release-pr-merged.md" <<'CHANGESET'
---
"@vonage/vivid": minor
---
pr: #1
commit: 1234567
author: @test-author

feat(button): allow clicking on buttons (VIV-1234)
CHANGESET

run_changeset_version
load_package_versions

[[ "${VIVID_VERSION}" == "${VIVID_VUE_VERSION}" && "${VIVID_VERSION}" == "${TEST_UTILS_VERSION}" ]] \
  || test_fail "Expected the fixed version group to be updated together"

print_section "Prepare: create pre-existing tags for unaffected packages"

create_bare_tag "vivid-design-tokens-v${DESIGN_TOKENS_VERSION}"
create_bare_tag "vivid-icons-v${ICONS_VERSION}"
create_bare_tag "eslint-plugin-v${ESLINT_PLUGIN_VERSION}"
create_bare_tag "vivid-marketing-icons-v${MARKETING_ICONS_VERSION}"

commit_to_repo "chore: version packages"

print_section "Run release workflow (push to main)"

event_file="config/events/push-main-release-pr-merged.json"

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

print_section "Assert affected packages published to npm and GitHub Packages"

packages_to_assert=(
  "@vonage/vivid|${VIVID_VERSION}"
  "@vonage/vivid-vue|${VIVID_VUE_VERSION}"
  "@vonage/vivid-test-utils|${TEST_UTILS_VERSION}"
)

for entry in "${packages_to_assert[@]}"; do
  pkg="${entry%%|*}"
  ver="${entry#*|}"
  assert_package_published_to_npm "${pkg}" "${ver}"
  assert_package_published_to_github "${pkg}" "${ver}"
done

print_section "Assert GitHub releases created"

releases_json="$(get_releases)"

release_specs=(
  "vivid-v${VIVID_VERSION}|vivid: v${VIVID_VERSION}"
)

for spec in "${release_specs[@]}"; do
  tag="${spec%%|*}"
  title="${spec#*|}"
  release_has_title "${releases_json}" "${tag}" "${title}" \
    || test_fail "Expected GitHub release with tag '${tag}' and title '${title}'"
  release_has_body_containing "${releases_json}" "${tag}" "### Minor Changes" \
    || test_fail "Expected GitHub release body for '${tag}' to contain: ### Minor Changes"
  release_has_body_containing "${releases_json}" "${tag}" "- [#1](https://github.com/Vonage/vivid-3/pull/1) [\`1234567\`](https://github.com/Vonage/vivid-3/commit/1234567) Thanks [@test-author](https://github.com/test-author)! - feat(button): allow clicking on buttons (VIV-1234)" \
    || test_fail "Expected GitHub release body for '${tag}' to contain change entry"

done

print_section "Assert tags were created"

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
