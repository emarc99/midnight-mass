// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Midnight MASS Contributors

import React from 'react';
import { VerificationReceipt } from '../types';
import { ShieldCheck, Lock } from 'lucide-react';

interface CredentialBadgeProps {
  receipt: VerificationReceipt;
}

export const CredentialBadge: React.FC<CredentialBadgeProps> = ({ receipt }) => {
  return (
    <div className="glass-panel p-5 border border-indigo-500/30 bg-gradient-to-br from-slate-900/90 via-indigo-950/20 to-slate-950">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base text-white">
                Midnight Verified Track Record
              </span>
              <span className="badge-verified px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                ON-CHAIN PROOF
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Auditor: {receipt.auditorPkHash.slice(0, 10)}...{receipt.auditorPkHash.slice(-6)}
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-slate-500">Verified: {receipt.verifiedAt}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-4 text-xs font-mono">
        <div>
          <span className="text-slate-500 text-[10px] block">AUDIT DOMAIN</span>
          <span className="text-slate-200 font-semibold">{receipt.domainName}</span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">VERIFIED MILESTONES</span>
          <span className="text-emerald-400 font-semibold">
            ≥ {receipt.qualifyingProjects} Formal Audits
          </span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">AVERAGE QUALITY RATING</span>
          <span className="text-indigo-300 font-semibold">≥ {receipt.scoreFloor}/100</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-800/60">
        <span className="flex items-center gap-1">
          <Lock className="w-3 h-3 text-indigo-400" />
          Zero-Knowledge Proof Guarantee: No Client NDAs Breached
        </span>
        <span className="text-slate-500">Tx: {receipt.onChainTxId.slice(0, 12)}...</span>
      </div>
    </div>
  );
};
