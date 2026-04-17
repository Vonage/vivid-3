# Local Workflow Test Environment

Local docker harness for running GitHub Actions workflows through `act` while stubbing out external services.

## Usage

```shell
./bin/create.sh # (Re-)creates the environment in env/
./bin/start.sh # Starts the local environment
./tests/<test>.ts # Runs a workflow test
./bin/stop.sh # Stops the local environment
./bin/destroy.sh # Destroys the environment
```

## Act

Act runs the workflows in docker containers. The act controller itself also runs in a container so that it doesn't need to be installed locally.

It operates on a clone of the local repository in `./env/repo`.

Workflow output is logged to `./env/logs/act.<...>.log`.

The act cache is persisted across environments in an external volume `vvdworkflowtests-act-cache`.

## Proxy

All workflow traffic is intercepted by mitmproxy with a custom addon (`./proxy/addon.py`) that handles routing requests to the appropriate stub service if needed. The proxy root CA cert is installed in the workflow containers.

All requests are logged to `./env/logs/proxy.requests.jsonl`.

Additionally, a SOCKS5 endpoint is exposed on port 5555.

For example, on MacOS you can open the deployed docs site in Chrome with this command:

```shell
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir="/tmp/chrome-profile" --proxy-server="socks5://127.0.0.1:5555" --ignore-certificate-errors "https://apps.vivid.vonage.com/"
```

## Stub Services

### NPM Registries

The official npm and GitHub Packages registries are stubbed with Verdaccio.

You can view the published packages here:

- npm: http://localhost:3000/
- GitHub: http://localhost:3001/

### Artifactory Pub Registry

Our Artifactory pub registry (https://eu-artifactory.vonage.cloud/) is stubbed by custom server.

Published packages are written to: `env/state/pub-artifactory/`

### S3 & STS

S3 and STS (used by the aws-actions/configure-aws-credentials action) are stubbed by Moto.

You can view some information about the current state here: http://localhost:3003/moto-api/

### Cloudfront API

A custom server captures Cloudfront invalidation requests.

They are stored in: `env/state/cloudfront-stub.json`

### Cloudfront

A custom server simulates how Cloudfront serves our S3 buckets.
It tries to fetch from local Moto S3 and falls back to the production upstream.

Endpoints:

- https://apps.vivid.vonage.com/ -> http://localhost:3006/
- https://icon.resources.vonage.com/ -> http://localhost:3007/

### GitHub API

A custom server simulates the GitHub API as far as necessary for actions like release-please.

The state is stored in: `env/state/github-stub.json`

### GitHub Git Server

A custom server serves the local git repository over HTTP, so that actions can clone it.

## Limitations

- Currently, credentials are not being validated
