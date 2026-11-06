import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import {
  TreePine,
  Calculator,
  ShieldCheck,
  AlertTriangle,
  Upload,
  CheckCircle,
  FileCheck2,
  MapPin,
  Lock
} from 'lucide-react';

const SPECIES_DATA = {
  "Coastal Mangrove (Blue Carbon)": { rate: 30, idealDensity: "800 - 2000 trees/ha" },
  "Amazon Native Hardwood": { rate: 25, idealDensity: "400 - 1000 trees/ha" },
  "Teak (Tectona grandis)": { rate: 24, idealDensity: "500 - 1200 trees/ha" },
  "Acacia & Indigenous Pioneer": { rate: 20, idealDensity: "600 - 1500 trees/ha" },
  "Mixed Subtropical Canopy": { rate: 22, idealDensity: "500 - 1100 trees/ha" },
};

export default function RegisterProject() {
  const { account, setIsWalletModalOpen } = useWallet();

  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('India');
  const [projectType, setProjectType] = useState('Forestry');
  const [vintageYear, setVintageYear] = useState('2025');
  const [gpsCoordinates, setGpsCoordinates] = useState('21.9497, 88.9004');

  // Tree parameters
  const [treeCount, setTreeCount] = useState(50000);
  const [species, setSpecies] = useState("Coastal Mangrove (Blue Carbon)");
  const [hectares, setHectares] = useState(100);
  const [creditingYears, setCreditingYears] = useState(5);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  // Density calculation
  const density = hectares > 0 ? Math.round(treeCount / hectares) : 0;
  const isDensityValid = density >= 100 && density <= 3000;

  // Sequestration calculation
  const speciesRate = SPECIES_DATA[species]?.rate || 22;
  const annualCredits = Math.round((treeCount * speciesRate) / 1000);
  const totalCreditingPeriodCredits = annualCredits * creditingYears;

  // AI Risk Score calculation
  let calculatedRiskScore = 20;
  if (density < 200 || density > 2000) calculatedRiskScore += 10;
  if (creditingYears > 10) calculatedRiskScore += 8;
  if (!isDensityValid) calculatedRiskScore = 85;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!account) {
      setIsWalletModalOpen(true);
      return;
    }

    if (!isDensityValid) {
      alert("Error: Tree density must be within scientific bounds (100 - 3,000 trees/hectare).");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess({
        id: Math.floor(Math.random() * 9000) + 1000,
        projectName,
        treeCount,
        density,
        annualCredits,
        totalCredits: totalCreditingPeriodCredits,
        riskScore: calculatedRiskScore,
        txHash: "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('').slice(0, 14) + "..."
      });
    }, 1500);
  };

  return (
    <section className="py-12 bg-[#0b100d] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <TreePine className="w-3.5 h-3.5" />
            <span>PROJECT ONBOARDING & TREE AUDIT</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Register Carbon Project & Validate Tree Data
          </h1>
          <p className="text-sm text-slate-400 mt-1.5">
            Submit biological forestry or clean energy metrics. Our smart contracts and allometric algorithms enforce density bounds and prevent double-issuance.
          </p>
        </div>

        {!account && (
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs text-amber-200">
                You must connect an Ethereum wallet (or sign in via Gmail) to register an immutable project record.
              </div>
            </div>
            <button
              onClick={() => setIsWalletModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors shrink-0"
            >
              Connect Wallet
            </button>
          </div>
        )}

        {!submissionSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Project Metadata */}
            <div className="p-6 rounded-2xl bg-[#131d17] border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-mono">1</span>
                <span>Project General Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Project Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sundarbans Mangrove Blue Carbon Initiative"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Project Type</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Forestry">Forestry / Afforestation</option>
                    <option value="Blue Carbon">Blue Carbon (Coastal & Mangroves)</option>
                    <option value="Grassland">Grassland Restoration</option>
                    <option value="Wind Energy">Renewable Wind Energy</option>
                    <option value="Solar Energy">Renewable Solar Photovoltaic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">State / Province & Country</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="e.g. West Bengal"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-800 text-white placeholder-slate-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-800 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">GPS Polygon / Bounding Box</label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Latitude, Longitude"
                      value={gpsCoordinates}
                      onChange={(e) => setGpsCoordinates(e.target.value)}
                      className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-800 text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Biological Tree Data & Algorithmic Calculator */}
            <div className="p-6 rounded-2xl bg-[#131d17] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-mono">2</span>
                  <span>Tree Biomass & Density Parameters</span>
                </h2>
                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Real-time Sequestration Engine</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Number of Trees Planted</label>
                  <input
                    type="number"
                    min="100"
                    value={treeCount}
                    onChange={(e) => setTreeCount(Number(e.target.value))}
                    className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Land Area (Hectares)</label>
                  <input
                    type="number"
                    min="1"
                    value={hectares}
                    onChange={(e) => setHectares(Number(e.target.value))}
                    className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Crediting Horizon (Years)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={creditingYears}
                    onChange={(e) => setCreditingYears(Number(e.target.value))}
                    className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tree Species Selection</label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {Object.keys(SPECIES_DATA).map((sp) => (
                    <option key={sp} value={sp}>
                      {sp} (~{SPECIES_DATA[sp].rate} kg CO2/tree/yr)
                    </option>
                  ))}
                </select>
              </div>

              {/* Live Biological Density & Risk Box */}
              <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Calculated Tree Density:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{density} trees / ha</span>
                    {isDensityValid ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Valid Ecological Range
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Density Flagged (Min: 100, Max: 3000)
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400">Annual CO2 Sequestration:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {annualCredits.toLocaleString()} tCO2e / year
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400">Total Credits ({creditingYears} Years):</span>
                  <span className="font-mono font-extrabold text-white text-sm">
                    {totalCreditingPeriodCredits.toLocaleString()} Verified Tokens (GCCC)
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400">Estimated AI Risk Assessment:</span>
                  <span className={`font-mono font-bold ${calculatedRiskScore <= 25 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {calculatedRiskScore} / 100 {calculatedRiskScore <= 25 ? '(Grade A Low Risk)' : '(Requires Enhanced Review)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3: Evidence Upload Simulation */}
            <div className="p-6 rounded-2xl bg-[#131d17] border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-mono">3</span>
                <span>Supporting Evidence Documents</span>
              </h2>

              <div className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-xl p-6 text-center cursor-pointer transition-colors bg-black/20">
                <Upload className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <div className="text-xs font-semibold text-white">Upload Land Deed, Drone NDVI Map & Baseline Study</div>
                <div className="text-[11px] text-slate-500 mt-0.5">PDF, GEOJSON, TIFF up to 50MB (Pinned to decentralized IPFS storage)</div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Registering on Ethereum...' : 'Submit Project For Verifier Audit'}</span>
            </button>
          </form>
        ) : (
          /* Submission Success View */
          <div className="p-8 rounded-2xl bg-[#131d17] border border-emerald-500/30 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9" />
            </div>

            <h2 className="text-2xl font-bold text-white">Project Registered on Blockchain!</h2>
            <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">
              Your reforestation project #{submissionSuccess.id} has been cryptographically recorded on Ethereum and assigned to independent verifiers for on-site & satellite audit.
            </p>

            <div className="my-6 p-4 rounded-xl bg-black/50 border border-slate-800 text-left space-y-2 text-xs font-mono max-w-lg mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">PROJECT ID:</span>
                <span className="text-white font-bold">#{submissionSuccess.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">TRANSACTION HASH:</span>
                <span className="text-emerald-400 truncate">{submissionSuccess.txHash}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">TREES AUDITED:</span>
                <span className="text-white">{submissionSuccess.treeCount.toLocaleString()} trees</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ESTIMATED CREDITS:</span>
                <span className="text-emerald-400">{submissionSuccess.totalCredits.toLocaleString()} tCO2e</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AI RISK SCORE:</span>
                <span className="text-emerald-400">{submissionSuccess.riskScore} / 100</span>
              </div>
            </div>

            <button
              onClick={() => setSubmissionSuccess(null)}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 text-black font-semibold text-xs"
            >
              Register Another Project
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

