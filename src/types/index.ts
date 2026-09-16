// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Midnight MASS Contributors

export enum EscrowStatus {
  UNINITIALIZED = 0,
  ACTIVE = 1,
  SETTLED = 2,
  DISPUTED = 3,
  REFUNDED = 4,
}

export enum AuditDomain {
  ALL_DOMAINS = 0,
  SMART_CONTRACT_SECURITY = 1,
  CRYPTOGRAPHIC_CIRCUITS = 2,
  AI_MODEL_ALIGNMENT = 3,
  ENTERPRISE_CONSULTING = 4,
}

export interface EscrowTerms {
  clientPkHash: string;
  auditorPkHash: string;
  milestoneAmount: bigint;
  specHash: string;
  salt: string;
}

export interface ProjectWitness {
  projectId: string;
  projectTitle: string; // Stored locally only
  domain: AuditDomain;
  qualityScore: number;
  volumeTier: number;
  clientProofSig: string;
  settled: boolean;
  completionDate: string;
  confidentialSponsor: string; // Stored locally only
}

export interface ReputationThreshold {
  minProjectCount: number;
  minAverageScore: number;
  minVolumeTier: number;
  requiredDomain: AuditDomain;
}

export interface VerificationReceipt {
  auditorPkHash: string;
  receiptHash: string;
  verifiedAt: string;
  qualifyingProjects: number;
  scoreFloor: number;
  domainName: string;
  onChainTxId: string;
}

export interface EscrowRecord {
  id: string;
  clientPkHash: string;
  auditorPkHash: string;
  amountNIGHT: number;
  milestoneTitle: string;
  specHash: string;
  status: EscrowStatus;
  createdAt: string;
  settledAt?: string;
  receiptHash?: string;
}

export interface NetworkConfig {
  networkId: 'undeployed' | 'preview' | 'preprod' | 'mainnet';
  nodeUrl: string;
  indexerUrl: string;
  proofServerUrl: string;
  contractAddress: string;
  isOnline: boolean;
}
