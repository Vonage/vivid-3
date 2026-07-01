#!/usr/bin/env bash

# Runs the given command with the Playwright Docker server available.
#
# If the container is not already running, it is started in detached mode and
# shut down once the command finishes. If it was already running (e.g. a
# developer left it running in the background), it is left untouched.
#
# Usage:
#   run-with-playwright-docker <command> [args...]
#
# Example:
#   run-with-playwright-docker vitest run --config vitest.config.browser.ts

PLAYWRIGHT_VERSION="1.57.0"
CONTAINER_NAME="vivid-playwright"
SERVER_PORT=3000

STARTED_CONTAINER=false

# Check if the named container is already running
if ! docker ps \
    --filter "name=^${CONTAINER_NAME}$" \
    --filter "status=running" \
    --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then

    echo "Starting Playwright Docker container..."
    docker run \
        --name "$CONTAINER_NAME" \
        --add-host=hostmachine:host-gateway \
        -p "${SERVER_PORT}:${SERVER_PORT}" \
        --rm \
        --init \
        --ipc=host \
        --detach \
        "mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble" \
        /bin/sh -c "npx -y playwright@${PLAYWRIGHT_VERSION} run-server --port ${SERVER_PORT} --host 0.0.0.0" > /dev/null

    STARTED_CONTAINER=true

    echo "Waiting for Playwright server on port ${SERVER_PORT}..."
    wait-on "http://localhost:${SERVER_PORT}/" --timeout 60000
    echo "Playwright server ready."
fi

# Run the given command with the WebSocket endpoint configured
PW_TEST_CONNECT_WS_ENDPOINT="ws://localhost:${SERVER_PORT}/" "$@"
EXIT_CODE=$?

# Only stop the container if this script was the one that started it
if [ "$STARTED_CONTAINER" = true ]; then
    echo "Stopping Playwright Docker container..."
    docker stop "$CONTAINER_NAME" > /dev/null
fi

exit $EXIT_CODE
