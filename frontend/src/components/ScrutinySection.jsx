import React from 'react';
import { Check, Cpu, Blocks, UserCheck, ShoppingBag } from 'lucide-react';

export default function ScrutinySection() {
  const features = [
    {
      icon: Cpu,
      title: "AI risk scoring",
      description:
        "Every project receives a transparent risk score based on methodology, documentation scale and vintage, so buyers see the risk before they buy."
    },
    {
      icon: Blocks,
      title: "Ethereum-based ledger",
      description:
        "Issuance, purchases and retirements are all written to an Ethereum smart contract, giving every credit a permanent and auditable history."
    },
    {
      icon: UserCheck,
      title: "Expert verification",
      description:
        "Independent verifiers review land rights, baseline studies and monitoring plans before a single credit is released to market."
    },
    {
      icon: ShoppingBag,
      title: "Open marketplace",
      description:
        "Companies buy verified credits directly from projects with clear pricing, see availability and full transaction records."
    }
  ];

  return (
    <section className="py-20 border-t border-slate-900 bg-[#0d1310]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              ABOUT GREENCHAIN AI
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              A trusted home for carbon credits that hold up to scrutiny.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Carbon markets have long struggled with opaque projects and double-counted credits. GreenChain AI brings every step into a single verifiable record: project registration, evidence review, risk scoring and credit trading.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-200">
                  Register projects with supporting documents in minutes
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-200">
                  Auditors review evidence with AI-assisted risk insight
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-200">
                  Track every credit from issuance to retirement
                </span>
              </div>
            </div>
          </div>

          {/* Right Image with Floating Counter */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=80"
                alt="Wind turbine renewable energy field"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Counter Card (Exact video widget at 00:10) */}
              <div className="absolute bottom-5 right-5 bg-[#121c17]/90 backdrop-blur-md border border-emerald-500/40 rounded-xl p-4 shadow-xl">
                <div className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold mb-0.5">
                  TOTAL VERIFIED CO2 OFFSET
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  1,240,000
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  metric tons CO2 net zero
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Cards (Exact video cards at 00:14 - 00:20) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#141d18] border border-slate-800/80 hover:border-emerald-500/40 hover:bg-[#18241e] transition-all group shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

