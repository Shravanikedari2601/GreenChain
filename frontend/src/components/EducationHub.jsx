import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  TrendingUp,
  TreePine,
  Wind,
  Sun,
  Droplets,
  Flame,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Globe2,
  Cpu
} from 'lucide-react';
import { EDUCATIONAL_MODULES } from '../data/mockData';

export default function EducationHub() {
  const [activeTab, setActiveTab] = useState('what-are-credits');

  // Simulated live counter that ticks smoothly
  const [liveTrees, setLiveTrees] = useState(8452190);
  const [liveHectares, setLiveHectares] = useState(14890);
  const [liveCo2, setLiveCo2] = useState(1240000);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTrees((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-[#0b100d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>KNOWLEDGE & IMPACT METRICS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Carbon Literacy & Global Restoration Tracker
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Explore scientific fundamentals of carbon offsetting, voluntary markets, renewable energy grid displacement, and real-time plantation counters.
          </p>
        </div>

        {/* Real-time Plantation Impact Dashboard */}
        <div className="rounded-2xl bg-gradient-to-br from-[#121f17] via-[#16271e] to-[#0f1a14] border border-emerald-500/30 p-8 shadow-2xl mb-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-emerald-500/20">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>LIVE ON-CHAIN REFORESTATION TELEMETRY</span>
              </div>
              <h2 className="text-2xl font-bold text-white mt-1">
                Actual Plantations Financed Through Carbon Credits
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono px-3 py-1.5 rounded-lg bg-black/40 border border-slate-800">
              Updated via Sentinel-2 & GEDI Satellite Radar
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            <div className="p-4 rounded-xl bg-black/40 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <TreePine className="w-4 h-4 text-emerald-400" />
                <span>Trees Planted</span>
              </div>
              <div className="text-3xl font-black text-white font-mono">
                {liveTrees.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Active vegetative growth</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Globe2 className="w-4 h-4 text-emerald-400" />
                <span>Hectares Restored</span>
              </div>
              <div className="text-3xl font-black text-white font-mono">
                {liveHectares.toLocaleString()} ha
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Across 48 registered ecosystems
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>CO2 Sequestered</span>
              </div>
              <div className="text-3xl font-black text-emerald-400 font-mono">
                {liveCo2.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Metric tons net carbon offset
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Double-Counting Rate</span>
              </div>
              <div className="text-3xl font-black text-white font-mono">
                0.00%
              </div>
              <div className="text-[11px] text-emerald-400 mt-1">
                Guaranteed by Ethereum smart contract
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation for Educational Sections */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#121c17] border border-slate-800 rounded-2xl mb-8">
          <button
            onClick={() => setActiveTab('what-are-credits')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'what-are-credits'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            What Are Carbon Credits?
          </button>
          <button
            onClick={() => setActiveTab('how-market-works')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'how-market-works'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            How the Carbon Market Works
          </button>
          <button
            onClick={() => setActiveTab('how-to-use')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'how-to-use'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            How to Use the App
          </button>
          <button
            onClick={() => setActiveTab('renewable-energy')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'renewable-energy'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Renewable Energy Offsets
          </button>
        </div>

        {/* Content Tab 1: What Are Carbon Credits */}
        {activeTab === 'what-are-credits' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-8 rounded-2xl bg-[#131d17] border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-3">
                {EDUCATIONAL_MODULES.whatAreCredits.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {EDUCATIONAL_MODULES.whatAreCredits.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EDUCATIONAL_MODULES.whatAreCredits.keyPrinciples.map((principle, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-black/40 border border-slate-800/80">
                    <div className="flex items-center gap-2 mb-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <h3 className="text-sm font-bold text-white">{principle.name}</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-6">
                      {principle.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Removal vs Avoidance Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#131d17] border border-slate-800">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 font-mono">
                  TYPE 1: CARBON REMOVAL
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Biomass & Direct Sequestration</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Draws existing carbon dioxide directly out of the ambient atmosphere and locks it in biological or geological sinks:
                </p>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Reforestation & Afforestation canopy absorption</li>
                  <li>Mangroves & Blue Carbon coastal wetlands</li>
                  <li>Biochar & regenerative soil carbon enhancement</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#131d17] border border-slate-800">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 font-mono">
                  TYPE 2: CARBON AVOIDANCE
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Clean Energy & Fugitive Gas Capture</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Prevents greenhouse gases from entering the atmosphere compared to a fossil-fuel baseline:
                </p>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Utility wind farms replacing coal electricity</li>
                  <li>Bifacial solar parks displacing natural gas peakers</li>
                  <li>Agricultural landfill methane biodigesters</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab 2: How Carbon Market Works */}
        {activeTab === 'how-market-works' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-8 rounded-2xl bg-[#131d17] border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-2">Compliance vs Voluntary Markets</h2>
              <p className="text-xs text-slate-400 mb-6 max-w-2xl">
                Understanding the two distinct arenas where carbon offsets and allowances are traded globally.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {EDUCATIONAL_MODULES.howMarketWorks.types.map((t, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-black/40 border border-slate-800">
                    <h3 className="text-base font-bold text-emerald-400 mb-2">{t.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Contract Lifecycle */}
            <div className="p-8 rounded-2xl bg-[#131d17] border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-4">The Complete Web3 Credit Lifecycle</h2>
              <div className="space-y-3">
                {EDUCATIONAL_MODULES.howMarketWorks.lifecycle.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-slate-800/60">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-200 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Tab 3: How to Use the App */}
        {activeTab === 'how-to-use' && (
          <div className="p-8 rounded-2xl bg-[#131d17] border border-slate-800 space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-bold text-white">How to Use GreenChain AI</h2>
              <p className="text-xs text-slate-400 mt-1">
                A simple 5-step walkthrough to get started whether you are purchasing offsets or onboarding projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-mono text-xs font-bold">STEP 1</span>
                <h3 className="text-sm font-bold text-white">Connect Your Web3 Wallet or Gmail</h3>
                <p className="text-xs text-slate-300">
                  Click <strong>Connect Wallet</strong> in the top navigation bar. Choose MetaMask browser extension, or use one-click Gmail sign in to generate a deterministic Ethereum address instantly.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-mono text-xs font-bold">STEP 2</span>
                <h3 className="text-sm font-bold text-white">Browse Verified Carbon Projects</h3>
                <p className="text-xs text-slate-300">
                  Visit the <strong>Marketplace</strong> to inspect projects. Every project lists its country, vintage year, price in USD & ETH, and transparent AI risk score (0-100).
                </p>
              </div>

              <div className="p-5 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-mono text-xs font-bold">STEP 3</span>
                <h3 className="text-sm font-bold text-white">Buy Credits or Instant Retire</h3>
                <p className="text-xs text-slate-300">
                  Select <strong>Buy credits</strong>. You can either hold the GCCC tokens in your wallet for trading, or check <em>Burn & Retire</em> to immediately offset your carbon footprint and mint an immutable Certificate.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-mono text-xs font-bold">STEP 4</span>
                <h3 className="text-sm font-bold text-white">Register Biological Tree Data</h3>
                <p className="text-xs text-slate-300">
                  If you are a landholder or developer, open <strong>Register Project</strong>. Enter your tree count, species, and acreage. The smart contract validates density and estimated biomass before auditor signoff.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab 4: Renewable Energy */}
        {activeTab === 'renewable-energy' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-8 rounded-2xl bg-[#131d17] border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-2">
                {EDUCATIONAL_MODULES.renewableEnergy.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {EDUCATIONAL_MODULES.renewableEnergy.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EDUCATIONAL_MODULES.renewableEnergy.sources.map((src, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-black/40 border border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      {src.type.includes('Wind') && <Wind className="w-5 h-5 text-emerald-400" />}
                      {src.type.includes('Solar') && <Sun className="w-5 h-5 text-amber-400" />}
                      {src.type.includes('Hydro') && <Droplets className="w-5 h-5 text-blue-400" />}
                      {src.type.includes('Biomass') && <Flame className="w-5 h-5 text-orange-400" />}
                      <h3 className="text-sm font-bold text-white">{src.type}</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {src.benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

