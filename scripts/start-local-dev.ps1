# SPDX-License-Identifier: Apache-2.0
# Copyright 2026 Midnight MASS Contributors

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host " Starting Midnight MASS Local Undeployed Development Stack" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan

Write-Host "[1/3] Spinning up Midnight Node, Indexer, and Proof Server via Docker..." -ForegroundColor Yellow
docker compose up -d

Write-Host "[2/3] Waiting for Indexer (8088) and Proof Server (6300)..." -ForegroundColor Yellow
Start-Sleep -Seconds 4

Write-Host "[3/3] Checking stack health..." -ForegroundColor Yellow
try {
    $res = Invoke-RestMethod -Uri "http://localhost:6300/health" -Method Get -TimeoutSec 3
    Write-Host "Proof Server Status: Healthy" -ForegroundColor Green
} catch {
    Write-Host "Proof Server is spinning up..." -ForegroundColor Gray
}

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host " Stack ready! Run 'npm run dev' to launch Midnight MASS UI." -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Cyan
