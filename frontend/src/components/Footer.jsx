import React from 'react';
import { Leaf } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="border-t border-slate-900 bg-[#080d0a] text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info (Exact video match) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">GreenChain AI</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Verified, transparent and traceable carbon credits, recorded on Ethereum and scored by AI for every project.
            </p>
          </div>

          {/* Platform Links (Exact video match) */}
          <div className="md:col-span-3 sm:col-span-6 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white font-sans">
              PLATFORM
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('register-project')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Register a project
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('verifier')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Admin review
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links (Exact video match) */}
          <div className="md:col-span-4 sm:col-span-6 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white font-sans">
              COMPANY
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  About GreenChain
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('how-it-works')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  How it works
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('education')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Carbon Literacy & Plantation Impact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div>© 2026 GreenChain AI. All rights reserved.</div>
          <div className="flex items-center gap-4 mt-3 sm:mt-0">
            <span>Powered by Ethereum Smart Contracts</span>
            <span>•</span>
            <span>Chain ID: 11155111 (Sepolia)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

