// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Midnight MASS Contributors

import React, { useState } from 'react';
import { EscrowRecord, EscrowStatus } from '../types';
import { NewEscrowModal } from './NewEscrowModal';
import { ShieldCheck, Plus, CheckCircle2, Clock, AlertCircle, Lock, ExternalLink } from 'lucide-react';

interface EscrowManagerProps {
  escrows: EscrowRecord[];
  onSettle: (escrowId: string) => void;
  onAddEscrow: (escrow: EscrowRecord) => void;
  auditorPkHash: string;
  clientPkHash: string;
}

export const EscrowManager: React.FC<EscrowManagerProps> = ({
  escrows,
  onSettle,
  onAddEscrow,
  auditorPkHash,
  clientPkHash,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="glass-panel p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="font-display text-lg font-bold text-white tracking-tight">
              Confidential Milestone Escrows
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Funds locked in Compact smart contracts. Milestone release requires zero-knowledge client approval.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary px-4 py-2 rounded-xl text-xs flex items-center gap-2 font-display self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          New Milestone Escrow
        </button>
      </div>

      {/* Escrows List */}
      <div className="space-y-3">
        {escrows.map(escrow => (
          <div
            key={escrow.id}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold text-sm text-white">
                  {escrow.milestoneTitle}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                    escrow.status === EscrowStatus.SETTLED
                      ? 'badge-verified'
                      : escrow.status === EscrowStatus.ACTIVE
                      ? 'badge-active'
                      : 'badge-disputed'
                  }`}
                >
                  {escrow.status === EscrowStatus.SETTLED
                    ? 'SETTLED & RELEASED'
                    : escrow.status === EscrowStatus.ACTIVE
                    ? 'ACTIVE SHIELDED ESCROW'
                    : 'DISPUTED'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-indigo-400" />
                  Amount: <strong className="text-slate-200">{escrow.amountNIGHT.toLocaleString()} NIGHT</strong>
                </span>
                <span>•</span>
                <span>Commitment: <span className="text-slate-500">{escrow.specHash}</span></span>
                <span>•</span>
                <span>Created: {escrow.createdAt}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {escrow.status === EscrowStatus.ACTIVE ? (
                <button
                  onClick={() => onSettle(escrow.id)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Approve & Release
                </button>
              ) : (
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Receipt On-Chain
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <NewEscrowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={onAddEscrow}
        auditorPkHash={auditorPkHash}
        clientPkHash={clientPkHash}
      />
    </div>
  );
};
