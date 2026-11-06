import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { X, Check, ArrowRight } from 'lucide-react';

export default function AuthModals() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    connectWithGoogle
  } = useWallet();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [agreed, setAgreed] = useState(true);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    connectWithGoogle(email || 'user.carbon@company.com');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    connectWithGoogle(email || 'new.developer@agro-carbon.org');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#111915] border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-slate-100">

        {/* Close button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 z-10 text-slate-400 hover:text-white p-1 rounded-lg transition-colors bg-black/40"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photo with Testimonial Quote */}
        <div className="relative md:w-5/12 min-h-[260px] md:min-h-full bg-cover bg-center flex flex-col justify-end p-8"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(11,16,13,0.95) 10%, rgba(11,16,13,0.4) 60%, rgba(11,16,13,0.2) 100%), url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80')`
          }}
        >
          <div className="text-emerald-400 text-3xl font-serif leading-none mb-2">“</div>
          <blockquote className="text-sm font-medium text-slate-100 leading-relaxed mb-3">
            Every credit we sell can be traced back to a verified hectare, a signed audit and an on-chain record.
          </blockquote>
          <div className="text-xs text-emerald-400 font-semibold tracking-wide">
            GreenChain AI verification standard
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-8 md:p-10 flex flex-col justify-center">
          {authModalMode === 'login' ? (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-white">Welcome back</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Log in to manage your carbon projects, track credits and review submissions.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Work email</label>
                  <input
                    type="email"
                    required
                    value={email || (demoRole === 'company' ? 'contact@ecoforestry.org' : 'auditor@earth-audit.org')}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/50 border border-slate-800 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    value={password || '••••••••••••'}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/50 border border-slate-800 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-xs tracking-wide transition-colors mt-2"
                >
                  Log in
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
                <span className="text-xs text-slate-400">New to GreenChain AI? </span>
                <button
                  onClick={() => setAuthModalMode('register')}
                  className="text-xs text-emerald-400 font-medium hover:underline"
                >
                  Create an account
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-5">
                <h2 className="text-2xl font-bold tracking-tight text-white">Create your company account</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Register your organisation to submit carbon projects, track credits and trade on the marketplace.
                </p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full name</label>
                    <input
                      type="text"
                      required
                      placeholder="Joe Thompson"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-black/50 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Company name</label>
                    <input
                      type="text"
                      required
                      placeholder="Evergreen Agro Ltd"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-black/50 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Work email</label>
                  <input
                    type="email"
                    required
                    placeholder="joe@evergreen-agro.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg bg-black/50 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-black/50 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Confirm password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full text-xs px-3 py-2 rounded-lg bg-black/50 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-black text-emerald-500 focus:ring-0"
                  />
                  <label htmlFor="terms" className="text-[11px] text-slate-400 leading-tight">
                    I agree to the platform terms and the verification standard for on-chain credits
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs tracking-wide transition-colors mt-2"
                >
                  Create account
                </button>
              </form>

              <div className="mt-5 pt-4 border-t border-slate-800/80 text-center">
                <span className="text-xs text-slate-400">Already have an account? </span>
                <button
                  onClick={() => setAuthModalMode('login')}
                  className="text-xs text-emerald-400 font-medium hover:underline"
                >
                  Log in
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

