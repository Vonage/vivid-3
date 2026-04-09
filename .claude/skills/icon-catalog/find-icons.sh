#!/usr/bin/env bash
# Find icons whose name, aliases, or keywords match a regex.
# Usage: find-icons.sh <regex>
#
# Output (one line per matching icon):
#   <id> | aliases: <a>,<b> | keywords: <x>,<y>

set -euo pipefail

REGEX="${1:?Usage: $(basename "$0") <regex>}"
INDEX="$(cd "$(dirname "$0")" && pwd)/../../../libs/icons/src/generated/index.json"

jq -r --arg re "$REGEX" '
  .[] |
  select(
    (.name    | test($re; "i")) or
    (.aliases[] | test($re; "i")) or
    (.keywords[] | test($re; "i"))
  ) |
  .id
  + " | aliases: " + (.aliases | join(","))
  + " | keywords: " + (.keywords | join(","))
' "$INDEX"
