// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Midnight MASS Contributors

import React, { useState } from 'react';
import { VerificationReceipt } from '../types';
import { CredentialBadge } from './CredentialBadge';
import { Search, ShieldAlert, FileSearch, CheckCircle2, Lock } from 'lucide-react';

interface ClientVerifierProps {
  initialReceipts: VerificationReceipt[];
}

export const ClientVerifier: React.FC<ClientVerifierProps> = ({ initialReceipts }) => {
  const [searchKey, setSearchKey] = useState('');
  const [receipts, setReceipts] = useState<VerificationReceipt[]>(initialReceipts);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKey.trim()) return;

    setIsVerifying(true);
    await new Promise(r => setTimeout(r, 600));

    // Simulated query against Midnight Indexer
    const found = receipts.find(
      r =>
        r.auditorPkHash.toLowerCase().includes(searchKey.toLowerCase()) ||
        r.receiptHash.toLowerCase().includes(searchKey.toLowerCase())
    );

    setIsVerifying(false);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <FileSearch className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-white tracking-tight">
              Client Verification Portal
            </h2>
            <p className="text-xs text-slate-400">
              Query on-chain zero-knowledge reputation proofs without requesting proprietary audit reports.
            </p>
          </div>
        </div>

        <form onSubmit={handleLookup} className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Paste Auditor Public Key Hash or ZK Receipt Commitment (e.g., 0xa7c1...)"
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isVerifying}
            className="btn-primary px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 font-display"
          >
            {isVerifying ? (
              <>
                <span className="animate-spin inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full"></span>
                Querying Indexer...
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                Verify Proof
              </>
            )}
          </button>
        </form>
      </div>

      {/* Verified Badges Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
          Verified On-Chain Auditor Receipts ({receipts.length})
        </h3>

        {receipts.map((receipt, index) => (
          <CredentialBadge key={index} receipt={receipt} />
        ))}
      </div>
    </div>
  );
};
