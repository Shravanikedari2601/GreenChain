import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Hero({ onRegisterClick, onExploreClick }) {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      
      {/* 
        Exact Tree Foliage Background from the user screenshot:
        Deep dark on the left for crisp text contrast, sunlit green tree leaves shining on the right 
      */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(8, 14, 10, 0.97) 0%, rgba(8, 14, 10, 0.88) 35%, rgba(8, 14, 10, 0.35) 65%, rgba(8, 14, 10, 0.12) 100%),
            linear-gradient(to bottom, rgba(8, 14, 10, 0.6) 0%, transparent 25%, transparent 75%, rgba(8, 14, 10, 0.98) 100%),
            url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2400&q=85')
          `,
          backgroundPosition: 'right 30% center'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Badge matching user screenshot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 text-emerald-400 text-xs font-semibold tracking-wide backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="uppercase text-[11px] tracking-wider text-slate-200">ETHEREUM-BASED CARBON MARKETS</span>
            </div>

            {/* Headline matching screenshot */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Carbon credits you can <br className="hidden sm:inline" />
              <span>verify, trust and trade.</span>
            </h1>

            {/* Subheadline matching screenshot */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              GreenChain AI turns environmental projects into transparent, verified carbon credits. Our AI scores every project's risk, auditors approve the evidence, and each credit is recorded on Ethereum from issuance to retirement.
            </p>

            {/* CTA Buttons (Exact buttons from user photo) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              
              {/* Register Project: Light Mint Green Pill with Dark Text */}
              <button
                onClick={onRegisterClick}
                className="px-6 py-3.5 rounded-xl bg-[#a7f3d0] hover:bg-[#86efac] text-slate-900 font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/10 active:scale-95"
              >
                <span>Register your project</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </button>

              {/* Explore Marketplace: Dark Translucent Pill */}
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 text-white font-semibold text-sm transition-all backdrop-blur-md active:scale-95"
              >
                Explore the marketplace
              </button>
            </div>
          </div>

          {/* Right Column: AI Risk Assessment Card (Exact from user photo) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md shadow-2xl p-7 transition-all hover:border-emerald-500/30">
              
              <div className="relative z-10">
                {/* Header tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-300 tracking-wide">
                    AI risk assessment
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Live</span>
                </div>

                {/* Score Number Display */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-extrabold text-white tracking-tight">22</span>
                  <span className="text-sm text-slate-400 font-medium">/ 100 risk score</span>
                </div>

                {/* Green Progress Bar under 22 as shown in screenshot */}
                <div className="w-32 h-1.5 bg-slate-800 rounded-full mb-6 overflow-hidden">
                  <div className="w-2/5 h-full bg-emerald-400 rounded-full"></div>
                </div>

                {/* Verification Checklist */}
                <div className="space-y-3.5 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-200">Land ownership verified</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-200">Baseline study matches methodology</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-200">Satellite canopy growth on track</span>
                  </div>
                </div>

                {/* Subfooter */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Cryptographic Batch #4892</span>
                  <span className="text-emerald-400 font-mono">VERIFIED ON ETH</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Counter Strip matching reference */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
              CREDITS TRADED
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">1.2M+</div>
            <div className="text-xs text-slate-400 mt-1">Verified metric tons CO2 equivalent</div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
              PROJECTS VERIFIED
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">48</div>
            <div className="text-xs text-slate-400 mt-1">Global reforestation & clean energy sites</div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
              ON-CHAIN RECORDS
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">100%</div>
            <div className="text-xs text-slate-400 mt-1">Issuance to permanent retirement burned</div>
          </div>
        </div>

      </div>
    </section>
  );
}
