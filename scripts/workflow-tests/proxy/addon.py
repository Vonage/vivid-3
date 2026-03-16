from __future__ import annotations

import base64
import json
import os
import threading
import time
import uuid
from pathlib import Path

from mitmproxy import http

LOG_PATH = Path("/env/logs/proxy.requests.jsonl")
LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

VERDACCIO_NPM_PORT = int(os.environ["VERDACCIO_NPM_PORT"])
VERDACCIO_GITHUB_PORT = int(os.environ["VERDACCIO_GITHUB_PORT"])
PUB_ARTIFACTORY_PORT = int(os.environ["PUB_ARTIFACTORY_PORT"])
MOTO_PORT = int(os.environ["MOTO_PORT"])
GITHUB_API_PORT = int(os.environ["GITHUB_API_PORT"])
CLOUDFRONT_PORT = int(os.environ["CLOUDFRONT_PORT"])
DOCS_CLOUDFRONT_PORT = int(os.environ["DOCS_CLOUDFRONT_PORT"])
ICONS_CLOUDFRONT_PORT = int(os.environ["ICONS_CLOUDFRONT_PORT"])
GIT_SERVER_PORT = int(os.environ["GIT_SERVER_PORT"])

PROJECT_GITHUB_OWNER = os.environ["GITHUB_REPOSITORY_OWNER"]
PROJECT_GITHUB_NAME = os.environ["GITHUB_REPOSITORY_NAME"]
DOCS_PRODUCTION_DOMAIN = os.environ["DOCS_PRODUCTION_DOMAIN"]
ICONS_PRODUCTION_DOMAIN = os.environ["ICONS_PRODUCTION_DOMAIN"]

AWS_REGION = os.environ["AWS_REGION"]
DOCS_BUCKET = os.environ["DOCS_S3_BUCKET_NAME"]
ICONS_BUCKET = os.environ["ICONS_BUCKET"]

REDIRECTS: dict[str, tuple[str, str, int, bool]] = {
    "registry.npmjs.org": ("verdaccio-npm", "verdaccio-npm", VERDACCIO_NPM_PORT, False),
    "npm.pkg.github.com": ("verdaccio-github", "verdaccio-github", VERDACCIO_GITHUB_PORT, False),
    "eu-artifactory.vonage.cloud": ("pub-artifactory", "pub-artifactory", PUB_ARTIFACTORY_PORT, True),
    "api.github.com": ("github-api", "github-api", GITHUB_API_PORT, False),
    "cloudfront.amazonaws.com": ("cloudfront", "cloudfront", CLOUDFRONT_PORT, False),
    DOCS_PRODUCTION_DOMAIN: ("docs-cloudfront", "docs-cloudfront", DOCS_CLOUDFRONT_PORT, False),
    ICONS_PRODUCTION_DOMAIN: ("icons-cloudfront", "icons-cloudfront", ICONS_CLOUDFRONT_PORT, False),
}

S3_HOSTS = {
    "s3.amazonaws.com",
    f"s3.{AWS_REGION}.amazonaws.com",
    f"{DOCS_BUCKET}.s3.amazonaws.com",
    f"{DOCS_BUCKET}.s3.{AWS_REGION}.amazonaws.com",
    f"{ICONS_BUCKET}.s3.amazonaws.com",
    f"{ICONS_BUCKET}.s3.{AWS_REGION}.amazonaws.com",
}

PASSTHROUGH_AUTH_STRIP_HOSTS = {
    "github.com",
    "raw.githubusercontent.com",
    "codeload.github.com",
    "objects.githubusercontent.com",
    "uploads.github.com",
    "release-assets.githubusercontent.com",
}

LOCK = threading.Lock()
PROJECT_REPO_PATH = f"/{PROJECT_GITHUB_OWNER}/{PROJECT_GITHUB_NAME}"
PROJECT_GIT_REPO_PATH = f"{PROJECT_REPO_PATH}.git"


def set_proxy_action(flow: http.HTTPFlow, action: dict) -> None:
    flow.metadata["proxy_action"] = action


def redirect_request(
    flow: http.HTTPFlow,
    *,
    scheme: str,
    host: str,
    port: int,
    preserve_host: bool = False,
) -> None:
    original_host = str(flow.metadata.get("original_host", flow.request.pretty_host))
    flow.request.scheme = scheme
    flow.request.host = host
    flow.request.port = port
    if preserve_host:
        flow.request.headers["Host"] = original_host
    else:
        default_port = 80 if scheme == "http" else 443
        flow.request.headers["Host"] = host if port == default_port else f"{host}:{port}"


def is_sts_host(host: str) -> bool:
    return host == "sts.amazonaws.com" or (
        host.startswith("sts.") and host.endswith(".amazonaws.com")
    )


def _is_project_repo_path(path: str) -> bool:
    clean = path.split("?", 1)[0]
    return clean.startswith(f"{PROJECT_REPO_PATH}/") or clean.startswith(f"{PROJECT_GIT_REPO_PATH}/")


def normalize_s3_request(flow: http.HTTPFlow) -> None:
    transfer_encoding = flow.request.headers.get("Transfer-Encoding", "")
    if "chunked" not in transfer_encoding.lower():
        return

    raw_content = flow.request.raw_content or b""
    if not raw_content:
        return

    body, _ = _decode_chunked_http_body(raw_content)
    flow.request.content = body

    for header_name in ("Transfer-Encoding", "Content-Encoding", "X-Amz-Trailer", "X-Amz-Content-SHA256"):
        if header_name in flow.request.headers:
            del flow.request.headers[header_name]

    flow.request.headers["Content-Length"] = str(len(body))


