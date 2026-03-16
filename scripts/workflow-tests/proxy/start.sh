#!/usr/bin/env bash
set -euo pipefail

# Adapted from https://github.com/Srikanth0824/side-projects/tree/main/mitm_wg

export PYTHONUNBUFFERED=1
rm -f /tmp/mitmwireguard.log

echo "[start.sh] Starting mitmdump with WireGuard mode..."

stdbuf -oL mitmdump \
  --mode wireguard \
  --mode socks5@0.0.0.0:5555 \
  --set connection_strategy=lazy \
  --set confdir=/env/config/certs \
  --set block_global=false \
  -s /opt/proxy/addon.py 2>&1 | tee /tmp/mitmwireguard.log &
MTPID=$!

timeout=30
elapsed=0
echo "[start.sh] Waiting for mitmdump to output configuration..."
while [ "${elapsed}" -lt "${timeout}" ]; do
  if grep -q "WireGuard server listening" /tmp/mitmwireguard.log; then
    echo "[start.sh] Configuration output detected."
    break
  fi
  sleep 1
  elapsed=$((elapsed + 1))
done

if [ "${elapsed}" -eq "${timeout}" ]; then
  echo "[start.sh] Timeout waiting for mitmdump output."
else
  awk '/^\[Interface\]/{flag=1} flag { if ($0 ~ /^-+/) { exit } else { print } }' /tmp/mitmwireguard.log \
    | grep -v '^DNS = ' > /env/config/wireguard/wg0.conf
  echo "[start.sh] Configuration captured in /env/config/wireguard/wg0.conf:"
  cat /env/config/wireguard/wg0.conf
fi

wait "${MTPID}"
