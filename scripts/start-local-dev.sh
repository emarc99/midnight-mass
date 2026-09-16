#!/usr/bin/env bash
# SPDX-License-Identifier: Apache-2.0
# Copyright 2026 Midnight MASS Contributors

set -e

echo "========================================================="
echo " Starting Midnight MASS Local Undeployed Development Stack"
echo "========================================================="

echo "[1/3] Spinning up Midnight Node, Indexer, and Proof Server via Docker..."
docker compose up -d

echo "[2/3] Waiting for Indexer (http://localhost:8088/api/v4/graphql) and Proof Server (http://localhost:6300)..."
sleep 4

echo "[3/3] Checking stack health..."
curl -s http://localhost:6300/health || echo "Proof server initializing..."

echo "========================================================="
echo " Stack ready! Run 'npm run dev' to launch Midnight MASS UI."
echo "========================================================="
