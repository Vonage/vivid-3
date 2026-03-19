#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
source "${SCRIPT_DIR}/common.sh"

# Tear down env if it exists
"${SCRIPT_DIR}/destroy.sh"

# Create dir structure
mkdir -p \
  "${ENV_DIR}/artifacts" \
  "${ENV_DIR}/logs" \
  "${ENV_DIR}/state/pub-artifactory" \
  "${ENV_DIR}/config/certs" \
  "${ENV_DIR}/config/repos" \
  "${ENV_DIR}/config/events" \
  "${ENV_DIR}/config/wireguard"

# Clone repo
git clone --quiet --no-hardlinks "${REPO_ROOT}" "${ENV_DIR}/repo"

# Generate mitmweb password
MITMWEB_PASSWORD=$(openssl rand -base64 16)

# Create and load config
cat > "${ENV_DIR}/config/config.env" <<EOF
export HEAD_SHA=$(git -C "${ENV_DIR}/repo" rev-parse HEAD)
export BRANCH_NAME=$(git -C "${ENV_DIR}/repo" rev-parse --abbrev-ref HEAD)
export WIREGUARD_CLIENT_CONTAINER_NAME=vvdworkflowtests-wg-client
export ACT_RUNNER_IMAGE=vvd-workflow-tests-act-runner:latest
export ACT_RUNNER_IMAGE_AMD64=vvd-workflow-tests-act-runner:latest-amd64
export ACT_CONTAINER_OPTIONS='--network container:vvdworkflowtests-wg-client'
export ACT_CACHE_VOLUME=vvdworkflowtests-act-cache
export VERDACCIO_NPM_PORT=3000
export VERDACCIO_GITHUB_PORT=3001
export PUB_ARTIFACTORY_PORT=3002
export MOTO_PORT=3003
export GITHUB_API_PORT=3004
export CLOUDFRONT_PORT=3005
export DOCS_CLOUDFRONT_PORT=3006
export ICONS_CLOUDFRONT_PORT=3007
export GIT_SERVER_PORT=3008
export GITHUB_REPOSITORY_OWNER=Vonage
export GITHUB_REPOSITORY_NAME=vivid-3
export NPM_LOCAL_AUTH_TOKEN=npm-local-token
export GITHUB_LOCAL_TOKEN=github-local-token
export GITHUB_PACKAGES_LOCAL_TOKEN=github-packages-local-token
export ARTIFACTORY_LOCAL_TOKEN=local-artifactory-token
export DOCS_S3_ACCESS_KEY=docs-local-access-key
export DOCS_S3_SECRET_ACCESS_KEY=docs-local-secret-access-key
export DOCS_CLOUDFRONT_DISTRIBUTION=ELOCALTEST123
export ICONS_S3_ACCESS_KEY=icons-local-access-key
export ICONS_S3_SECRET_ACCESS_KEY=icons-local-secret-access-key
export AWS_REGION=us-east-1
export DOCS_S3_BUCKET_NAME=vvd-docs-local
export ICONS_BUCKET=vvd-icons-local
export ICONS_BASE_FOLDER=VIVID_ICONS_LOCAL
export DOCS_PRODUCTION_DOMAIN=vivid.vonage.com
export ICONS_PRODUCTION_DOMAIN=icon.resources.vonage.com
export MITMWEB_PASSWORD=${MITMWEB_PASSWORD}
EOF

load_env_config

# Point the cloned repo's origin to the real GitHub HTTPS URL
git -C "${ENV_DIR}/repo" remote set-url origin \
  "https://github.com/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}"

# Create repos for git server
mkdir -p "${ENV_DIR}/config/repos/${GITHUB_REPOSITORY_OWNER}"
git clone --bare --quiet \
  "${ENV_DIR}/repo" \
  "${ENV_DIR}/config/repos/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}"
git -C "${ENV_DIR}/config/repos/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}" \
  config uploadpack.allowAnySHA1InWant true
git -C "${ENV_DIR}/config/repos/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}" \
  config http.receivepack true

