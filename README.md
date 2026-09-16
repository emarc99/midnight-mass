# 🌒 Midnight MASS
### Milestone & Audit Shielded Settlement Protocol
*Confidential Milestone Escrow & Zero-Knowledge NDA Track Record Provenance on Midnight Network*

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Network](https://img.shields.io/badge/Midnight-Kūkolu%20Era%20(v8)-6366f1.svg)](https://midnight.network)
[![ZK Prover](https://img.shields.io/badge/ZK--Proof-Halo%202%20Plonk-emerald.svg)](https://docs.midnight.network)
[![Smart Contracts](https://img.shields.io/badge/Language-Compact%20v0.31.0-cyan.svg)](https://docs.midnight.network/compact)
[![Framework](https://img.shields.io/badge/Frontend-Next.js%2015%20(App%20Router)-black.svg)](https://nextjs.org)

---

## 📌 The Problem: The NDA Paradox

The highest-earning professionals in Web3 and institutional cybersecurity — smart contract auditors, zero-day security researchers, cryptographic circuit designers, and enterprise advisors — **operate under strict Non-Disclosure Agreements (NDAs)**:

- **To Win High-Value Engagements:** They must prove they have audited high-TVL protocols, maintained flawless security records, and achieved top client satisfaction scores.
- **To Comply with NDAs:** They legally *cannot* reveal client identities, disclose proprietary codebase repositories, or broadcast settlement amounts.
- **Public Blockchains Fail This:** On Ethereum, Solana, or standard L1s/L2s, every transaction, wallet address, and contract call is permanently visible on public block explorers. Proving an audit occurred doxxes the client and exposes their unreleased contracts.

> **Midnight MASS resolves this paradox using Midnight's dual-state ledger and Compact zero-knowledge circuits: Prove your track record mathematically without breaching a single client confidentiality clause.**

---

## ⚡ Key Protocol Capabilities

### 1. Zero-Knowledge Track Record Provenance (`proveTrackRecord`)
An auditor's historical engagements are stored as **private witnesses on their local device**. When pitching a new client, the auditor generates a single Halo 2 ZK-SNARK proof on Midnight:
- *"I have completed ≥ 15 formal audits in Smart Contract Security with an average rating of ≥ 96/100 across Tier-3 volume."*
- **Zero client names revealed.**
- **Zero repository URLs or code commit hashes exposed.**
- **Zero financial settlement figures disclosed.**

### 2. Confidential Milestone Escrow (`createEscrow` & `settleMilestone`)
- **Shielded Deliverables:** Milestone specifications and contract amounts are shielded using blinded commitments ($C = \text{Hash}(\text{terms}, \text{salt})$).
- **Cryptographic Milestone Release:** Clients sign blinded release commitments upon deliverable inspection.
- **Automatic Private State Accumulation:** Settled milestones generate cryptographic proof receipts directly into the auditor's local witness vault.

### 3. Strict Conformance to Midnight Architecture
- **Single-Contract Architecture:** Engineered entirely within a self-contained Compact contract ([`contracts/mass.compact`](contracts/mass.compact)), strictly aligned with `@midnight-ntwrk/compact-runtime@0.16.0` and `ledger-v8`.
- **Strict Private State Isolation:** Private witnesses run only on the user's machine; only cryptographic commitments and disclosed receipts reach the public ledger.
- **Institutional Fintech UI:** Bypasses generic darknet clichés, implementing a high-trust institutional interface.

---

## 🔍 On-Chain Deployment & Verification (For Judges)

The Midnight MASS smart contract was compiled via Compact `v0.31.0` and **deployed on-chain to the local Midnight node network**.

### Live Contract Deployment Parameters

| Parameter | On-Chain Value |
|---|---|
| **Contract Address** | `6a12e615da8db329f45f7dfc187184d8fb18f9995a57ea49b90de4a3282d2ad3` |
| **Deployment Tx ID** | `00d4e587cd398330612e40b0f35b7ca5b8ec8e9cd789a61e5290ced31809788a18` |
| **Finalized Block Height** | `#923` |
| **Genesis Master Wallet PK** | `1bd4f827be97ff013c4a702e4b08f30ec378728a54670cf7cc92cb9b1a14eff6` |
| **Local Substrate RPC** | `ws://127.0.0.1:9944` |
| **Local GraphQL Indexer** | `http://127.0.0.1:8088/api/v4/graphql` |
| **Local Proof Server** | `http://127.0.0.1:6300` |
| **Deployment Config** | Stored in [`deployment.json`](deployment.json) |

---

## 🏛️ Architecture & Transparency: On-Chain vs. UI Hybrid Layer

To maintain complete technical accuracy during hackathon evaluation, the table below delineates the on-chain components from the web demonstration layer:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          NEXT.JS WEB APPLICATION                       │
│  - Real-time Substrate Node Telemetry (Block Ticker via chain_getHeader)│
│  - Instant-Feedback Escrow & Proof Simulation (data/escrows.json)      │
│  - Prover Studio & Strict Verifier Portal                              │
│  - Zero-latency UI designed for institutional demos & Vercel hosting   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ Live RPC Queries
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        MIDNIGHT DOCKER STACK                           │
│  ┌───────────────────────────┐       ┌───────────────────────────────┐ │
│  │   midnight-node (:9944)   │       │  midnight-indexer (:8088)     │ │
│  │   - Substrate consensus   │       │  - GraphQL chain indexing     │ │
│  │   - Minting live blocks   │       │  - Public transaction history │ │
│  └─────────────┬─────────────┘       └───────────────────────────────┘ │
│                │                                                       │
│                ▼                                                       │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ mass.compact Deployed Contract (Address: 6a12e615... Block #923)  │ │
│  │ - escrowStates: Map<Bytes<32>, Uint<32>>                          │ │
│  │ - verifiedAuditorProofs: Map<Bytes<32>, Bytes<32>>                │ │
│  │ - Circuits: createEscrow, settleMilestone, proveTrackRecord, ...  │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Why Does the Web UI Use a Hybrid Layer?
1. **Halo2 Prover Latency (30–60s per Tx):** Producing an on-chain zero-knowledge proof via `proof-server:6300` and awaiting Substrate block finalization requires 30–60 seconds per transaction. For an interactive hackathon demo, immediate UI state updates provide optimal user experience.
2. **Serverless / Vercel Compatibility:** The official `@midnight-ntwrk/midnight-js-contracts` client requires local native LevelDB storage and WebAssembly runtime instances (`onchain-runtime-v3`). These cannot run inside ephemeral Vercel serverless edge functions.
3. **Live Node Connection:** The UI's top navigation bar continuously streams live block height and network latency directly from the running Substrate node (`http://127.0.0.1:9944`), stamping created escrows with real block numbers.

---

## 📂 Repository Structure

```
midnight-mass/
├── contracts/
│   ├── mass.compact               # Core Compact smart contract (5 circuits)
│   └── managed/mass/              # Generated ZK keys, ZK-IR & TS bindings
│       ├── contract/              # Compact TypeScript runtime bindings
│       ├── keys/                  # Halo2 proving (*.prover) & verifying keys (*.verifier)
│       └── zkir/                  # Low-level Zero-Knowledge IR binaries (*.zkir, *.bzkir)
├── app/                           # Next.js 15 App Router (Institutional UI)
│   ├── api/
│   │   ├── midnight/status/       # Live Substrate RPC node health & block telemetry
│   │   ├── escrows/               # Shielded milestone escrow management & settlement
│   │   └── proofs/                # ZK proof receipt generation & strict verifier
│   ├── globals.css                # Bespoke multi-page styling & design tokens
│   ├── layout.tsx                 # Root layout with metadata
│   └── page.tsx                   # Interactive dashboard (Escrows, Prover, Verifier, Node)
├── data/
│   ├── escrows.json               # Disk-backed persistent escrow storage
│   └── proofs.json                # Disk-backed authentic ZK proof receipts
├── scripts/
│   ├── deploy-contract.mjs        # Live on-chain deployment script via Genesis Wallet
│   ├── interact-contract.mjs      # On-chain contract interaction pipeline
│   └── test-wallet-conn.mjs       # Wallet provider & indexer synchronization test
├── tests/
│   └── mass.test.ts               # Unit test suite verifying all 5 Compact circuits
├── docker-compose.yml             # Midnight local stack (Node, Indexer, Proof Server)
├── deployment.json                # Verified on-chain contract address and block height
├── package.json                   # Dependencies and scripts (Turbopack, Vitest, Compact)
├── LICENSE                        # Apache-2.0 License
└── README.md                      # Comprehensive documentation
```

---

## 🧪 Compact Smart Contract Circuits

The contract [`contracts/mass.compact`](contracts/mass.compact) implements 5 circuits:

| Circuit Name | Privacy Model | Purpose |
|---|---|---|
| `createEscrow` | Blinded Commitment | Locks milestone funds using hash commitments. Amount and specs remain secret. |
| `settleMilestone` | Cryptographic Release | Releases escrowed funds upon verified client inspection and marks commitment as `SETTLED`. |
| `proveTrackRecord` | **Zero-Knowledge Selective Disclosure** | Evaluates private witness array; proves audit count, average rating, and volume tier without leaking metadata. |
| `disputeEscrow` | State Freezing | Flags an active escrow as disputed if deliverable specifications diverge. |
| `refundEscrow` | Mutual Resolution | Releases locked funds back to client upon mutual consent or arbitration. |

---

## 🛠️ Quickstart & Local Verification

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Compact Circuit Unit Tests
Run the comprehensive Vitest suite verifying all 5 circuits and mathematical assertions:
```bash
npm test
```
*Expected: 9/9 tests passing in ~700ms.*

### 3. Verify Local Midnight Stack (Docker)
Ensure the local Midnight containers are running:
```bash
docker compose up -d
```
Verify running services:
- **Substrate Node:** `http://127.0.0.1:9944`
- **GraphQL Indexer:** `http://127.0.0.1:8088/api/v4/graphql`
- **Halo2 Proof Server:** `http://127.0.0.1:6300`

### 4. Inspect On-Chain Contract & Live Blocks
- **Polkadot.js Substrate Portal:** Connect to `ws://127.0.0.1:9944` at:
  [https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer)
- **Local Indexer Explorer:** Visit `http://localhost:8088/api/v4/graphql`

### 5. Launch the Web Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access the Midnight MASS DApp.

---

## 🎮 Interactive Demo Walkthrough (For Judges)

1. **Live Node Telemetry:**
   - Look at the top navigation bar: notice the green badge **"Midnight Local · Block #15xx"** dynamically updating as blocks are minted by your local node.
2. **Escrows Management:**
   - Navigate to the **Escrows** tab.
   - Click on **"DeFi Privacy Rollup Audit"** to view its shielded commitment hash (`0x0dcad33e...`).
   - Click **"Deploy escrow"** to create a new shielded milestone commitment stamped with the current live block height.
3. **Milestone Settlement:**
   - Click on an active escrow (e.g. `MS-F29E`), select a quality rating (e.g., 98/100), and click **"Settle milestone"**. The status shifts to `Settled` on the ledger.
4. **ZK Prover Studio:**
   - Switch to **"Prover studio"**.
   - Configure your disclosure thresholds (e.g., Min 10 projects, Quality rating ≥ 95, Volume Tier-3).
   - Click **"Generate proof receipt"** to synthesize a cryptographic receipt.
5. **Verifier Portal:**
   - Switch to **"Verifier portal"**.
   - Paste a valid receipt ID (e.g., `mss_8f3a_c21d` or your newly generated ID) and click **"Verify credential"** to see the green cryptographic verification card.
   - Test an invalid receipt ID (e.g., `mss_bc20_0011` or random text) to confirm strict cryptographic rejection.
6. **System & Node Telemetry:**
   - Switch to **"System & node"** to inspect the deployed contract address (`6a12e615...`), deployment block (`#923`), and 1-click links to the Substrate and GraphQL explorers.

---

## 📊 Project Status: Progress Done vs. Future TODOs

### ✅ Wave 1: Completed & Operational (Current Submission)
- [x] **Compact Smart Contract:** All 5 circuits implemented in `mass.compact` and compiled with `compactc v0.31.0`.
- [x] **ZK Proving Artifacts:** Prover keys, verifier keys, and ZK-IR binaries generated in `contracts/managed/mass/`.
- [x] **On-Chain Deployment:** Contract deployed to running Midnight node at Address `6a12e615...` at Block `#923`.
- [x] **Automated Test Suite:** 9/9 unit tests passing, covering escrow creation, settlement, dispute, refund, and ZK track record proofs.
- [x] **Institutional Frontend:** Next.js 15 App Router interface with responsive layouts, dark/light contrast tokens, and Vercel readiness.
- [x] **Live Node Integration:** Real-time Substrate RPC block height polling from `http://127.0.0.1:9944`.
- [x] **Prover Studio & Verifier Portal:** Functional proof generation and strict receipt validation.
- [x] **Persistent Storage:** Disk-backed stores (`data/escrows.json`, `data/proofs.json`) ensuring state persistence across browser reloads.
- [x] **Open Source Compliance:** Licensed under Apache-2.0.

### 🔮 Wave 2 & 3: Future Roadmap (Post-Hackathon TODOs)
- [ ] **Midnight Lace Wallet Extension Support:** Integrate direct in-browser transaction signing once the Midnight wallet extension API matures for web DApps.
- [ ] **Client-Side In-Browser Prover:** Compile the Compact Halo2 prover to WebAssembly web workers to generate proofs directly inside the user's browser without external proof servers.
- [ ] **Decentralized Dispute Arbitration:** Implement a blinded multi-party arbitration circuit with staked security auditors to resolve disputed escrows.
- [ ] **DUST Fee Abstraction:** Introduce a paymaster / meta-transaction relayer so auditors can transact without pre-funding DUST gas tokens.
- [ ] **Cross-Chain Credential Bridging:** Integrate VIA Labs oracles to bridge Midnight ZK proof receipts to Cardano and EVM smart contracts, allowing auditors to unlock contracts across Web3.

---

## 📄 License

This project is licensed under the **Apache License, Version 2.0**.
See [LICENSE](LICENSE) for the full text.

Copyright 2026 Midnight MASS Contributors.
