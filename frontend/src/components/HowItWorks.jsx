import React from 'react';
import { FileEdit, UploadCloud, SearchCheck, Coins, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onRegisterClick, onBrowseClick }) {
  const steps = [
    {
      step: "01",
      icon: FileEdit,
      title: "Register your project",
      desc: "Describe the area, methodology and expected credit volume in a guided form."
    },
    {
      step: "02",
      icon: UploadCloud,
      title: "Upload evidence",
      desc: "Attach land rights, baseline studies and monitoring plans. Everything is stored securely."
    },
    {
      step: "03",
      icon: SearchCheck,
      title: "Review and score",
      desc: "Verifiers check the evidence and our AI platform produces an active risk evaluation of the project."
    },
    {
      step: "04",
      icon: Coins,
      title: "Issue and trade",
      desc: "Approved credits are recorded on Ethereum and made tradable in the marketplace for buyers."
    }
  ];

  return (
    <section className="py-20 bg-[#0b100d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            From project idea to tradable credit in four steps.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            A clear, auditable path that keeps project owners, verifiers and buyers aligned.
          </p>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-20">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-[#131d17] border border-slate-800/80 hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-emerald-400/80 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/20">
                      STEP {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call To Action Banner (Exact match to video at 01:25 - 01:27) */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#14231b] via-[#172c21] to-[#14231b] border border-emerald-500/30 p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Ready to make your carbon impact verifiable?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Create a company account and register your first project today.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={onRegisterClick}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-black font-semibold text-xs tracking-wide transition-all shadow-md"
              >
                Create an account
              </button>
              <button
                onClick={onBrowseClick}
                className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 bg-transparent text-white font-semibold text-xs tracking-wide transition-all"
              >
                Browse credits
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

