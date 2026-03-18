#!/usr/bin/env bash
# Common package definitions shared across release scripts.

# Packages that should receive a GitHub release and not just a tag
GITHUB_RELEASE_PACKAGES=(
  "@vonage/vivid"
  "@vonage/vivid-design-tokens"
  "@vonage/vivid-icons"
  "@vonage/eslint-plugin-vivid"
)

declare -A PKG_DIRS=(
  ["@vonage/vivid"]="libs/components"
  ["@vonage/vivid-design-tokens"]="libs/design-tokens"
  ["@vonage/vivid-icons"]="libs/icons"
  ["@vonage/eslint-plugin-vivid"]="libs/eslint-plugin"
  ["@vonage/vivid-vue"]="libs/vue-wrappers"
  ["@vonage/vivid-test-utils"]="libs/test-utils"
)

declare -A OUTPUT_KEYS=(
  ["@vonage/vivid"]="should_release_vivid"
  ["@vonage/vivid-design-tokens"]="should_release_design_tokens"
  ["@vonage/vivid-icons"]="should_release_icons"
  ["@vonage/eslint-plugin-vivid"]="should_release_eslint_plugin"
  ["@vonage/vivid-vue"]="should_release_vue"
  ["@vonage/vivid-test-utils"]="should_release_test_utils"
)

declare -A TAG_PREFIXES=(
  ["@vonage/vivid"]="vivid"
  ["@vonage/vivid-design-tokens"]="vivid-design-tokens"
  ["@vonage/vivid-icons"]="vivid-icons"
  ["@vonage/eslint-plugin-vivid"]="eslint-plugin"
  ["@vonage/vivid-vue"]="vivid-vue"
  ["@vonage/vivid-test-utils"]="test-utils"
)
