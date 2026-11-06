import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  TreePine,
  Layers,
  Lock,
  ExternalLink
} from 'lucide-react';

export default function VerifierPortal() {
  const { account, setIsWalletModalOpen, userProfile } = useWallet();

  const [pendingSubmissions, setPendingSubmissions] = useState([
    {
      id: 104,
      name: "Karnataka Western Ghats Native Corridors",
      developer: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      location: "Coorg, Karnataka, India",
      projectType: "Forestry",
      trees: 35000,
      species: "Teak & Western Ghats Endemic Flora",
      hectares: 70,
      density: 500,
      evidenceCid: "ipfs://QmWesternGhatsBiodiversityReport2026",
      estimatedCredits: 42000,
      submittedDate: "Nov 04, 2026",
      status: "Under Audit"
    },
    {
      id: 105,
      name: "Atacama Clean Solar Displacement Array",
      developer: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
      location: "Antofagasta, Chile",
      projectType: "Solar Energy",
      trees: 0,
      species: "Bifacial Solar (50MW)",
      hectares: 300,
      density: 0,
      evidenceCid: "ipfs://QmAtacamaGridCleanPowerTelemetry",
      estimatedCredits: 65000,
      submittedDate: "Nov 02, 2026",
      status: "Under Audit"
    }
  ]);

  const [auditLog, setAuditLog] = useState([]);

  const handleAuditAction = (submissionId, approved) => {
    if (!account) {
      setIsWalletModalOpen(true);
      return;
    }

    const sub = pendingSubmissions.find((s) => s.id === submissionId);
    if (!sub) return;

    setPendingSubmissions((prev) => prev.filter((s) => s.id !== submissionId));
    setAuditLog((prev) => [
      {
        id: sub.id,
        name: sub.name,
        action: approved ? "Approved & Verified" : "Rejected",
        credits: approved ? sub.estimatedCredits : 0,
        auditor: account,
        timestamp: new Date().toLocaleTimeString(),
        txHash: "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('').slice(0, 12) + "..."
      },
      ...prev
    ]);
  };

  return (
    <section className="py-12 bg-[#0b100d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AUDITOR PROTOCOL GATEWAY</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Independent Verification & Evidence Audit Portal
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Certified verifiers inspect land title deeds, drone LiDAR point clouds, and ecological density ratios before signing off on on-chain credit issuance.
          </p>
        </div>

        {/* Verifier Queue */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>Pending Submissions Awaiting Audit</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                {pendingSubmissions.length}
              </span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Standard: Verra / Earth Audit</span>
          </div>

          {pendingSubmissions.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#131d17] border border-slate-800 text-center text-slate-400 text-xs">
              All submitted carbon credit projects have been audited. No pending queues!
            </div>
          ) : (
            pendingSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="p-6 rounded-2xl bg-[#131d17] border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-lg"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                      PROJECT #{sub.id}
                    </span>
                    <span className="text-xs text-slate-400">{sub.location}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {sub.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{sub.name}</h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Developer</span>
                      <span className="font-mono text-slate-200">{sub.developer.slice(0, 8)}...</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Tree Count / Area</span>
                      <span className="font-mono text-slate-200">
                        {sub.trees > 0 ? `${sub.trees.toLocaleString()} trees (${sub.hectares} ha)` : `Clean Facility (${sub.hectares} ha)`}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Density Check</span>
                      <span className="font-mono text-emerald-400">
                        {sub.density > 0 ? `${sub.density} trees/ha (Pass)` : 'N/A Grid'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Requested Credits</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {sub.estimatedCredits.toLocaleString()} tCO2e
                      </span>
                    </div>
                  </div>
                </div>

                {/* Audit Action Buttons */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleAuditAction(sub.id, true)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Issue Credits</span>
                  </button>

                  <button
                    onClick={() => handleAuditAction(sub.id, false)}
                    className="px-4 py-2.5 rounded-xl border border-rose-900 bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Audit History Log */}
          {auditLog.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white mb-4">Audit Execution Log (Ethereum Ledger)</h3>
              <div className="space-y-2">
                {auditLog.map((log, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="font-semibold text-white">{log.name}</span>
                      <span className="text-emerald-400">{log.action}</span>
                      {log.credits > 0 && <span className="font-mono text-slate-300">({log.credits.toLocaleString()} GCCC minted)</span>}
                    </div>
                    <div className="font-mono text-slate-400 text-[11px]">
                      Tx: {log.txHash} ({log.timestamp})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

