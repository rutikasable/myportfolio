#!/usr/bin/env pwsh
# ─────────────────────────────────────────────────────
# Portfolio Local Dev Launcher
# Run this from the repo root:  .\run.ps1
# ─────────────────────────────────────────────────────

Write-Host ""
Write-Host "=== Portfolio Dev Server ===" -ForegroundColor Cyan
Write-Host ""

# Check pnpm is available
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] pnpm is not installed. Install it with:" -ForegroundColor Red
    Write-Host "  npm install -g pnpm" -ForegroundColor Yellow
    exit 1
}

# Install dependencies if node_modules is missing or stale
if (-not (Test-Path "node_modules")) {
    Write-Host "[INFO] Installing dependencies..." -ForegroundColor Yellow
    pnpm install --no-frozen-lockfile
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] pnpm install failed." -ForegroundColor Red
        exit 1
    }
}

Write-Host "[INFO] Starting portfolio dev server on http://localhost:5173" -ForegroundColor Green
Write-Host ""

# Start the Vite frontend dev server
Set-Location artifacts\portfolio
$env:PORT = "5173"
$env:BASE_PATH = "/"
pnpm run dev
