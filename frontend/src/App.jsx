import React, { useState } from 'react';
import { WalletProvider, useWallet } from './context/WalletContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrutinySection from './components/ScrutinySection';
import HowItWorks from './components/HowItWorks';
import Marketplace from './components/Marketplace';
import RegisterProject from './components/RegisterProject';
import EducationHub from './components/EducationHub';
import VerifierPortal from './components/VerifierPortal';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import ConnectWalletModal from './components/ConnectWalletModal';
import AuthModals from './components/AuthModals';
import EntranceGate from './components/EntranceGate';
import CarbonCalculator from './components/CarbonCalculator';
import RetirementCertificateModal from './components/RetirementCertificateModal';

function MainApp() {
  const { hasEntered, setHasEntered, account, activeCertificate, setActiveCertificate } = useWallet();
  const [activeTab, setActiveTab] = useState('home');

  // If user hasn't entered and isn't connected, show the entrance login gate
  if (!hasEntered && !account) {
    return (
      <EntranceGate
        onEnterAsGuest={() => setHasEntered(true)}
      />
    );
  }

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Global Immersive Tree Canopy Background Layers */}
      <div className="tree-bg-layer"></div>
      <div className="tree-mist-overlay"></div>

      {/* Sticky Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Router */}
      <main className="flex-1 relative z-10">
        {activeTab === 'home' && (
          <div>
            <Hero
              onRegisterClick={() => setActiveTab('register-project')}
              onExploreClick={() => setActiveTab('marketplace')}
            />
            
            {/* Interactive Carbon Calculator Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <CarbonCalculator
                onOffsetClick={() => setActiveTab('marketplace')}
              />
            </div>

            <ScrutinySection />
            <HowItWorks
              onRegisterClick={() => setActiveTab('register-project')}
              onBrowseClick={() => setActiveTab('marketplace')}
            />
            <Marketplace />
          </div>
        )}

        {activeTab === 'marketplace' && <Marketplace />}
        {activeTab === 'about' && <AboutSection onExploreClick={() => setActiveTab('marketplace')} />}
        {activeTab === 'how-it-works' && (
          <HowItWorks
            onRegisterClick={() => setActiveTab('register-project')}
            onBrowseClick={() => setActiveTab('marketplace')}
          />
        )}
        {activeTab === 'register-project' && <RegisterProject />}
        {activeTab === 'education' && (
          <div>
            <EducationHub />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <CarbonCalculator onOffsetClick={() => setActiveTab('marketplace')} />
            </div>
          </div>
        )}
        {activeTab === 'verifier' && <VerifierPortal />}
      </main>

      {/* Global Modals */}
      <ConnectWalletModal />
      <AuthModals />
      
      {/* Proof of Retirement Certificate Modal */}
      {activeCertificate && (
        <RetirementCertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <MainApp />
    </WalletProvider>
  );
}
