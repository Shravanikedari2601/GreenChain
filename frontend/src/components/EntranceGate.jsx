import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import {
  Leaf,
  Mail,
  ArrowRight,
  Smartphone,
  CheckCircle2,
  TreePine
} from 'lucide-react';

export default function EntranceGate({ onEnterAsGuest }) {
  const {
    connectMetaMask,
    connectWithGoogle,
    connectWalletConnect,
    loginDemo,
    isConnecting
  } = useWallet();

  const [emailInput, setEmailInput] = useState('');
  const [showCustomEmail, setShowCustomEmail] = useState(false);

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (emailInput) {
      connectWithGoogle(emailInput);
    } else {
      connectWithGoogle('developer.carbon@gmail.com');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      
      {/* 
        Exact Sun-Dappled Tree Leaves Background 
        Matches the user reference screenshot
      */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(8, 14, 10, 0.96) 0%, rgba(8, 14, 10, 0.88) 35%, rgba(8, 14, 10, 0.40) 65%, rgba(8, 14, 10, 0.15) 100%),
            linear-gradient(to bottom, rgba(8, 14, 10, 0.5) 0%, transparent 40%, rgba(8, 14, 10, 0.95) 100%),
            url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2400&q=85')
          `,
          backgroundPosition: 'right 30% center'
        }}
      ></div>

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Leaf className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">GreenChain</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                AI
              </span>
            </div>
            <div className="text-[11px] text-slate-400">Decentralized Carbon Ledger</div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-emerald-400 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>ETH SEPOLIA ACTIVE</span>
        </div>
      </header>

      {/* Center Entrance Hero */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 py-6 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Side: Taglines & Value */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 text-emerald-400 text-xs font-semibold backdrop-blur-md">
            <TreePine className="w-4 h-4 text-emerald-400" />
            <span className="uppercase text-[11px] tracking-wider text-slate-200">ETHEREUM-BASED CARBON MARKETS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Carbon credits you can <br />
            <span className="text-white">verify, trust and trade.</span>
          </h1>

          <p className="text-base text-slate-300 max-w-lg leading-relaxed">
            GreenChain AI turns environmental projects into transparent, verified carbon credits. Connect your Web3 wallet or sign in with Gmail to enter.
          </p>

          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3 text-sm text-slate-200 justify-center lg:justify-start">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span>Land ownership verified with AI satellite telemetry</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200 justify-center lg:justify-start">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span>Scientific tree density bounds checking ($100–3,000$ trees/ha)</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200 justify-center lg:justify-start">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span>Smart contract burning for double-count-free offset certificates</span>
            </div>
          </div>

          {/* Guest Link */}
          <div className="pt-2">
            <button
              onClick={onEnterAsGuest}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors py-2 px-4 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10"
            >
              <span>Explore Platform in Guest Preview Mode</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Right Side: Authentication Box */}
        <div className="lg:w-1/2 w-full max-w-md">
          <div className="relative rounded-2xl bg-black/50 border border-white/10 p-7 shadow-2xl backdrop-blur-md">
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                  AUTHENTICATION GATEWAY
                </span>
                <span className="text-[10px] text-slate-400">Web3 / Email</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Login to Enter</h2>
              <p className="text-xs text-slate-400 mt-1">
                Select your preferred sign-in method to access or create your carbon account.
              </p>
            </div>

            {/* Auth Buttons */}
            <div className="space-y-3">
              
              {/* Option 1: MetaMask */}
              <button
                onClick={connectMetaMask}
                disabled={isConnecting}
                className="w-full p-3.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-emerald-500/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M21.5 8.5L13.5 2.5L12 3.5L10.5 2.5L2.5 8.5L4.5 13.5L12 21.5L19.5 13.5L21.5 8.5Z" fill="#F6851B" stroke="#E2761B" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white text-xs group-hover:text-emerald-400 transition-colors">
                      MetaMask
                    </div>
                    <div className="text-[10px] text-slate-400">Connect browser extension</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                  Detected
                </span>
              </button>

              {/* Option 2: Gmail / Google Web3 */}
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Gmail / Google Sign In</div>
                      <div className="text-[10px] text-emerald-300">Deterministic Web3 Address</div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 font-semibold">
                    Instant
                  </span>
                </div>

                {!showCustomEmail ? (
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => connectWithGoogle('green.carbon.user@gmail.com')}
                      disabled={isConnecting}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#a7f3d0] hover:bg-[#86efac] text-slate-900 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>1-Click Google Sign In</span>
                    </button>
                    <button
                      onClick={() => setShowCustomEmail(true)}
                      className="text-[11px] text-slate-300 hover:text-white px-2 py-2 underline underline-offset-2"
                    >
                      Use custom email
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCustomGoogleSubmit} className="mt-3 space-y-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your Gmail address..."
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-black/60 border border-emerald-500/50 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        disabled={isConnecting}
                        className="flex-1 py-1.5 px-3 rounded-xl bg-[#a7f3d0] hover:bg-[#86efac] text-slate-900 font-bold text-xs"
                      >
                        Enter with Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCustomEmail(false)}
                        className="text-xs text-slate-400 hover:text-white px-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Option 3: WalletConnect */}
              <button
                onClick={connectWalletConnect}
                disabled={isConnecting}
                className="w-full p-3.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-emerald-500/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white text-xs group-hover:text-emerald-400 transition-colors">
                      WalletConnect
                    </div>
                    <div className="text-[10px] text-slate-400">Scan QR with mobile app</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  Mobile
                </span>
              </button>
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-6">
          <div><strong className="text-white font-mono">8.4M+</strong> Trees Planted</div>
          <div><strong className="text-white font-mono">1.24M</strong> Tons CO2 Sequestered</div>
          <div><strong className="text-emerald-400 font-mono">48</strong> Global Projects</div>
        </div>
        <div>© 2026 GreenChain AI. All rights reserved.</div>
      </footer>

    </div>
  );
}
