#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
source "${SCRIPT_DIR}/common.sh"

load_env_config

compose stop
printf 'Environment is stopped: %s\n' "${ENV_DIR}"
