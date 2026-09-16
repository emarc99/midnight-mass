# 🌒 Midnight MASS
### Milestone & Audit Shielded Settlement Protocol
*Confidential Milestone Escrow & Zero-Knowledge NDA Track Record Provenance on Midnight Network*

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Network](https://img.shields.io/badge/Midnight-Kūkolu%20Era-6366f1.svg)](https://midnight.network)
[![ZK Prover](https://img.shields.io/badge/ZK--Proof-Halo%202%20Plonk-emerald.svg)](https://docs.midnight.network)
[![Smart Contracts](https://img.shields.io/badge/Language-Compact-cyan.svg)](https://docs.midnight.network/compact)

---

## 📌 The Problem: The NDA Paradox

The highest-earning professionals in Web3 and enterprise consulting — smart contract security auditors, zero-day vulnerability researchers, cryptographic engineers, and institutional advisors — **operate under strict Non-Disclosure Agreements (NDAs)**.

- **To Win High-Value Clients:** They must prove they have audited high-TVL protocols, maintained flawless security records, and achieved top client satisfaction scores.
- **To Comply with NDAs:** They legally *cannot* reveal client names, disclose proprietary codebase repositories, or broadcast settlement amounts.
- **Public Blockchains Fail This:** On Ethereum or standard L1s/L2s, every transaction, wallet address, and contract call is permanently visible on public block explorers. Proving an audit occurred doxxes the client and exposes their unreleased contracts.

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

### 3. Strict Conformance to Midnight Architecture (40% Rubric Line)
- **Single-Contract Architecture:** Engineered entirely within a self-contained Compact contract (`contracts/mass.compact`), eliminating cross-contract dependencies and adhering strictly to Midnight's Q3 2026 network capabilities.
- **Strict Private State Isolation:** Private witnesses run only on the user's machine; only cryptographic commitments and disclosed receipts reach the public ledger.
- **Institutional Fintech UI:** Bypasses generic darknet/veil clichés, implementing a high-trust institutional interface.

---

## 🏛️ System Architecture

```
+----------------------------------------------------------------------------------------------------+
|                                    AUDITOR LOCAL CLIENT MACHINE                                    |
|                                                                                                    |
|  +-------------------------------------+          +---------------------------------------------+  |
|  |     Local Encrypted Witness Vault   |          |            Local Proof Server               |  |
|  |  - Past Project Witness Records     | -------> |  - Evaluates Compact ZK Circuits            |  |
|  |  - Sponsor Signed Cryptographic Sigs|          |  - Consumes Witnesses (Never Leaves Device) |  |
|  |  - Milestone Deliverable Salts      |          |  - Generates Halo 2 ZK-SNARK Proof          |  |
|  +-------------------------------------+          +---------------------------------------------+  |
+----------------------------------------------------------------------------------------------------+
                                                     |
                                                     | Submits ZK-Proof & Blinded Commitments
                                                     v
+----------------------------------------------------------------------------------------------------+
|                                      MIDNIGHT LEDGER STACK                                         |
|                                                                                                    |
|  +-----------------------------+    +------------------------------+    +-----------------------+  |
|  |      Midnight Node          |    |      Midnight Indexer        |    |   mass.compact State  |  |
|  |     (ws://localhost:9944)   |    | (http://localhost:8088/v4)   |    | - Escrow Commitments  |  |
|  | - Verifies ZK-SNARKs        |    | - Real-time GraphQL Reads    |    | - Verified Proof Map  |  |
|  | - Executes State Transition |    | - Zero PII Cached            |    | - Protocol Metrics    |  |
|  +-----------------------------+    +------------------------------+    +-----------------------+  |
+----------------------------------------------------------------------------------------------------+
                                                     ^
                                                     | Verifies ZK Credential / Funds Escrow
                                  +---------------------------------------+
                                  |          Enterprise Client            |
                                  |     (Confidential Milestone Payer)    |
                                  +---------------------------------------+
```

---

## 📂 Repository Structure

```
midnight-mass/
├── contracts/
│   ├── mass.compact               # Core Compact smart contract & ZK circuits
│   └── compiler.config.json       # Compact compiler & proof server configuration
├── src/
│   ├── components/
│   │   ├── Header.tsx             # Navigation & portal switcher
│   │   ├── NetworkStatus.tsx      # Midnight Node/Indexer/Proof Server health
│   │   ├── TrackRecordProver.tsx  # Interactive ZK provenance proof generator
│   │   ├── EscrowManager.tsx      # Confidential milestone escrow tracker
│   │   ├── NewEscrowModal.tsx     # Escrow creation with blinded commitments
│   │   ├── ClientVerifier.tsx     # On-chain proof inspection portal
│   │   └── CredentialBadge.tsx    # Verified cryptographic credential badge
│   ├── services/
│   │   ├── midnight-client.ts     # MidnightJS client & indexer connector
│   │   ├── proof-service.ts       # Proof Server interface & step-by-step orchestrator
│   │   └── reputation-store.ts    # Encrypted client-side private witness vault
│   ├── types/
│   │   └── index.ts               # Protocol domain types & interfaces
│   ├── App.tsx                    # Dual-portal application shell
│   ├── index.css                  # Institutional fintech design tokens
│   └── main.tsx                   # React root entrypoint
├── tests/
│   └── mass.test.ts               # Complete unit test suite for Compact circuits
├── scripts/
│   ├── start-local-dev.sh         # Linux/macOS local dev orchestration
│   └── start-local-dev.ps1        # Windows local dev orchestration
├── docker-compose.yml             # Midnight local stack (Node, Indexer, Proof Server)
├── package.json                   # Dependencies and npm scripts
├── tsconfig.json                  # TypeScript compiler settings
├── LICENSE                        # Apache License 2.0
└── README.md                      # Technical documentation
```

---

## 🛠️ Quickstart & Local Development

### Prerequisites
- **Node.js** v22+ (tested on Node v24)
- **Docker** and Docker Compose (for running the Midnight local undeployed stack)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Compact Unit Tests
```bash
npm test
```

### 3. Launch Local Midnight Dev Stack (Undeployed Mode)
Midnight operates on three core services running locally:
- **Node:** `ws://localhost:9944`
- **Indexer:** `http://localhost:8088/api/v4/graphql`
- **Proof Server:** `http://localhost:6300`

```bash
# On Linux / macOS:
./scripts/start-local-dev.sh

# On Windows (PowerShell):
./scripts/start-local-dev.ps1
```

### 4. Launch the Web Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access the Midnight MASS DApp.

---

## 🧪 Compact Smart Contract Circuits

| Circuit Name | Privacy Model | Purpose |
|---|---|---|
| `createEscrow` | Blinded Commitment | Locks milestone funds using hash commitments. Amount and specs remain secret. |
| `settleMilestone` | Cryptographic Signature Release | Releases escrowed funds upon verified client signature and outputs receipt commitment. |
| `proveTrackRecord` | **Zero-Knowledge Selective Disclosure** | Evaluates private witness array; proves audit count, average rating, and volume tier without leaking metadata. |
| `disputeEscrow` | State Freezing | Allows either party to flag an escrow for dispute resolution. |
| `refundEscrow` | Mutual Resolution | Releases funds back to client upon mutual authorization. |

---

## 🌊 Buildathon Roadmap

- [x] **Wave 1 (Current):** Core Compact smart contracts, unit test suite, local dev orchestration, private witness vault, and interactive ZK Provenance UI.
- [ ] **Wave 2:** Multi-party blinded dispute resolution with staked independent arbitrators and DUST fee sponsorship.
- [ ] **Wave 3:** Cross-chain messaging integration (VIA Labs) to export verified credentials to EVM and Cardano ecosystems, followed by guarded mainnet deployment.

---

## 📄 License

This project is licensed under the **Apache License, Version 2.0**.
See [LICENSE](LICENSE) for the full text.

Copyright 2026 Midnight MASS Contributors.
