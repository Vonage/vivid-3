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

if [[ $# -ne 2 ]]; then
	echo "❗ Wrong number of arguments."
	echo "Usage: build.image.sh builder version"
	echo "  builder: name of the builder to use."
	echo "  version: new version of the image using x.y.z format."
	echo "Example: ./scripts/visual-tests/build.image.sh mybuilder 2.0.1"
	echo
	echo "Here's the list of installed builders:"
	docker buildx ls
	exit 1
fi

docker buildx use $1
docker buildx build --platform linux/amd64,linux/arm64 -t vivid3/vonage:$2 --push .