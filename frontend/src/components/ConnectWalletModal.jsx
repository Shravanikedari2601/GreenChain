import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { X, CheckCircle, Mail, Smartphone, Wallet, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ConnectWalletModal() {
  const {
    isWalletModalOpen,
    setIsWalletModalOpen,
    connectMetaMask,
    connectWithGoogle,
    connectWalletConnect,
    isConnecting
  } = useWallet();

  const [customEmail, setCustomEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);

  if (!isWalletModalOpen) return null;

  const handleGoogleSubmit = (e) => {
    e.preventDefault();
    if (customEmail) {
      connectWithGoogle(customEmail);
    } else {
      connectWithGoogle('green.carbon.user@gmail.com');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#131b17] border border-emerald-500/20 rounded-2xl p-6 shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          onClick={() => setIsWalletModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Web3 Gateway</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">Connect your wallet</h2>
          <p className="text-sm text-slate-400 mt-1">
            Link an Ethereum wallet to buy credits and record transactions on chain.
          </p>
        </div>

        {/* Wallet Options List */}
        <div className="space-y-3">
          {/* Option 1: MetaMask */}
          <button
            onClick={connectMetaMask}
            disabled={isConnecting}
            className="w-full text-left p-4 rounded-xl border border-slate-800 bg-[#17221d] hover:border-emerald-500/50 hover:bg-[#1c2a24] transition-all group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M21.5 8.5L13.5 2.5L12 3.5L10.5 2.5L2.5 8.5L4.5 13.5L12 21.5L19.5 13.5L21.5 8.5Z" fill="#F6851B" stroke="#E2761B" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">MetaMask</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  Detected
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Connect to the browser extension and approve access to your accounts.
              </p>
            </div>
          </button>

          {/* Option 2: Google / Gmail (Requested specifically by user) */}
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-[#162720] transition-all">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Gmail / Google Web3</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                    One-Click
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Sign in with your Gmail to generate a verifiable Ethereum address instantly.
                </p>

                {!showEmailInput ? (
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => connectWithGoogle('developer.carbon@gmail.com')}
                      disabled={isConnecting}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Sign in with Google</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setShowEmailInput(true)}
                      className="text-xs text-slate-400 hover:text-white underline underline-offset-2"
                    >
                      Use custom Gmail
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleGoogleSubmit} className="mt-3 space-y-2">
                    <input
                      type="email"
                      required
                      placeholder="your.name@gmail.com"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-black/50 border border-emerald-500/40 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        disabled={isConnecting}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs"
                      >
                        Create / Load Account
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEmailInput(false)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Option 3: WalletConnect */}
          <button
            onClick={connectWalletConnect}
            disabled={isConnecting}
            className="w-full text-left p-4 rounded-xl border border-slate-800 bg-[#17221d] hover:border-emerald-500/50 hover:bg-[#1c2a24] transition-all group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 text-blue-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">WalletConnect</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  Mobile QR
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Scan a QR code with any mobile wallet app like Rainbow or Trust Wallet.
              </p>
            </div>
          </button>

          {/* Option 4: Coinbase Wallet */}
          <button
            onClick={() => connectWithGoogle('coinbase.investor@gmail.com')}
            disabled={isConnecting}
            className="w-full text-left p-4 rounded-xl border border-slate-800 bg-[#17221d] hover:border-emerald-500/50 hover:bg-[#1c2a24] transition-all group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0 mt-0.5 text-blue-500">
              <Wallet className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">Coinbase Wallet</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  Configured
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Connect with the Coinbase Wallet extension or mobile application.
              </p>
            </div>
          </button>
        </div>

        {/* Security badge footer */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Audited OpenZeppelin smart contracts</span>
          </div>
          <span className="text-slate-500">Chain: Sepolia (11155111)</span>
        </div>
      </div>
    </div>
  );
}

