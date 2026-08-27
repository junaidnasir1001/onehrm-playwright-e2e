#!/usr/bin/env bash

set -euo pipefail

url="${1:-http://127.0.0.1:7080/login}"
timeout_seconds="${2:-60}"
started_at=$SECONDS

echo "Waiting up to ${timeout_seconds}s for ${url}"

until curl --fail --silent --show-error --max-time 5 "$url" >/dev/null; do
  if (( SECONDS - started_at >= timeout_seconds )); then
    echo "The Internet did not become ready at ${url} within ${timeout_seconds}s." >&2
    exit 1
  fi

  sleep 2
done

echo "The Internet is ready at ${url}"
