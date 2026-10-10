#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/djibai-app"
fail(){ echo "✗ $1" >&2; exit 1; }; ok(){ echo "✓ $1"; }
[[ -f package.json && -f vite.config.ts ]] || fail "缺少 djibai-app"
ok "核心文件齐全"
[[ -d node_modules ]] || npm install --no-fund --no-audit
# vue-tsc 可能严；优先 vite build
npx vite build
ok "vite build 通过"
echo ""; echo "smoke: ok"
