import React from 'react';
import { X, Award, CheckCircle2, ShieldCheck, Printer, Download, ExternalLink, Leaf } from 'lucide-react';

export default function RetirementCertificateModal({ certificate, onClose }) {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0f1813] border-2 border-emerald-500/40 rounded-3xl p-8 sm:p-10 shadow-2xl text-slate-100 overflow-hidden">
        
        {/* Background seal watermarks */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl bg-black/40 border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Inner Certificate Border */}
        <div className="border border-emerald-500/30 rounded-2xl p-6 sm:p-8 relative bg-gradient-to-b from-[#13221a]/60 via-[#101b15]/60 to-[#13221a]/60 backdrop-blur-sm">
          
          {/* Certificate Header */}
          <div className="text-center pb-6 border-b border-emerald-500/20">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30">
              <Leaf className="w-8 h-8 text-black stroke-[2.5]" />
            </div>
            <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold font-mono">
              OFFICIAL ON-CHAIN RECORD OF RETIREMENT
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Certificate of Carbon Neutrality
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Cryptographically verified on Ethereum Mainnet & Sepolia Ledger
            </p>
          </div>

          {/* Certificate Body */}
          <div className="py-6 text-center space-y-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              THIS CERTIFICATE IS PROUDLY ISSUED TO
            </p>
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-emerald-300 font-serif">
              {certificate.beneficiary || "Global Sustainability Pioneer"}
            </div>

            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              for the permanent on-chain retirement and environmental offset of:
            </p>

            <div className="inline-block px-6 py-3 rounded-2xl bg-black/50 border border-emerald-500/40">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                {certificate.amount}
              </span>
              <span className="text-sm font-semibold text-white ml-2">Metric Tons CO2e</span>
            </div>

            <div className="text-xs text-slate-400 max-w-md mx-auto italic">
              "{certificate.reason || 'Voluntary Corporate Net-Zero Scope 1 & 2 Emissions Offsetting'}"
            </div>
          </div>

          {/* Verification Signoff Footer */}
          <div className="pt-6 border-t border-emerald-500/20 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">CERTIFICATE ID</span>
              <span className="text-emerald-400 truncate block">{certificate.id}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">DATE OF OFFSET</span>
              <span className="text-white block">{certificate.date}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-500 block text-[10px]">PROTOCOL STANDARD</span>
              <span className="text-slate-300 block">{certificate.standard}</span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Immutable & Double-Count-Free</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

