import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import {
  Wallet,
  ChevronDown,
  LogOut,
  ExternalLink,
  Leaf,
  Copy,
  Check,
  DoorOpen
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const {
    account,
    ethBalance,
    gcccBalance,
    disconnect,
    setHasEntered,
    setIsWalletModalOpen,
    setIsAuthModalOpen,
    setAuthModalMode,
    userProfile,
    chainId
  } = useWallet();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const handleCopy = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white font-sans">GreenChain</span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">AI</span>
            </div>
            <div className="text-[10px] text-slate-400 -mt-0.5">Ethereum Carbon Ledger</div>
          </div>
        </div>

        {/* Navigation Links matching sample video and screenshot */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              activeTab === 'home'
                ? 'text-emerald-400 bg-white/5'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              activeTab === 'marketplace'
                ? 'text-emerald-400 bg-white/5'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              activeTab === 'about'
                ? 'text-emerald-400 bg-white/5'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab('how-it-works')}
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              activeTab === 'how-it-works'
                ? 'text-emerald-400 bg-white/5'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            How it works
          </button>
          <button
            onClick={() => setActiveTab('register-project')}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'register-project'
                ? 'text-emerald-400 bg-white/5'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Register Project</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded-full font-mono">Trees</span>
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              activeTab === 'education'
                ? 'text-emerald-400 bg-white/5'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Impact & Guide
          </button>
          <button
            onClick={() => setActiveTab('verifier')}
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              activeTab === 'verifier'
                ? 'text-emerald-400 bg-white/5'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Auditor Portal
          </button>
        </nav>

        {/* Action Buttons matching screenshot */}
        <div className="flex items-center gap-3">
          {!account ? (
            <>
              {/* Log In Button (exact screenshot match) */}
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="text-xs font-semibold px-3 py-2 text-slate-200 hover:text-white transition-colors"
              >
                Log in
              </button>

              {/* Get Started Button (exact light mint pill match) */}
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="text-xs font-bold px-4 py-2.5 rounded-xl bg-[#a7f3d0] hover:bg-[#86efac] text-slate-900 transition-all shadow-sm active:scale-95"
              >
                Get started
              </button>

              {/* Connect Wallet Button (exact dark pill match with wallet icon) */}
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/20 bg-black/60 hover:bg-black/80 text-white transition-all flex items-center gap-2 active:scale-95"
              >
                <Wallet className="w-3.5 h-3.5 text-slate-200" />
                <span>Connect Wallet</span>
              </button>
            </>
          ) : (
            /* Logged in state */
            <div className="relative">
              <div className="flex items-center gap-2 bg-black/60 border border-white/10 rounded-2xl p-1.5 pl-3">
                <div className="hidden sm:flex flex-col text-right pr-2 border-r border-white/10">
                  <span className="text-[10px] text-slate-400 leading-none">Carbon Credits</span>
                  <span className="text-xs font-bold text-emerald-400 leading-tight">{gcccBalance} GCCC</span>
                </div>

                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-mono">{formatAddress(account)}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Account Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#0c1410]/95 border border-white/15 rounded-2xl p-3.5 shadow-2xl z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="pb-3 border-b border-white/10">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Signed in as</div>
                    <div className="text-xs font-bold text-white truncate">{userProfile?.name || "Connected User"}</div>
                    <div className="text-[11px] text-slate-400 truncate">{userProfile?.email || account}</div>
                  </div>

                  <div className="py-2.5 space-y-1.5 border-b border-white/10 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>ETH Balance:</span>
                      <span className="font-mono font-semibold text-white">{ethBalance} ETH</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Carbon Credits:</span>
                      <span className="font-mono font-semibold text-emerald-400">{gcccBalance} tCO2e</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Network:</span>
                      <span className="font-medium text-emerald-400">
                        {chainId === 11155111 ? 'Sepolia Testnet' : chainId === 31337 ? 'Hardhat Local' : `Chain #${chainId || '11155111'}`}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-1 text-xs">
                    <button
                      onClick={handleCopy}
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{copied ? 'Address Copied!' : 'Copy Address'}</span>
                      </span>
                    </button>

                    <a
                      href={`https://sepolia.etherscan.io/address/${account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        <span>View on Etherscan</span>
                      </span>
                    </a>

                    <button
                      onClick={() => {
                        disconnect();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-rose-950/40 text-rose-400 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out & Exit</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
