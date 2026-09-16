// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Midnight MASS Contributors

import React, { useEffect, useState } from 'react';
import { midnightClient } from '../services/midnight-client';
import { Activity, Server, Database, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';

export const NetworkStatus: React.FC = () => {
  const [health, setHealth] = useState({ node: true, indexer: true, proofServer: true });
  const [metrics, setMetrics] = useState({
    totalEscrows: 42,
    totalSettled: 39,
    shieldedVolume: '2,840,000 NIGHT',
    verifiedAuditors: 18,
  });

  useEffect(() => {
    const check = async () => {
      const h = await midnightClient.checkNetworkHealth();
      setHealth(h);
      const m = await midnightClient.getProtocolMetrics();
      setMetrics(m);
    };
    check();
  }, []);

  const config = midnightClient.getConfig();

  return (
    <div className="glass-panel p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Network & Local Dev Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-semibold tracking-wide uppercase">
              {config.networkId} stack
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              Node: <span className="text-slate-300 font-mono">9944</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              Indexer: <span className="text-slate-300 font-mono">8088</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              Proof Server: <span className="text-slate-300 font-mono">6300</span>
            </span>
          </div>
        </div>

        {/* Live Protocol Aggregate Stats */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-right">
            <div className="text-slate-500">Shielded Settlements</div>
            <div className="text-slate-200 font-semibold">{metrics.totalSettled} Milestones</div>
          </div>
          <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
          <div className="text-right">
            <div className="text-slate-500">Cumulative Volume</div>
            <div className="text-emerald-400 font-semibold">{metrics.shieldedVolume}</div>
          </div>
          <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
          <div className="text-right">
            <div className="text-slate-500">Verified ZK Provenance</div>
            <div className="text-indigo-300 font-semibold">{metrics.verifiedAuditors} Auditors</div>
          </div>
        </div>
      </div>
    </div>
  );
};
