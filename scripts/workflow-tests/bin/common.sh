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
ensure_command node
ensure_command openssl
ensure_command pnpm

WORKFLOW_TESTS_BIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
WORKFLOW_TESTS_ROOT="$(cd "${WORKFLOW_TESTS_BIN_DIR}/.." && pwd -P)"
REPO_ROOT="$(cd "${WORKFLOW_TESTS_ROOT}/../.." && pwd -P)"
ENV_DIR="${WORKFLOW_TESTS_ROOT}/env"

load_env_config() {
  source "${ENV_DIR}/config/config.env"
  GITHUB_API_URL="http://127.0.0.1:${GITHUB_API_PORT}"
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
    --concurrent-jobs=1 # Limit to 1 job to prevent running oom with multiple jobs
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

  local workflow_part
  workflow_part="$(basename "${workflow_file}" .yml)"
  local extra_args=("$@")
  local i
  for ((i = 0; i < ${#extra_args[@]}; i++)); do
    if [[ "${extra_args[$i]}" == "-j" ]] && (( i + 1 < ${#extra_args[@]} )); then
      workflow_part="${workflow_part}-${extra_args[$((i + 1))]}"
      break
    fi
  done

  local log_file="${ENV_DIR}/logs/act.${TEST_NAME}.$(date -u +"%Y-%m-%dT%H-%M-%SZ").${workflow_part}.log"

  printf 'Logging act output to %s\n' "${log_file}"
  compose exec -t act act "${act_args[@]}" 2>&1 | tee "${log_file}"
}

should_skip_amd64() {
  [[ "${SKIP_AMD64:-0}" == "1" ]]
}

run_act_workflow_amd64() {
  if should_skip_amd64; then
    echo "Skipping amd64 workflow run because SKIP_AMD64=1" >&2
    return 1
  fi

  ACT_RUNNER_IMAGE_OVERRIDE="${ACT_RUNNER_IMAGE_AMD64}" \
    ACT_CONTAINER_ARCHITECTURE_OVERRIDE="linux/amd64" \
    run_act_workflow "$@"
}

test_start() {
  TEST_NAME="$1"
  printf '\n==== TEST: %s ====\n\n' "$2"
}

test_success() {
  printf '\nTest passed.\n'
}

test_fail() {
  echo "$1" >&2
  exit 1
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

assert_package_published() {
  local port="$1"
  local package_name="$2"
  local version="$3"
  local package_url_name="${package_name//\//%2f}"

  curl --fail --silent --show-error \
    "http://127.0.0.1:${port}/${package_url_name}" \
    | jq -e --arg version "${version}" --arg name "${package_name}" \
      '.versions[$version].name == $name' >/dev/null
}

assert_package_published_to_npm() {
  assert_package_published "${VERDACCIO_NPM_PORT}" "$@"
}

assert_package_published_to_github() {
  assert_package_published "${VERDACCIO_GITHUB_PORT}" "$@"
}

get_releases() {
  curl -fsS "${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}/releases"
}

get_tags() {
  curl -fsS "${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}/tags"
}

get_pulls() {
  curl -fsS "${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}/pulls"
}

release_has_tag() {
  local releases_json="$1"
  local tag="$2"
  echo "${releases_json}" | jq -e --arg tag "${tag}" \
    'map(select(.tag_name == $tag)) | length > 0' >/dev/null
}

release_has_title() {
  local releases_json="$1"
  local tag="$2"
  local title="$3"
  echo "${releases_json}" | jq -e --arg tag "${tag}" --arg title "${title}" \
    'map(select(.tag_name == $tag and .name == $title)) | length > 0' >/dev/null
}

release_has_body_containing() {
  local releases_json="$1"
  local tag="$2"
  local substr="$3"
  echo "${releases_json}" | jq -e --arg tag "${tag}" --arg substr "${substr}" \
    'map(select(.tag_name == $tag))[0].body | . != null and contains($substr)' >/dev/null
}

tag_exists() {
  local tags_json="$1"
  local tag="$2"
  echo "${tags_json}" | jq -e --arg tag "${tag}" \
    'map(select(.name == $tag)) | length > 0' >/dev/null
}

print_section() {
  printf '\n==== %s ====\n' "$1"
}

commit_to_repo() {
  local message="$1"
  local bare_repo="${ENV_DIR}/config/repos/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}"

  git -C "${ENV_DIR}/repo" add -A
  git -C "${ENV_DIR}/repo" commit -m "${message}"
  git -C "${ENV_DIR}/repo" push "${bare_repo}" HEAD:main

  HEAD_SHA=$(git -C "${ENV_DIR}/repo" rev-parse HEAD)
}

# Reset repo and bare repo to the original HEAD_SHA and delete all tags repo,
reset_git_repo() {
  local bare_repo="${ENV_DIR}/config/repos/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}"

  git -C "${ENV_DIR}/repo" reset --hard "${HEAD_SHA}"
  git -C "${ENV_DIR}/repo" clean -fd

  local tags
  tags="$(git -C "${bare_repo}" tag -l)"
  if [[ -n "${tags}" ]]; then
    echo "${tags}" | xargs git -C "${bare_repo}" tag -d
  fi

  git -C "${ENV_DIR}/repo" push --force "${bare_repo}" HEAD:main
}

# Create a tag in the bare repo so that `git ls-remote --tags` sees it.
create_bare_tag() {
  local tag="$1"
  local bare_repo="${ENV_DIR}/config/repos/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}"
  local sha
  sha=$(git -C "${bare_repo}" rev-parse HEAD)
  git -C "${bare_repo}" tag "${tag}" "${sha}" 2>/dev/null || true
}

delete_bare_tag() {
  local tag="$1"
  local bare_repo="${ENV_DIR}/config/repos/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}"
  git -C "${bare_repo}" tag -d "${tag}" >/dev/null 2>&1 || true
}

# Remove all changeset markdown files from env/repo.
delete_changesets() {
  find "${ENV_DIR}/repo/.changeset" -maxdepth 1 -name '*.md' -delete 2>/dev/null || true
}

# Read the current version of every published package from package.json
load_package_versions() {
  VIVID_VERSION="$(jq -r '.version' "${ENV_DIR}/repo/libs/components/package.json")"
  VIVID_VUE_VERSION="$(jq -r '.version' "${ENV_DIR}/repo/libs/vue-wrappers/package.json")"
  TEST_UTILS_VERSION="$(jq -r '.version' "${ENV_DIR}/repo/libs/test-utils/package.json")"
  VIVID_REACT_VERSION="$(jq -r '.version' "${ENV_DIR}/repo/libs/react-wrappers/package.json")"
  ESLINT_PLUGIN_VERSION="$(jq -r '.version' "${ENV_DIR}/repo/libs/eslint-plugin/package.json")"
  DESIGN_TOKENS_VERSION="$(jq -r '.version' "${ENV_DIR}/repo/libs/design-tokens/package.json")"
  ICONS_VERSION="$(jq -r '.version' "${ENV_DIR}/repo/libs/icons/package.json")"
  MARKETING_ICONS_VERSION="$(jq -r '.version' "${ENV_DIR}/repo/libs/marketing-icons/package.json")"
}

run_changeset_version() {
  pnpm --dir "${ENV_DIR}/repo" install --ignore-scripts --frozen-lockfile
  GITHUB_TOKEN="${GITHUB_LOCAL_TOKEN}" \
  GITHUB_GRAPHQL_URL="${GITHUB_API_URL}/graphql" \
    pnpm --dir "${ENV_DIR}/repo" exec changeset version
}

reset_github_state() {
  printf '{"repos":{}}\n' > "${ENV_DIR}/state/github-stub.json"
}
