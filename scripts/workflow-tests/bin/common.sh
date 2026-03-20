#!/usr/bin/env bash
set -euo pipefail

ensure_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Required command not found: $1" >&2
    exit 1
  fi
}

ensure_command curl
ensure_command date
ensure_command docker
ensure_command git
ensure_command jq
ensure_command openssl

WORKFLOW_TESTS_BIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
WORKFLOW_TESTS_ROOT="$(cd "${WORKFLOW_TESTS_BIN_DIR}/.." && pwd -P)"
REPO_ROOT="$(cd "${WORKFLOW_TESTS_ROOT}/../.." && pwd -P)"
ENV_DIR="${WORKFLOW_TESTS_ROOT}/env"

load_env_config() {
  source "${ENV_DIR}/config/config.env"
}

compose() {
  docker compose \
    -f "${ENV_DIR}/docker-compose.yml" \
    -p "vvdworkflowtests" \
    "$@"
}

run_act_workflow() {
  local event_name="$1"
  local event_file="$2"
  local workflow_file="$3"
  shift 3

  local runner_image="${ACT_RUNNER_IMAGE_OVERRIDE:-${ACT_RUNNER_IMAGE}}"
  local container_options="${ACT_CONTAINER_OPTIONS_OVERRIDE:-${ACT_CONTAINER_OPTIONS}}"
  local container_architecture="${ACT_CONTAINER_ARCHITECTURE_OVERRIDE:-}"

  local act_args=(
    --directory "/env/repo"
    --pull=false
    --action-offline-mode
    --env "GITHUB_REPOSITORY=${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}"
    --env "GITHUB_REPOSITORY_OWNER=${GITHUB_REPOSITORY_OWNER}"
    -P "ubuntu-latest=${runner_image}"
    --artifact-server-path "/env/artifacts"
    --action-cache-path /act-cache/actions
    --cache-server-path /act-cache/caches
    --container-options "${container_options}"
    --secret-file "/env/github-secrets.env"
    --var-file "/env/github-vars.env"
  )

  if [[ -n "${container_architecture}" ]]; then
    act_args+=(--container-architecture "${container_architecture}")
  fi

  act_args+=(
    -W ".github/workflows/${workflow_file}"
    -e "/env/${event_file}"
    "${event_name}"
    "$@"
  )

  local log_name="act.$(basename "${workflow_file}" .yml)"
  local extra_args=("$@")
  local i
  for ((i = 0; i < ${#extra_args[@]}; i++)); do
    if [[ "${extra_args[$i]}" == "-j" ]] && (( i + 1 < ${#extra_args[@]} )); then
      log_name="${log_name}-${extra_args[$((i + 1))]}"
      break
    fi
  done

  local log_file="${ENV_DIR}/logs/${log_name}-$(date -u +"%Y-%m-%dT%H-%M-%SZ").log"

  printf 'Logging act output to %s\n' "${log_file}"
  compose exec -t act act "${act_args[@]}" 2>&1 | tee "${log_file}"
}

run_act_workflow_amd64() {
  ACT_RUNNER_IMAGE_OVERRIDE="${ACT_RUNNER_IMAGE_AMD64}" \
    ACT_CONTAINER_ARCHITECTURE_OVERRIDE="linux/amd64" \
    run_act_workflow "$@"
}

assert_file_exists() {
  local file="$1"
  [[ -f "${file}" ]] || {
    echo "Expected file to exist: ${file}" >&2
    exit 1
  }
}

assert_json_contains() {
  local file="$1"
  local jq_filter="$2"
  jq -e "${jq_filter}" "${file}" >/dev/null
}

assert_npm_package_published() {
  local registry_url="$1"
  local package_url_name="$2"
  local package_name="$3"
  local version="$4"

  curl --fail --silent --show-error \
    "${registry_url}/${package_url_name}" \
    | jq -e --arg version "${version}" --arg name "${package_name}" '.versions[$version].name == $name' >/dev/null
}

print_section() {
  printf '\n==== %s ====\n' "$1"
}