def _decode_chunked_http_body(raw_content: bytes) -> tuple[bytes, dict[str, str]]:
    position = 0
    body_parts: list[bytes] = []
    trailers: dict[str, str] = {}

    while True:
        line_end = raw_content.find(b"\r\n", position)
        if line_end == -1:
            raise ValueError("Invalid chunked body: missing chunk header terminator")

        chunk_size = int(raw_content[position:line_end].decode("ascii").split(";", 1)[0], 16)
        position = line_end + 2

        if chunk_size == 0:
            while True:
                trailer_end = raw_content.find(b"\r\n", position)
                if trailer_end == -1:
                    raise ValueError("Invalid chunked body: unterminated trailer")
                trailer_line = raw_content[position:trailer_end]
                position = trailer_end + 2
                if trailer_line == b"":
                    return b"".join(body_parts), trailers
                name, _, value = trailer_line.partition(b":")
                trailers[name.decode("ascii").strip()] = value.decode("utf-8", errors="replace").strip()

        chunk = raw_content[position:position + chunk_size]
        if len(chunk) != chunk_size:
            raise ValueError("Invalid chunked body: truncated chunk")
        body_parts.append(chunk)
        position += chunk_size

        if raw_content[position:position + 2] != b"\r\n":
            raise ValueError("Invalid chunked body: missing chunk terminator")
        position += 2


def body_preview(content: bytes | None) -> dict:
    if not content:
        return {"size": 0, "preview": ""}
    size = len(content)
    preview_bytes = content[:4096]
    is_text = b"\x00" not in preview_bytes
    return {
        "size": size,
        "encoding": "utf8" if is_text else "base64",
        "truncated": size > 4096,
        "preview": preview_bytes.decode("utf-8", errors="replace")
        if is_text
        else base64.b64encode(preview_bytes).decode("ascii"),
    }


def log_flow(flow: http.HTTPFlow) -> None:
    request_headers = flow.metadata.get("original_headers") or dict(flow.request.headers.items(multi=True))
    started_at = float(flow.metadata.get("started_at", time.time()))
    proxy_action = flow.metadata.get("proxy_action", {"type": "passthrough"})
    payload = {
        "requestId": flow.metadata.get("request_id"),
        "startedAt": time.strftime("%Y-%m-%dT%H:%M:%S", time.gmtime(started_at))
        + f".{int((started_at % 1) * 1000):03d}Z",
        "method": flow.request.method,
        "host": flow.metadata.get("original_host", flow.request.pretty_host),
        "url": flow.metadata.get("original_path", flow.request.path),
        "proxyAction": proxy_action,
        "headers": request_headers,
        "requestBody": body_preview(flow.request.raw_content),
        "statusCode": flow.response.status_code if flow.response is not None else 502,
        "durationMs": int((time.time() - started_at) * 1000),
    }
    if flow.error is not None:
        payload["error"] = flow.error.msg
    with LOCK:
        with LOG_PATH.open("a", encoding="utf-8") as f:
            f.write(json.dumps(payload) + "\n")


class VvdAddon:
    def request(self, flow: http.HTTPFlow) -> None:
        original_host = flow.request.pretty_host
        original_path = flow.request.path
        request_id = str(uuid.uuid4())

        flow.metadata["request_id"] = request_id
        flow.metadata["started_at"] = time.time()
        flow.metadata["original_host"] = original_host
        flow.metadata["original_path"] = original_path
        flow.metadata["original_headers"] = dict(flow.request.headers.items(multi=True))

        # Redirect HTTP to HTTPS
        if flow.request.scheme == "http":
            set_proxy_action(flow, {"type": "httpRedirect"})
            flow.response = http.Response.make(
                308,
                b"",
                {"Location": f"https://{original_host}{original_path}"},
            )
            return

        # Table-driven redirects
        if original_host in REDIRECTS:
            service, host, port, preserve_host = REDIRECTS[original_host]
            set_proxy_action(flow, {
                "type": "redirect",
                "service": service,
                "target": f"{host}:{port}",
            })
            redirect_request(flow, scheme="http", host=host, port=port, preserve_host=preserve_host)
            return

        # STS -> moto
        if is_sts_host(original_host):
            set_proxy_action(flow, {"type": "redirect", "service": "moto", "target": f"moto:{MOTO_PORT}"})
            redirect_request(flow, scheme="http", host="moto", port=MOTO_PORT, preserve_host=True)
            return

        # S3 -> moto (with chunked encoding normalization)
        if original_host in S3_HOSTS:
            normalize_s3_request(flow)
            set_proxy_action(flow, {"type": "redirect", "service": "moto", "target": f"moto:{MOTO_PORT}"})
            redirect_request(flow, scheme="http", host="moto", port=MOTO_PORT, preserve_host=True)
            return

        # github.com git operations for the project repo -> local git server
        # Other github.com paths (e.g. action source fetches) pass through.
        if original_host == "github.com" and _is_project_repo_path(original_path):
            set_proxy_action(flow, {
                "type": "redirect",
                "service": "git-server",
                "target": f"git-server:{GIT_SERVER_PORT}",
            })
            redirect_request(flow, scheme="http", host="git-server", port=GIT_SERVER_PORT)
            return

        # Passthrough with auth stripping since the local auth token isn't real
        if original_host in PASSTHROUGH_AUTH_STRIP_HOSTS and "authorization" in flow.request.headers:
            set_proxy_action(flow, {"type": "passthrough", "authStripped": True})
            del flow.request.headers["authorization"]

    def response(self, flow: http.HTTPFlow) -> None:
        log_flow(flow)

    def error(self, flow: http.HTTPFlow) -> None:
        log_flow(flow)


addons = [VvdAddon()]
