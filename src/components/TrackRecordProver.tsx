// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Midnight MASS Contributors

import React, { useState } from 'react';
import { ProjectWitness, AuditDomain, ReputationThreshold, VerificationReceipt } from '../types';
import { proofService, ProofGenerationStep } from '../services/proof-service';
import { midnightClient } from '../services/midnight-client';
import { Shield, Sparkles, Check, AlertTriangle, EyeOff, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TrackRecordProverProps {
  witnesses: ProjectWitness[];
  auditorPkHash: string;
  onProofGenerated: (receipt: VerificationReceipt) => void;
}

export const TrackRecordProver: React.FC<TrackRecordProverProps> = ({
  witnesses,
  auditorPkHash,
  onProofGenerated,
}) => {
  const [minAudits, setMinAudits] = useState(3);
  const [minRating, setMinRating] = useState(95);
  const [selectedDomain, setSelectedDomain] = useState<AuditDomain>(AuditDomain.ALL_DOMAINS);
  const [minVolumeTier, setMinVolumeTier] = useState(1);

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<ProofGenerationStep | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<VerificationReceipt | null>(null);

  const handleGenerateProof = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    setCurrentStep(null);

    const threshold: ReputationThreshold = {
      minProjectCount: minAudits,
      minAverageScore: minRating,
      minVolumeTier,
      requiredDomain: selectedDomain,
    };

    try {
      const result = await proofService.generateTrackRecordProof(
        witnesses,
        threshold,
        auditorPkHash,
        step => setCurrentStep(step)
      );

      // Submit proof on-chain to Midnight contract
      const tx = await midnightClient.submitTransaction('proveTrackRecord', result.proof, {
        auditorPkHash,
        receiptHash: result.receiptHash,
      });

      const receipt: VerificationReceipt = {
        auditorPkHash,
        receiptHash: result.receiptHash,
        verifiedAt: new Date().toLocaleTimeString(),
        qualifyingProjects: result.qualifyingCount,
        scoreFloor: minRating,
        domainName:
          selectedDomain === AuditDomain.ALL_DOMAINS
            ? 'Cross-Domain Comprehensive'
            : selectedDomain === AuditDomain.SMART_CONTRACT_SECURITY
            ? 'Smart Contract Security'
            : selectedDomain === AuditDomain.CRYPTOGRAPHIC_CIRCUITS
            ? 'Cryptographic Circuits'
            : 'AI Model Alignment',
        onChainTxId: tx.txId,
      };

      setActiveReceipt(receipt);
      onProofGenerated(receipt);
    } catch (err: any) {
      setErrorMsg(err.message || 'Proof generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="glass-panel p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="font-display text-lg font-bold text-white tracking-tight">
              Zero-Knowledge Provenance Engine
            </h2>
            <span className="badge-verified px-2 py-0.5 rounded text-[11px] font-mono font-medium">
              Compact Circuit
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Prove your audit volume and rating standards without revealing client identities,
            proprietary codebases, or settlement amounts. Powered by Midnight Halo 2 ZK-SNARKs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800">
          <EyeOff className="w-4 h-4 text-emerald-400" />
          <span>Private State: <strong>{witnesses.length} NDA Projects on Device</strong></span>
        </div>
      </div>

      {/* Threshold Configuration Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Minimum Completed Audits
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={minAudits}
            onChange={e => setMinAudits(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
          />
          <span className="text-[10px] text-slate-500 mt-1 block">
            Auditor has {witnesses.length} records available
          </span>
        </div>

        <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Quality Rating Floor
          </label>
          <input
            type="number"
            min="80"
            max="100"
            value={minRating}
            onChange={e => setMinRating(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
          />
          <span className="text-[10px] text-slate-500 mt-1 block">
            Average score must be ≥ {minRating}/100
          </span>
        </div>

        <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Domain Specialization
          </label>
          <select
            value={selectedDomain}
            onChange={e => setSelectedDomain(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
          >
            <option value={AuditDomain.ALL_DOMAINS}>All Specialized Domains</option>
            <option value={AuditDomain.SMART_CONTRACT_SECURITY}>Smart Contract Security</option>
            <option value={AuditDomain.CRYPTOGRAPHIC_CIRCUITS}>Cryptographic Circuits</option>
            <option value={AuditDomain.AI_MODEL_ALIGNMENT}>AI Model Alignment</option>
          </select>
          <span className="text-[10px] text-slate-500 mt-1 block">Selective category filter</span>
        </div>

        <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Volume Tier Floor
          </label>
          <select
            value={minVolumeTier}
            onChange={e => setMinVolumeTier(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
          >
            <option value={1}>Tier 1 ($10k+)</option>
            <option value={2}>Tier 2 ($50k+)</option>
            <option value={3}>Tier 3 ($200k+ TVL)</option>
          </select>
          <span className="text-[10px] text-slate-500 mt-1 block">Financial scale verification</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleGenerateProof}
          disabled={isGenerating}
          className="btn-primary px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 font-display"
        >
          {isGenerating ? (
            <>
              <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"></span>
              Generating Proof...
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5" />
              Generate Halo 2 ZK Provenance Proof
            </>
          )}
        </button>

        {errorMsg && (
          <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20">
            <AlertTriangle className="w-4 h-4" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Live Proof Generation Progress Animation */}
      {isGenerating && currentStep && (
        <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 animate-pulse-glow">
          <div className="flex items-center justify-between mb-2 text-xs font-mono">
            <span className="text-indigo-400 font-semibold">{currentStep.message}</span>
            <span className="text-slate-400">{currentStep.progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300"
              style={{ width: `${currentStep.progressPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Generated Credential Receipt */}
      {activeReceipt && (
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-950 border border-indigo-500/40 shadow-xl shadow-indigo-950/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="font-display font-bold text-sm text-white">
                Cryptographic Provenance Verified
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Tx: {activeReceipt.onChainTxId.slice(0, 12)}...
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 mb-3">
            <div>
              <span className="text-slate-500 block text-[10px]">VERIFIED DOMAIN</span>
              <span className="text-slate-200 font-semibold">{activeReceipt.domainName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">MIN QUALIFYING AUDITS</span>
              <span className="text-emerald-400 font-semibold">
                ≥ {activeReceipt.qualifyingProjects} Projects
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">QUALITY RATING FLOOR</span>
              <span className="text-indigo-300 font-semibold">
                ≥ {activeReceipt.scoreFloor}/100 Average
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">ZERO-KNOWLEDGE COMMITMENT</span>
              <span className="text-slate-400 truncate block font-mono text-[11px]">
                {activeReceipt.receiptHash.slice(0, 14)}...
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic">
            ✓ Client can verify this on-chain state transition without learning any underlying client names,
            proprietary code hashes, or financial terms.
          </p>
        </div>
      )}
    </div>
  );
};
