// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Midnight MASS Contributors

import React, { useState } from 'react';
import { EscrowRecord, EscrowStatus } from '../types';
import { X, Shield, Lock } from 'lucide-react';

interface NewEscrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (escrow: EscrowRecord) => void;
  auditorPkHash: string;
  clientPkHash: string;
}

export const NewEscrowModal: React.FC<NewEscrowModalProps> = ({
  isOpen,
  onClose,
  onCreated,
  auditorPkHash,
  clientPkHash,
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('35000');
  const [specDetails, setSpecDetails] = useState(
    'Formal verification of cross-chain liquidity pool re-entrancy invariants and gas optimization review under NDA.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Compute mock SHA-256 deliverable spec hash
    const specHash =
      '0xspec_' +
      Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const newEscrow: EscrowRecord = {
      id: '0xescrow_' + Math.random().toString(36).slice(2, 8),
      clientPkHash,
      auditorPkHash,
      amountNIGHT: Number(amount),
      milestoneTitle: title || 'Milestone: Security Audit Specification',
      specHash: specHash.slice(0, 16) + '...',
      status: EscrowStatus.ACTIVE,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onCreated(newEscrow);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel max-w-lg w-full p-6 border border-slate-700/80 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base">
              Create Confidential Milestone Escrow
            </h3>
            <p className="text-xs text-slate-400">
              Deliverables and amounts are shielded using Compact commitments.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Milestone Objective
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Milestone 1: Threat Modeling & Circuit Audit"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Shielded Milestone Amount ($NIGHT)
            </label>
            <input
              type="number"
              min="1000"
              required
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Locked into Compact escrow circuit. Amount remains hidden on block explorers.
            </span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Confidential Deliverables Specification (Stored Off-Chain)
            </label>
            <textarea
              rows={3}
              value={specDetails}
              onChange={e => setSpecDetails(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Only the cryptographic SHA-256 commitment hash is published to the Midnight ledger.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary px-5 py-2 rounded-xl text-xs flex items-center gap-2"
            >
              <Shield className="w-3.5 h-3.5" />
              Lock Escrow Commitment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
