// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Midnight MASS Contributors

import React from 'react';
import { Shield, Lock, FileCheck2, Wallet } from 'lucide-react';

interface HeaderProps {
  activeTab: 'auditor' | 'client';
  onTabChange: (tab: 'auditor' | 'client') => void;
  walletAddress: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, walletAddress }) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Shield className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-white tracking-tight">
                MIDNIGHT <span className="text-indigo-400">MASS</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                ZK Provenance
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Milestone & Audit Shielded Settlement Protocol
            </p>
          </div>
        </div>

        {/* Portal Switcher Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => onTabChange('auditor')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
              activeTab === 'auditor'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Auditor Terminal
          </button>
          <button
            onClick={() => onTabChange('client')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
              activeTab === 'client'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            Client Verifier
          </button>
        </div>

        {/* Wallet Connection */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <Wallet className="w-3.5 h-3.5 text-indigo-400" />
            <span>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
