#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
source "${SCRIPT_DIR}/common.sh"

if [[ -d "${ENV_DIR}" ]]; then
  echo "Existing environment found, tearing down..."
	if [[ -f "${ENV_DIR}/config/config.env" ]]; then
		load_env_config
		compose down --remove-orphans
	fi
  rm -rf "${ENV_DIR}"
fi

printf 'Environment is destroyed: %s\n' "${ENV_DIR}"
