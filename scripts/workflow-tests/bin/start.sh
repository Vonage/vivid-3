#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
source "${SCRIPT_DIR}/common.sh"

load_env_config

printf 'Building act runner image %s\n' "${ACT_RUNNER_IMAGE}"
docker build -f "${ENV_DIR}/config/Dockerfile.act-runner" -t "${ACT_RUNNER_IMAGE}" "${ENV_DIR}/config"

printf 'Building amd64 act runner image %s\n' "${ACT_RUNNER_IMAGE_AMD64}"
docker build --platform linux/amd64 -f "${ENV_DIR}/config/Dockerfile.act-runner" -t "${ACT_RUNNER_IMAGE_AMD64}" "${ENV_DIR}/config"

printf 'Creating act cache volume %s\n' "${ACT_CACHE_VOLUME}"
docker volume create "${ACT_CACHE_VOLUME}" >/dev/null 2>&1 || true

printf 'Starting local services\n'
compose up -d --build

print_section "Seed local S3 buckets"
for bucket in "${DOCS_S3_BUCKET_NAME}" "${ICONS_BUCKET}"; do
  curl -fsS -X PUT "http://127.0.0.1:${MOTO_PORT}/${bucket}" >/dev/null
done

printf 'Environment is up: %s\n' "${ENV_DIR}"
