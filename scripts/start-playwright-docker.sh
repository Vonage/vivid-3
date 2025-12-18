#!/bin/bash

# Start a Playwright server inside a Docker container

PLAYWRIGHT_VERSION="1.57.0"
CONTAINER_NAME="vivid-playwright"
SERVER_PORT=3000

docker run \
    --name "$CONTAINER_NAME" \
    --add-host=hostmachine:host-gateway \
    -p "${SERVER_PORT}:${SERVER_PORT}" \
    --rm \
    --init \
    --ipc=host \
    "mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble" \
    /bin/sh -c "npx -y playwright@${PLAYWRIGHT_VERSION} run-server --port ${SERVER_PORT} --host 0.0.0.0"
