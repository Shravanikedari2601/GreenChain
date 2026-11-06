import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { INITIAL_PROJECTS } from '../data/mockData';
import {
  Search,
  Filter,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Flame,
  ArrowUpDown,
  Lock,
  X,
  Sparkles,
  Info
} from 'lucide-react';

export default function Marketplace() {
  const { account, executeBuyCredits, setIsWalletModalOpen } = useWallet();
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('available');

  // Purchase modal state
  const [selectedProject, setSelectedProject] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(10);
  const [retireInstantly, setRetireInstantly] = useState(false);
  const [beneficiary, setBeneficiary] = useState('');
  const [retirementReason, setRetirementReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);

  // Filter logic
  const filteredProjects = projects
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        selectedType === 'All' || p.projectType.toLowerCase() === selectedType.toLowerCase();
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'available') return b.availableCredits - a.availableCredits;
      if (sortBy === 'price-low') return a.priceUsd - b.priceUsd;
      if (sortBy === 'price-high') return b.priceUsd - a.priceUsd;
      if (sortBy === 'risk') return a.aiRiskScore - b.aiRiskScore;
      return 0;
    });

  const totalAvailable = projects.reduce((acc, curr) => acc + curr.availableCredits, 0);
  const avgPrice = (projects.reduce((acc, curr) => acc + curr.priceUsd, 0) / projects.length).toFixed(2);
  const uniqueCountries = new Set(projects.map((p) => p.country)).size;

  const handleOpenBuyModal = (project) => {
    if (!account) {
      setIsWalletModalOpen(true);
      return;
    }
    setSelectedProject(project);
    setBuyQuantity(10);
    setRetireInstantly(false);
    setBeneficiary('');
    setRetirementReason('');
    setPurchaseSuccess(null);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedProject) return;
    setIsProcessing(true);
    try {
      const res = await executeBuyCredits(
        selectedProject,
        Number(buyQuantity),
        retireInstantly,
        beneficiary,
        retirementReason
      );

      if (res.success) {
        // Decrement available credits in UI
        setProjects((prev) =>
          prev.map((p) =>
            p.id === selectedProject.id
              ? { ...p, availableCredits: p.availableCredits - Number(buyQuantity) }
              : p
          )
        );
        setPurchaseSuccess({
          txHash: res.txHash,
          certificate: res.certificate || null,
          quantity: buyQuantity,
          retireInstantly
        });
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
      alert("Transaction failed: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-12 bg-[#0b100d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Marketplace Banner Header (Exact video match at 01:07) */}
        <div className="mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            CARBON CREDIT MARKETPLACE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Buy verified credits from projects you can trust.
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-3xl">
            Every listing has passed evidence review and carries an AI risk score, with each purchase recorded on Ethereum.
          </p>
        </div>

        {/* 3 Metric Cards Strip (Exact video match at 01:09) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <div className="p-6 rounded-2xl bg-[#131d17] border border-slate-800/80 shadow-md">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
              Credits available
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              {totalAvailable.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mt-1">Verified on-chain listings</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#131d17] border border-slate-800/80 shadow-md">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
              Average price
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              ${avgPrice}
            </div>
            <div className="text-xs text-slate-400 mt-1">Per metric ton CO2e</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#131d17] border border-slate-800/80 shadow-md">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
              Countries
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              {uniqueCountries}
            </div>
            <div className="text-xs text-slate-400 mt-1">Regulated jurisdictional origins</div>
          </div>
        </div>

        {/* Search & Filter Bar (Exact video match at 01:11) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 rounded-2xl bg-[#121b16] border border-slate-800 mb-8">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project, country or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="text-xs py-2.5 px-3 rounded-xl bg-black/40 border border-slate-800 text-white focus:outline-none focus:border-emerald-500/50 cursor-pointer"
              >
                <option value="All">All project types</option>
                <option value="Forestry">Forestry</option>
                <option value="Afforestation">Afforestation</option>
                <option value="Grassland">Grassland</option>
                <option value="Renewable Energy">Renewable Energy</option>
                <option value="Blue Carbon">Blue Carbon</option>
                <option value="Solar Energy">Solar Energy</option>
              </select>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs py-2.5 px-3 rounded-xl bg-black/40 border border-slate-800 text-white focus:outline-none focus:border-emerald-500/50 cursor-pointer"
              >
                <option value="available">Most available</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="risk">Lowest Risk Score</option>
              </select>
            </div>
          </div>
        </div>

        {/* Project Cards Grid (Exact video match at 01:12 - 01:20) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl overflow-hidden bg-[#131d17] border border-slate-800/80 hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Image Banner with Badge */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-emerald-400">
                    {project.vintage}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Risk: {project.aiRiskScore}/100</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {project.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {project.location}, {project.country}
                  </div>

                  <p className="text-xs text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Pricing and Availability Strip */}
                  <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Price</div>
                      <div className="text-lg font-black text-white font-mono">
                        ${project.priceUsd.toFixed(2)}
                        <span className="text-[10px] font-normal text-slate-400"> / ton</span>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono">
                        ~{project.priceEth} ETH
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Available</div>
                      <div className="text-base font-bold text-slate-200 font-mono">
                        {project.availableCredits.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">tCO2e credits</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Verification Footer & Buy Button */}
              <div className="p-5 pt-0">
                <div className="text-[11px] text-slate-400 mb-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Verified by <strong className="text-slate-300">{project.verifier}</strong></span>
                </div>

                {/* Buy Button with Access Control gating */}
                <button
                  onClick={() => handleOpenBuyModal(project)}
                  className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                    account
                      ? 'bg-[#1b2b23] hover:bg-emerald-500 hover:text-black border border-emerald-500/40 text-emerald-300 shadow-sm'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {!account && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{account ? 'Buy credits' : 'Connect Wallet to Buy'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Buy Credits Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-[#121c17] border border-emerald-500/30 rounded-2xl p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {!purchaseSuccess ? (
              <div>
                <div className="mb-4">
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold font-mono">
                    ON-CHAIN PURCHASE
                  </span>
                  <h2 className="text-xl font-bold text-white mt-1">{selectedProject.name}</h2>
                  <p className="text-xs text-slate-400">{selectedProject.location}, {selectedProject.country}</p>
                </div>

                <div className="space-y-4 my-5">
                  {/* Quantity selector */}
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                      <span>Credit Quantity (tCO2e)</span>
                      <span className="text-emerald-400 font-mono">Available: {selectedProject.availableCredits.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="1"
                        max={Math.min(selectedProject.availableCredits, 500)}
                        value={buyQuantity}
                        onChange={(e) => setBuyQuantity(Number(e.target.value))}
                        className="flex-1 accent-emerald-500"
                      />
                      <input
                        type="number"
                        min="1"
                        max={selectedProject.availableCredits}
                        value={buyQuantity}
                        onChange={(e) => setBuyQuantity(Number(e.target.value))}
                        className="w-24 text-xs font-mono font-bold text-center px-2 py-2 rounded-lg bg-black/50 border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Price per Ton:</span>
                      <span className="font-mono text-white">${selectedProject.priceUsd.toFixed(2)} (~{selectedProject.priceEth} ETH)</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Total Estimated Cost:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        ${(buyQuantity * selectedProject.priceUsd).toFixed(2)} (~{(buyQuantity * selectedProject.priceEth).toFixed(4)} ETH)
                      </span>
                    </div>
                  </div>

                  {/* Instant Retirement Option */}
                  <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-950/20">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={retireInstantly}
                        onChange={(e) => setRetireInstantly(e.target.checked)}
                        className="rounded border-slate-700 bg-black text-emerald-500 focus:ring-0"
                      />
                      <span className="text-xs font-semibold text-emerald-300">
                        Burn & Retire instantly (Generate Offset Certificate)
                      </span>
                    </label>

                    {retireInstantly && (
                      <div className="mt-3 space-y-2.5 pt-2 border-t border-emerald-500/20">
                        <div>
                          <label className="block text-[11px] text-slate-300 mb-1">Beneficiary Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Acme Corp or Personal Name"
                            value={beneficiary}
                            onChange={(e) => setBeneficiary(e.target.value)}
                            className="w-full text-xs px-3 py-1.5 rounded-lg bg-black/50 border border-slate-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-300 mb-1">Retirement Purpose</label>
                          <input
                            type="text"
                            placeholder="e.g. 2026 Scope 1 Emissions Offset"
                            value={retirementReason}
                            onChange={(e) => setRetirementReason(e.target.value)}
                            className="w-full text-xs px-3 py-1.5 rounded-lg bg-black/50 border border-slate-700 text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleConfirmPurchase}
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider uppercase transition-all shadow-lg"
                >
                  {isProcessing ? 'Executing On-Chain...' : retireInstantly ? 'Buy & Retire Instantly' : 'Confirm Purchase'}
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white">Transaction Confirmed!</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                  {purchaseSuccess.retireInstantly
                    ? `Successfully retired ${purchaseSuccess.quantity} metric tons on Ethereum. Your certificate is active!`
                    : `Successfully credited ${purchaseSuccess.quantity} GCCC tokens to your Ethereum wallet.`}
                </p>

                <div className="my-4 p-3 rounded-xl bg-black/40 border border-slate-800 text-xs text-left font-mono">
                  <div className="text-slate-400 text-[10px]">TRANSACTION HASH</div>
                  <div className="text-emerald-400 truncate">{purchaseSuccess.txHash}</div>
                  {purchaseSuccess.certificate && (
                    <div className="mt-2 pt-2 border-t border-slate-800">
                      <div className="text-slate-400 text-[10px]">CERTIFICATE ID</div>
                      <div className="text-white truncate">{purchaseSuccess.certificate.id}</div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full py-2.5 rounded-xl bg-[#1b2b23] hover:bg-[#23382e] text-emerald-300 font-semibold text-xs border border-emerald-500/30"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

