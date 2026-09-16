// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Midnight MASS Contributors

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NetworkStatus } from './components/NetworkStatus';
import { TrackRecordProver } from './components/TrackRecordProver';
import { EscrowManager } from './components/EscrowManager';
import { ClientVerifier } from './components/ClientVerifier';
import { ReputationStore } from './services/reputation-store';
import { ProjectWitness, EscrowRecord, VerificationReceipt } from './types';
import { Shield, EyeOff } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'auditor' | 'client'>('auditor');
  const [witnesses, setWitnesses] = useState<ProjectWitness[]>([]);
  const [escrows, setEscrows] = useState<EscrowRecord[]>([]);
  const [receipts, setReceipts] = useState<VerificationReceipt[]>([]);

  // Simulated connected wallet addresses
  const auditorPkHash = '0xa7c198f2b321e0456789abcd1234ef567890abcd';
  const clientPkHash = '0x4f128892ca019efbc71234567890abcdef123456';

  useEffect(() => {
    // Load private on-device data
    const loadedWitnesses = ReputationStore.getPrivateWitnesses();
    setWitnesses(loadedWitnesses);

    const loadedEscrows = ReputationStore.getEscrows();
    setEscrows(loadedEscrows);

    // Initial verified on-chain proof for demo
    setReceipts([
      {
        auditorPkHash,
        receiptHash: '0xrcpt_98214fa77312bc8900112233',
        verifiedAt: '10:14:22 AM',
        qualifyingProjects: 4,
        scoreFloor: 95,
        domainName: 'Smart Contract Security',
        onChainTxId: '0x01a8f9024b88214fa77312bc8900112233445566778899aabbccddeeff001122',
      },
    ]);
  }, []);

  const handleProofGenerated = (newReceipt: VerificationReceipt) => {
    setReceipts(prev => [newReceipt, ...prev]);
  };

  const handleSettleEscrow = (escrowId: string) => {
    const receiptHash = '0xrcpt_' + Math.random().toString(36).slice(2, 10);
    ReputationStore.settleEscrow(escrowId, receiptHash);
    setEscrows(ReputationStore.getEscrows());
  };

  const handleAddEscrow = (newEscrow: EscrowRecord) => {
    ReputationStore.addEscrow(newEscrow);
    setEscrows(ReputationStore.getEscrows());
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        walletAddress={activeTab === 'auditor' ? auditorPkHash : clientPkHash}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NetworkStatus />

        {/* Hero Protocol Narrative */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-cyan-950/20 border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="badge-verified px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase">
                Midnight Dual-State Architecture
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-mono">Halo 2 ZK-SNARKs</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Confidential Milestone Escrow & ZK Track Record Provenance
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Designed for security auditors and enterprise consultants working under strict NDAs.
              Prove your audited volume and quality score ratings without ever revealing client identities,
              proprietary codebases, or settlement amounts.
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-400 self-stretch md:self-auto justify-center">
            <EyeOff className="w-4 h-4 text-emerald-400" />
            <span>Witnesses Stay 100% On-Device</span>
          </div>
        </div>

        {/* Dual Mode Portals */}
        {activeTab === 'auditor' ? (
          <div className="space-y-8">
            <TrackRecordProver
              witnesses={witnesses}
              auditorPkHash={auditorPkHash}
              onProofGenerated={handleProofGenerated}
            />

            <EscrowManager
              escrows={escrows}
              onSettle={handleSettleEscrow}
              onAddEscrow={handleAddEscrow}
              auditorPkHash={auditorPkHash}
              clientPkHash={clientPkHash}
            />
          </div>
        ) : (
          <div className="space-y-8">
            <ClientVerifier initialReceipts={receipts} />

            <EscrowManager
              escrows={escrows}
              onSettle={handleSettleEscrow}
              onAddEscrow={handleAddEscrow}
              auditorPkHash={auditorPkHash}
              clientPkHash={clientPkHash}
            />
          </div>
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>Midnight MASS Protocol • Apache License 2.0</span>
          </div>
          <div>Built for the Midnight Network Buildathon 2026</div>
        </div>
      </footer>
    </div>
  );
};
