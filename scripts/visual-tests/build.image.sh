#!/bin/bash

## https://stackoverflow.com/questions/43978837/how-to-check-if-docker-daemon-is-running
{
	docker ps -q >/dev/null
} || {
	echo "❗ Docker is not running, please launch it first."
	exit 1
}

if [[ ! -f "./dockerfile" ]]; then
	echo "❗ dockerfile not found."
	echo "Run the script from the location of the dockerfile."
	exit 1
fi

if [[ $# -ne 3 ]]; then
	echo "❗ Wrong number of arguments."
	echo "Usage: build.image.sh builder version action"
	echo "  builder: name of the builder to use."
	echo "  version: new version of the image using x.y.z format."
	echo "  action: 'push' to push the image to docker hub, 'load' to load it locally for testing."
	echo "Example: ./scripts/visual-tests/build.image.sh mybuilder 2.0.1 push"
	echo
	echo "Here's the list of installed builders:"
	docker buildx ls
	exit 1
fi

docker buildx use "$1"

platform="linux/amd64,linux/arm64"
if [[ $3 == "load" ]]; then
	# Cannot load multi-arch images, so we need to build for the current platform only
	platform="linux/arm64"
fi

docker buildx build --platform "$platform" -t "drizzt99/vonage:$2" "--$3" .