# Create mitm ca cert
openssl req -x509 -newkey rsa:2048 -sha256 -days 365 -nodes \
  -keyout "${ENV_DIR}/config/certs/ca.key" \
  -out "${ENV_DIR}/config/certs/ca.crt" \
  -subj "/CN=VVD Workflow Tests Proxy CA" >/dev/null 2>&1

cat "${ENV_DIR}/config/certs/ca.key" "${ENV_DIR}/config/certs/ca.crt" > "${ENV_DIR}/config/certs/mitmproxy-ca.pem"


# Create files in env

generate_verdaccio_config() {
  cat > "$1" <<YAML
storage: /verdaccio/storage

web:
  title: $2

uplinks:
  npmjs:
    url: https://registry.npmjs.org/

packages:
  '*/*':
    access: \$anonymous
    publish: \$anonymous
    unpublish: \$anonymous
    proxy: npmjs

  '**':
    access: \$anonymous
    publish: \$anonymous
    unpublish: \$anonymous
    proxy: npmjs
YAML
}

generate_verdaccio_config "${ENV_DIR}/config/verdaccio-npm.yaml" "Vivid Local npm Registry"
generate_verdaccio_config "${ENV_DIR}/config/verdaccio-github.yaml" "Vivid Local GitHub Packages Registry"

cat > "${ENV_DIR}/config/Dockerfile.act-controller" <<'EOF'
FROM ubuntu:24.04

