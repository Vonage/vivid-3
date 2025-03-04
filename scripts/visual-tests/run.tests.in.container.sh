if [[ $1 == "--task=update" ]]; then
	echo "❗ Invalid argument '--task=update'"
	echo "Usage has changed. Use '--update-snapshots' now instead of '--task=update'."
	exit 1
fi

# update with proper image name when moved
docker run -i --name vivid-visual-tests --rm -v "$PWD:/usr/src/app" drizzt99/vonage:2.3.0 "$@"
