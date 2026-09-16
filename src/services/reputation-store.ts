// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Midnight MASS Contributors

import { ProjectWitness, AuditDomain, EscrowRecord, EscrowStatus } from '../types';

const STORAGE_KEY_WITNESSES = 'midnight_mass_private_witnesses_v1';
const STORAGE_KEY_ESCROWS = 'midnight_mass_escrows_v1';

// Seed initial realistic private audit history for demonstration
const DEFAULT_PRIVATE_WITNESSES: ProjectWitness[] = [
  {
    projectId: '0x3a9f1b2c4d5e6f7a',
    projectTitle: 'Liquid Staking Protocol L1 Bridge Formal Audit',
    domain: AuditDomain.SMART_CONTRACT_SECURITY,
    qualityScore: 99,
    volumeTier: 3, // >$200k
    clientProofSig: '0x8892ca019efbc712',
    settled: true,
    completionDate: '2026-07-14',
    confidentialSponsor: 'Tier-1 Institutional Custody Consortium (Confidential)',
  },
  {
    projectId: '0x7e4d2a1b9c8f0e3d',
    projectTitle: 'ZK Rollup State Transition Circuit Review',
    domain: AuditDomain.CRYPTOGRAPHIC_CIRCUITS,
    qualityScore: 97,
    volumeTier: 3,
    clientProofSig: '0x43b2f091aef71900',
    settled: true,
    completionDate: '2026-08-02',
    confidentialSponsor: 'Decentralized ZK-EVM Labs (Under NDA)',
  },
  {
    projectId: '0x1c8b9d0e2f3a4b5c',
    projectTitle: 'Automated Market Maker V4 Hook Architecture Audit',
    domain: AuditDomain.SMART_CONTRACT_SECURITY,
    qualityScore: 96,
    volumeTier: 2, // $50k-$200k
    clientProofSig: '0x71fa0932bcdef890',
    settled: true,
    completionDate: '2026-08-19',
    confidentialSponsor: 'Cross-Chain Liquidity Foundation (NDA Protected)',
  },
  {
    projectId: '0x5b6c7d8e9f0a1b2c',
    projectTitle: 'Autonomous Financial Agent Intent Settlement Verifier',
    domain: AuditDomain.AI_MODEL_ALIGNMENT,
    qualityScore: 98,
    volumeTier: 2,
    clientProofSig: '0x99238471bade0129',
    settled: true,
    completionDate: '2026-08-28',
    confidentialSponsor: 'Autonomous Agentic Protocol X (Under NDA)',
  },
  {
    projectId: '0x9a8b7c6d5e4f3a2b',
    projectTitle: 'Confidential Yield Aggregator Dual-State Security Review',
    domain: AuditDomain.SMART_CONTRACT_SECURITY,
    qualityScore: 95,
    volumeTier: 2,
    clientProofSig: '0x5511aa22bb33cc44',
    settled: true,
    completionDate: '2026-09-04',
    confidentialSponsor: 'Midnight Ecosystem Partner Protocol (Confidential)',
  },
];

const DEFAULT_ESCROWS: EscrowRecord[] = [
  {
    id: '0xescrow_7781a9',
    clientPkHash: '0x4f12...e890 (Institutional Client)',
    auditorPkHash: '0xa7c1...b321 (Your Auditor PK)',
    amountNIGHT: 25000,
    milestoneTitle: 'Milestone 1: Static Analysis & Threat Modeling',
    specHash: '0x9fa1...4412 (Confidential Spec)',
    status: EscrowStatus.SETTLED,
    createdAt: '2026-09-01',
    settledAt: '2026-09-08',
    receiptHash: '0xrcpt_98214fa',
  },
  {
    id: '0xescrow_8892b1',
    clientPkHash: '0x4f12...e890 (Institutional Client)',
    auditorPkHash: '0xa7c1...b321 (Your Auditor PK)',
    amountNIGHT: 45000,
    milestoneTitle: 'Milestone 2: Dynamic Fuzzing & Invariant Proofs',
    specHash: '0x88bb...77cc (Confidential Spec)',
    status: EscrowStatus.ACTIVE,
    createdAt: '2026-09-10',
  },
];

export class ReputationStore {
  // Load private witnesses
  public static getPrivateWitnesses(): ProjectWitness[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_WITNESSES);
      if (!raw) {
        this.savePrivateWitnesses(DEFAULT_PRIVATE_WITNESSES);
        return DEFAULT_PRIVATE_WITNESSES;
      }
      return JSON.parse(raw);
    } catch {
      return DEFAULT_PRIVATE_WITNESSES;
    }
  }

  // Save private witnesses to local encrypted vault
  public static savePrivateWitnesses(witnesses: ProjectWitness[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_WITNESSES, JSON.stringify(witnesses));
    } catch (e) {
      console.error('Failed to save private witnesses to local vault', e);
    }
  }

  // Add a newly settled project to the private vault
  public static addSettledProject(project: ProjectWitness): void {
    const list = this.getPrivateWitnesses();
    list.unshift(project);
    this.savePrivateWitnesses(list);
  }

  // Get escrows
  public static getEscrows(): EscrowRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ESCROWS);
      if (!raw) {
        this.saveEscrows(DEFAULT_ESCROWS);
        return DEFAULT_ESCROWS;
      }
      return JSON.parse(raw);
    } catch {
      return DEFAULT_ESCROWS;
    }
  }

  // Save escrows
  public static saveEscrows(escrows: EscrowRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_ESCROWS, JSON.stringify(escrows));
    } catch (e) {
      console.error('Failed to save escrows', e);
    }
  }

  // Add new escrow
  public static addEscrow(escrow: EscrowRecord): void {
    const list = this.getEscrows();
    list.unshift(escrow);
    this.saveEscrows(list);
  }

  // Settle existing escrow
  public static settleEscrow(escrowId: string, receiptHash: string): void {
    const list = this.getEscrows();
    const target = list.find(e => e.id === escrowId);
    if (target) {
      target.status = EscrowStatus.SETTLED;
      target.settledAt = new Date().toISOString().split('T')[0];
      target.receiptHash = receiptHash;
      this.saveEscrows(list);
    }
  }
}