ARG ACT_VERSION=0.2.84
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        bash \
        ca-certificates \
        curl \
        git \
        jq \
        openssl \
        xz-utils \
    && rm -rf /var/lib/apt/lists/*

RUN arch="$(dpkg --print-architecture)" \
    && case "$arch" in \
         amd64) act_arch="x86_64" ;; \
         arm64) act_arch="arm64" ;; \
         *) echo "Unsupported architecture: $arch" >&2; exit 1 ;; \
       esac \
    && curl -fsSL "https://github.com/nektos/act/releases/download/v${ACT_VERSION}/act_Linux_${act_arch}.tar.gz" \
    | tar -xz -C /usr/local/bin act \
    && chmod +x /usr/local/bin/act

COPY certs/ca.crt /usr/local/share/ca-certificates/vvd-workflow-tests-proxy-ca.crt
RUN update-ca-certificates

ENTRYPOINT ["/bin/bash", "-lc"]
CMD ["bash"]
EOF

cat > "${ENV_DIR}/config/Dockerfile.act-runner" <<'EOF'
FROM ghcr.io/catthehacker/ubuntu:act-latest

# Install awscli
RUN arch="$(dpkg --print-architecture)" \
    && case "$arch" in \
         arm64) aws_arch="aarch64" ;; \
         amd64) aws_arch="x86_64" ;; \
         *) echo "Unsupported architecture: $arch" >&2; exit 1 ;; \
       esac \
    && curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-${aws_arch}.zip" -o /tmp/awscliv2.zip \
    && unzip -q /tmp/awscliv2.zip -d /tmp \
    && /tmp/aws/install \
    && rm -rf /tmp/aws /tmp/awscliv2.zip
ENV AWS_PAGER=""

# Install gh cli
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
        | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
        | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update \
    && apt-get install -y gh \
    && rm -rf /var/lib/apt/lists/*

COPY certs/ca.crt /usr/local/share/ca-certificates/vvd-workflow-tests-proxy-ca.crt
RUN update-ca-certificates

RUN mkdir -p /root/.aws \
    && printf '[default]\nca_bundle = /usr/local/share/ca-certificates/vvd-workflow-tests-proxy-ca.crt\n' > /root/.aws/config \
    && printf 'cafile=/usr/local/share/ca-certificates/vvd-workflow-tests-proxy-ca.crt\nstore-dir=/root/.local/share/pnpm/store\n' > /root/.npmrc

ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/vvd-workflow-tests-proxy-ca.crt

# When running tasks via turborepo, the NODE_EXTRA_CA_CERTS env var is stripped.
# To fix this, create a shim for the node binary that sets the env var before running node.
# However, setup-node action will add its node binary to PATH before the shim
# To fix this, create a shim for bash that ensures the node-shim is first in PATH

RUN mkdir -p /opt/node-shim

RUN printf '#!/bin/sh\n\
export NODE_EXTRA_CA_CERTS="/usr/local/share/ca-certificates/vvd-workflow-tests-proxy-ca.crt"\n\
REAL_NODE=$(which -a node | grep -v "/opt/node-shim/node" | head -n 1)\n\
exec "$REAL_NODE" "$@"' > /opt/node-shim/node \
    && chmod +x /opt/node-shim/node

RUN printf '#!/bin/sh\n\
case "$PATH" in\n\
    "/opt/node-shim"*)\n\
        ;;\n\
    *)\n\
        export PATH="/opt/node-shim:$PATH"\n\
        ;;\n\
esac\n\
REAL_BASH=$(which -a bash | grep -v "/opt/node-shim/bash" | head -n 1)\n\
exec "$REAL_BASH" "$@"' > /opt/node-shim/bash \
    && chmod +x /opt/node-shim/bash

ENV PATH="/opt/node-shim:${PATH}"
EOF

cat > "${ENV_DIR}/config/Dockerfile.git-server" <<'EOF'
FROM httpd:2-alpine
RUN apk add --no-cache git git-daemon \
    && git config --system --add safe.directory '*'
COPY git-server.conf /usr/local/apache2/conf/httpd.conf.template
CMD ["sh", "-c", "chmod -R a+rwX /repos && sed \"s/{{PORT}}/$PORT/g\" /usr/local/apache2/conf/httpd.conf.template > /usr/local/apache2/conf/httpd.conf && httpd-foreground"]
EOF

cp "${WORKFLOW_TESTS_ROOT}/stubs/git-server.conf" "${ENV_DIR}/config/git-server.conf"

cat > "${ENV_DIR}/docker-compose.yml" <<EOF
services:
  proxy:
    image: mitmproxy/mitmproxy:12
    cap_add:
      - NET_ADMIN
    environment:
      VERDACCIO_NPM_PORT: "${VERDACCIO_NPM_PORT}"
      VERDACCIO_GITHUB_PORT: "${VERDACCIO_GITHUB_PORT}"
      PUB_ARTIFACTORY_PORT: "${PUB_ARTIFACTORY_PORT}"
      MOTO_PORT: "${MOTO_PORT}"
      GITHUB_API_PORT: "${GITHUB_API_PORT}"
      CLOUDFRONT_PORT: "${CLOUDFRONT_PORT}"
      DOCS_CLOUDFRONT_PORT: "${DOCS_CLOUDFRONT_PORT}"
      ICONS_CLOUDFRONT_PORT: "${ICONS_CLOUDFRONT_PORT}"
      GIT_SERVER_PORT: "${GIT_SERVER_PORT}"
      GITHUB_REPOSITORY_OWNER: "${GITHUB_REPOSITORY_OWNER}"
      GITHUB_REPOSITORY_NAME: "${GITHUB_REPOSITORY_NAME}"
      AWS_REGION: "${AWS_REGION}"
      DOCS_S3_BUCKET_NAME: "${DOCS_S3_BUCKET_NAME}"
      ICONS_BUCKET: "${ICONS_BUCKET}"
      DOCS_PRODUCTION_DOMAIN: "${DOCS_PRODUCTION_DOMAIN}"
      ICONS_PRODUCTION_DOMAIN: "${ICONS_PRODUCTION_DOMAIN}"
      MITMWEB_PASSWORD: "${MITMWEB_PASSWORD}"
    command: ["/bin/bash", "/opt/proxy/start.sh"]
    volumes:
      - ${ENV_DIR}:/env
      - ${WORKFLOW_TESTS_ROOT}/proxy:/opt/proxy:ro
    tty: true
    ports:
      - "5555:5555"
      - "8081:8081"
      - "51820:51820/udp"
    healthcheck:
      test: ["CMD-SHELL", "test -f /env/config/wireguard/wg0.conf"]
      interval: 5s
      timeout: 2s
      retries: 12
    depends_on:
      verdaccio-npm:
        condition: service_started
      verdaccio-github:
        condition: service_started
      moto:
        condition: service_started
      pub-artifactory:
        condition: service_started
      github-api:
        condition: service_started
      cloudfront:
        condition: service_started
      docs-cloudfront:
        condition: service_started
      icons-cloudfront:
        condition: service_started
      git-server:
        condition: service_started
    networks:
      - default
      - wg_network

  wg-client:
    image: lscr.io/linuxserver/wireguard:latest
    container_name: ${WIREGUARD_CLIENT_CONTAINER_NAME}
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
    volumes:
      - ${ENV_DIR}/config/wireguard:/config/wg_confs
    sysctls:
      net.ipv4.conf.all.src_valid_mark: "1"
    depends_on:
      proxy:
        condition: service_healthy
    healthcheck:
      test: ["CMD-SHELL", "wg show wg0 >/dev/null 2>&1"]
      interval: 5s
      timeout: 5s
      retries: 12
    networks:
      - default
      - wg_network

  verdaccio-npm:
    image: verdaccio/verdaccio:5
    volumes:
      - ${ENV_DIR}/config/verdaccio-npm.yaml:/verdaccio/conf/config.yaml:ro
    environment:
      VERDACCIO_PORT: "${VERDACCIO_NPM_PORT}"
    ports:
      - "127.0.0.1:${VERDACCIO_NPM_PORT}:${VERDACCIO_NPM_PORT}"

  verdaccio-github:
    image: verdaccio/verdaccio:5
    volumes:
      - ${ENV_DIR}/config/verdaccio-github.yaml:/verdaccio/conf/config.yaml:ro
    environment:
      VERDACCIO_PORT: "${VERDACCIO_GITHUB_PORT}"
    ports:
      - "127.0.0.1:${VERDACCIO_GITHUB_PORT}:${VERDACCIO_GITHUB_PORT}"

  moto:
    image: motoserver/moto:5.1.22
    command: ["-p", "${MOTO_PORT}"]
    environment:
      SERVICES: s3,sts
    ports:
      - "127.0.0.1:${MOTO_PORT}:${MOTO_PORT}"

  pub-artifactory:
    image: oven/bun:1-distroless
    volumes:
      - ${WORKFLOW_TESTS_ROOT}/stubs/pub-artifactory.ts:/server.ts:ro
      - ${ENV_DIR}/state/pub-artifactory:/env/state/pub-artifactory
    environment:
      PORT: "${PUB_ARTIFACTORY_PORT}"
    command: ["/server.ts"]
    ports:
      - "127.0.0.1:${PUB_ARTIFACTORY_PORT}:${PUB_ARTIFACTORY_PORT}"

  github-api:
    image: oven/bun:1-distroless
    volumes:
      - ${WORKFLOW_TESTS_ROOT}/stubs/github-api.ts:/server.ts:ro
      - ${ENV_DIR}:/env
    environment:
      PORT: "${GITHUB_API_PORT}"
      GITHUB_REPOSITORY_OWNER: "${GITHUB_REPOSITORY_OWNER}"
      GITHUB_REPOSITORY_NAME: "${GITHUB_REPOSITORY_NAME}"
    command: ["/server.ts"]
    ports:
      - "127.0.0.1:${GITHUB_API_PORT}:${GITHUB_API_PORT}"

  cloudfront:
    image: oven/bun:1-distroless
    volumes:
      - ${WORKFLOW_TESTS_ROOT}/stubs/cloudfront.ts:/server.ts:ro
      - ${ENV_DIR}:/env
    environment:
      PORT: "${CLOUDFRONT_PORT}"
    command: ["/server.ts"]
    ports:
      - "127.0.0.1:${CLOUDFRONT_PORT}:${CLOUDFRONT_PORT}"

  docs-cloudfront:
    image: oven/bun:1-distroless
    volumes:
      - ${WORKFLOW_TESTS_ROOT}/stubs/cloudfront-origin.ts:/server.ts:ro
    environment:
      PORT: "${DOCS_CLOUDFRONT_PORT}"
      MOTO_URL: http://moto:${MOTO_PORT}
      S3_BUCKET: ${DOCS_S3_BUCKET_NAME}
      S3_PATH_PREFIX: ""
      S3_REGION: ${AWS_REGION}
      ACCESS_KEY: ${DOCS_S3_ACCESS_KEY}
      SECRET_KEY: ${DOCS_S3_SECRET_ACCESS_KEY}
      PRODUCTION_ORIGIN: https://${DOCS_PRODUCTION_DOMAIN}
    command: ["/server.ts"]
    ports:
      - "127.0.0.1:${DOCS_CLOUDFRONT_PORT}:${DOCS_CLOUDFRONT_PORT}"
    depends_on:
      - moto

  icons-cloudfront:
    image: oven/bun:1-distroless
    volumes:
      - ${WORKFLOW_TESTS_ROOT}/stubs/cloudfront-origin.ts:/server.ts:ro
    environment:
      PORT: "${ICONS_CLOUDFRONT_PORT}"
      MOTO_URL: http://moto:${MOTO_PORT}
      S3_BUCKET: ${ICONS_BUCKET}
      S3_PATH_PREFIX: /${ICONS_BASE_FOLDER}
      S3_REGION: ${AWS_REGION}
      ACCESS_KEY: ${ICONS_S3_ACCESS_KEY}
      SECRET_KEY: ${ICONS_S3_SECRET_ACCESS_KEY}
      PRODUCTION_ORIGIN: https://${ICONS_PRODUCTION_DOMAIN}
    command: ["/server.ts"]
    ports:
      - "127.0.0.1:${ICONS_CLOUDFRONT_PORT}:${ICONS_CLOUDFRONT_PORT}"
    depends_on:
      - moto

  git-server:
    build:
      context: ${ENV_DIR}/config
      dockerfile: Dockerfile.git-server
    volumes:
      - ${ENV_DIR}/config/repos:/repos
    environment:
      PORT: "${GIT_SERVER_PORT}"
    ports:
      - "127.0.0.1:${GIT_SERVER_PORT}:${GIT_SERVER_PORT}"

  act:
    build:
      context: ${ENV_DIR}/config
      dockerfile: Dockerfile.act-controller
    working_dir: /env
    entrypoint: ["/bin/bash", "-lc"]
    command: ["sleep infinity"]
    volumes:
      - ${ENV_DIR}:/env
      - ${ACT_CACHE_VOLUME}:/act-cache
      - /var/run/docker.sock:/var/run/docker.sock
    network_mode: "service:wg-client"

networks:
  wg_network:
    driver: bridge

volumes:
  ${ACT_CACHE_VOLUME}:
    external: true
EOF

cat > "${ENV_DIR}/github-secrets.env" <<EOF
GITHUB_TOKEN=${GITHUB_LOCAL_TOKEN}
NPM_VVD_VNG_AUTOMATION_TOKEN=${NPM_LOCAL_AUTH_TOKEN}
VNG_VVD_PAT=${GITHUB_PACKAGES_LOCAL_TOKEN}
DOCS_S3_ACCESS_KEY=${DOCS_S3_ACCESS_KEY}
DOCS_S3_SECRET_ACCESS_KEY=${DOCS_S3_SECRET_ACCESS_KEY}
AWS_REGION=${AWS_REGION}
DOCS_S3_BUCKET_NAME=${DOCS_S3_BUCKET_NAME}
AWS_CLOUDFRONT_DISTRIBUTION_ID=${DOCS_CLOUDFRONT_DISTRIBUTION}
ICONS_S3_ACCESS_KEY=${ICONS_S3_ACCESS_KEY}
ICONS_S3_SECRET_ACCESS_KEY=${ICONS_S3_SECRET_ACCESS_KEY}
ARTIFACTORY_SECRET=${ARTIFACTORY_LOCAL_TOKEN}
EOF

cat > "${ENV_DIR}/github-vars.env" <<EOF
ICONS_BUCKET=${ICONS_BUCKET}
ICONS_BASE_FOLDER=${ICONS_BASE_FOLDER}
EOF

printf 'Environment created: %s\n' "${ENV_DIR}"
printf 'mitmweb password: %s\n' "${MITMWEB_PASSWORD}"
