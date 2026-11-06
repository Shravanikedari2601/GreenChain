import React, { useState } from 'react';
import { Calculator, Plane, Zap, Car, TreePine, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CarbonCalculator({ onOffsetClick }) {
  const [electricityKwh, setElectricityKwh] = useState(450); // kWh / month
  const [carKmWeekly, setCarKmWeekly] = useState(200);       // km / week
  const [flightHours, setFlightHours] = useState(12);        // hours / year

  // Calculation formulas:
  // Electricity: ~0.82 kg CO2 per kWh (global thermal average) * 12 months
  const electricityTons = (electricityKwh * 12 * 0.82) / 1000;
  // Car: ~0.17 kg CO2 per km * 52 weeks
  const carTons = (carKmWeekly * 52 * 0.17) / 1000;
  // Flights: ~0.25 metric tons CO2 per flight hour
  const flightTons = flightHours * 0.25;

  const totalTons = Math.max(1, parseFloat((electricityTons + carTons + flightTons).toFixed(2)));
  // 1 mature mangrove / tree sequesters ~22 kg/yr -> ~45 trees = 1 metric ton
  const treesNeeded = Math.round(totalTons * 45);

  return (
    <div className="rounded-3xl bg-[#121c17]/90 border border-emerald-500/30 p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Calculator className="w-3.5 h-3.5" />
              <span>AI CARBON FOOTPRINT AUDITOR</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Personal & Corporate Footprint Estimator
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Adjust your consumption metrics to compute your yearly metric tons of emissions and corresponding tree requirements.
            </p>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Slider 1: Electricity */}
          <div className="p-5 rounded-2xl bg-black/40 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Electricity</span>
              </span>
              <span className="text-xs font-mono font-bold text-white">{electricityKwh} kWh / mo</span>
            </div>
            <input
              type="range"
              min="50"
              max="2500"
              step="25"
              value={electricityKwh}
              onChange={(e) => setElectricityKwh(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>Emission:</span>
              <span className="font-mono text-emerald-400">{electricityTons.toFixed(2)} tCO2e/yr</span>
            </div>
          </div>

          {/* Slider 2: Car Commute */}
          <div className="p-5 rounded-2xl bg-black/40 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-blue-400" />
                <span>Vehicle Commute</span>
              </span>
              <span className="text-xs font-mono font-bold text-white">{carKmWeekly} km / wk</span>
            </div>
            <input
              type="range"
              min="0"
              max="1500"
              step="20"
              value={carKmWeekly}
              onChange={(e) => setCarKmWeekly(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>Emission:</span>
              <span className="font-mono text-emerald-400">{carTons.toFixed(2)} tCO2e/yr</span>
            </div>
          </div>

          {/* Slider 3: Flights */}
          <div className="p-5 rounded-2xl bg-black/40 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Plane className="w-4 h-4 text-purple-400" />
                <span>Flight Travel</span>
              </span>
              <span className="text-xs font-mono font-bold text-white">{flightHours} hrs / yr</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="2"
              value={flightHours}
              onChange={(e) => setFlightHours(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>Emission:</span>
              <span className="font-mono text-emerald-400">{flightTons.toFixed(2)} tCO2e/yr</span>
            </div>
          </div>

        </div>

        {/* Calculation Result Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#15271e] via-[#1a3327] to-[#15271e] border border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-8">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                Total Annual Footprint
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                {totalTons} <span className="text-base text-emerald-400 font-normal">tCO2e</span>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-700 hidden sm:block"></div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                Equivalent Trees Required
              </div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono flex items-center gap-2">
                <TreePine className="w-7 h-7 text-emerald-400" />
                <span>{treesNeeded.toLocaleString()}</span>
                <span className="text-base text-slate-300 font-normal">trees</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOffsetClick(totalTons)}
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 shrink-0"
          >
            <span>Offset My {totalTons} Tons Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

