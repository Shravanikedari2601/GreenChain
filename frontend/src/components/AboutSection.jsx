import React from 'react';
import { Shield, Sparkles, Database, CheckCircle2, Award, Users } from 'lucide-react';

export default function AboutSection({ onExploreClick }) {
  return (
    <section className="py-16 bg-[#0b100d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            ABOUT GREENCHAIN AI
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Pioneering Verifiable & Double-Count-Free Carbon Markets on Ethereum
          </h1>
          <p className="text-sm text-slate-300 mt-3 leading-relaxed">
            GreenChain AI was created to solve the integrity deficit that has haunted voluntary carbon markets for decades. By merging allometric biological algorithms, multi-spectral satellite radar, and Ethereum smart contracts, we guarantee that every carbon credit represents genuine, verifiable atmospheric impact.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-[#131d17] border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Immutable Provenance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every tree seedling, GPS polygon, and satellite radar pass is committed on-chain. Credits are impossible to re-issue or double-spend.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#131d17] border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Automated AI Risk Scoring</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our neural models continuously ingest Sentinel-2 and LiDAR data to dynamically evaluate project risk (0-100 score), surfacing risks before purchases.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#131d17] border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Permanent Burning Mechanism</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When companies claim Net Zero, credits are permanently burned via smart contract retirement, generating cryptographic certificates of neutrality.
            </p>
          </div>
        </div>

        {/* Trust & Standards Strip */}
        <div className="p-8 rounded-2xl bg-[#131d17] border border-emerald-500/20 text-center">
          <h2 className="text-lg font-bold text-white mb-2">Aligned with International Standards</h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto mb-6">
            Methodologies calibrated against the Taskforce on Scaling Voluntary Carbon Markets (TSVCM), ICVCM Core Carbon Principles, Verra VCS, and Gold Standard.
          </p>

          <button
            onClick={onExploreClick}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs tracking-wide transition-colors"
          >
            Explore Verified Marketplace Listings
          </button>
        </div>

      </div>
    </section>
  );
}

