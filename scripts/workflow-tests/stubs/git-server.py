#!/usr/bin/env python3
"""Git Smart HTTP Server"""

import os
import re
import subprocess
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

GIT_PROJECT_ROOT = os.environ.get("GIT_PROJECT_ROOT", "/repos")
PORT = int(os.environ.get("PORT", "3008"))

# Matches: /<path-to-repo>/<git-action>
ACTION_RE = re.compile(
    r"^(?P<repo>/.+?)/(?P<action>info/refs|git-upload-pack)$"
)


def _find_repo(path_prefix):
    """Resolve a URL repo prefix to a directory under GIT_PROJECT_ROOT."""
    rel = path_prefix.lstrip("/")
    for suffix in ("", ".git"):
        candidate = os.path.join(GIT_PROJECT_ROOT, rel + suffix)
        if os.path.isfile(os.path.join(candidate, "HEAD")):
            return candidate
    return None


def _pkt_line(text):
    """Encode a string as a git pkt-line."""
    data = text.encode() if isinstance(text, str) else text
    return f"{len(data) + 4:04x}".encode() + data


class GitHTTPHandler(BaseHTTPRequestHandler):
    # ----- routing ---------------------------------------------------------

    def do_GET(self):
        parsed = urlparse(self.path)
        m = ACTION_RE.match(parsed.path)
        if not m:
            self.send_error(404)
            return

        repo_dir = _find_repo(m.group("repo"))
        if not repo_dir:
            self.send_error(404, f"Repository not found: {m.group('repo')}")
            return

        action = m.group("action")
        if action == "info/refs":
            service = parse_qs(parsed.query).get("service", [None])[0]
            if service == "git-upload-pack":
                self._info_refs(repo_dir)
            else:
                self.send_error(403, f"Unsupported service: {service}")
        else:
            self.send_error(404)

    def do_POST(self):
        parsed = urlparse(self.path)
        m = ACTION_RE.match(parsed.path)
        if not m:
            self.send_error(404)
            return

        repo_dir = _find_repo(m.group("repo"))
        if not repo_dir:
            self.send_error(404, f"Repository not found: {m.group('repo')}")
            return

        if m.group("action") == "git-upload-pack":
            self._upload_pack(repo_dir)
        else:
            self.send_error(403)

    # ----- handlers --------------------------------------------------------

    def _info_refs(self, repo_dir):
        """GET /repo/info/refs?service=git-upload-pack"""
        env = self._git_env()
        try:
            proc = subprocess.run(
                ["git", "upload-pack", "--stateless-rpc", "--advertise-refs", repo_dir],
                capture_output=True, env=env, timeout=30,
            )
        except Exception as exc:
            self.send_error(500, str(exc))
            return

        if proc.returncode != 0:
            self._log_git_error("upload-pack --advertise-refs", proc)
            self.send_error(500, "git upload-pack failed")
            return

        body = (
            _pkt_line("# service=git-upload-pack\n")
            + b"0000"
            + proc.stdout
        )
        self.send_response(200)
        self.send_header("Content-Type", "application/x-git-upload-pack-advertisement")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-cache")
        self.end_headers()
        self.wfile.write(body)

    def _upload_pack(self, repo_dir):
        """POST /repo/git-upload-pack"""
        length = int(self.headers.get("Content-Length", "0"))
        request_body = self.rfile.read(length) if length else b""

        env = self._git_env()
        try:
            proc = subprocess.run(
                ["git", "upload-pack", "--stateless-rpc", repo_dir],
                input=request_body, capture_output=True, env=env, timeout=120,
            )
        except Exception as exc:
            self.send_error(500, str(exc))
            return

        if proc.returncode != 0 and not proc.stdout:
            self._log_git_error("upload-pack", proc)
            self.send_error(500, "git upload-pack failed")
            return

        self.send_response(200)
        self.send_header("Content-Type", "application/x-git-upload-pack-result")
        self.send_header("Content-Length", str(len(proc.stdout)))
        self.send_header("Cache-Control", "no-cache")
        self.end_headers()
        self.wfile.write(proc.stdout)

    # ----- helpers ---------------------------------------------------------

    def _git_env(self):
        env = dict(os.environ)
        proto = self.headers.get("Git-Protocol", "")
        if proto:
            env["GIT_PROTOCOL"] = proto
        return env

    def _log_git_error(self, label, proc):
        stderr = proc.stderr.decode("utf-8", errors="replace").strip()
        sys.stderr.write(
            f"[git-http] {label} rc={proc.returncode} stderr={stderr}\n"
        )
        sys.stderr.flush()

    def log_message(self, fmt, *args):
        sys.stderr.write(f"[git-http] {fmt % args}\n")
        sys.stderr.flush()


if __name__ == "__main__":
    print(f"Git HTTP server on :{PORT}, serving {GIT_PROJECT_ROOT}", flush=True)
    HTTPServer(("", PORT), GitHTTPHandler).serve_forever()
