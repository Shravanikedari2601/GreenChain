import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import deployedContracts from '../contracts/deployed-contracts.json';

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [ethBalance, setEthBalance] = useState("0.00");
  const [gcccBalance, setGcccBalance] = useState("0.00");
  const [authMethod, setAuthMethod] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [demoRole, setDemoRole] = useState('company');
  const [hasEntered, setHasEntered] = useState(false); // Controls entrance gate
  const [activeCertificate, setActiveCertificate] = useState(null);

  // Certificates list
  const [certificates, setCertificates] = useState([
    {
      id: "0x8fa3729b104c91e",
      beneficiary: "Ecosystem Alpha Corp",
      reason: "FY2025 Scope 1 & 2 Neutrality",
      amount: "150.00",
      date: "Nov 03, 2026",
      txHash: "0x7a83d4019242b1",
      standard: "GreenChain AI Verified Standard"
    }
  ]);

  // Connect via MetaMask
  const connectMetaMask = async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await browserProvider.send("eth_requestAccounts", []);
        const network = await browserProvider.getNetwork();
        const browserSigner = await browserProvider.getSigner();

        const userAccount = accounts[0];
        setAccount(userAccount);
        setProvider(browserProvider);
        setSigner(browserSigner);
        setChainId(Number(network.chainId));
        setAuthMethod('metamask');
        setUserProfile({
          name: "Web3 Carbon Developer",
          email: `${userAccount.slice(0, 6)}...${userAccount.slice(-4)}@web3.eth`,
          role: "developer"
        });

        // Load ETH Balance
        const balanceWei = await browserProvider.getBalance(userAccount);
        setEthBalance(parseFloat(ethers.formatEther(balanceWei)).toFixed(4));
        setGcccBalance("250.00");

        setHasEntered(true);
        setIsWalletModalOpen(false);
      } else {
        alert("MetaMask extension not detected. You can also sign in directly using Google / Gmail Web3 Auth!");
      }
    } catch (err) {
      console.error("MetaMask connection failed:", err);
    } finally {
      setIsConnecting(false);
    }
  };

  // Connect via Google / Gmail Web3 Auth
  const connectWithGoogle = async (googleEmail = "green.developer@gmail.com") => {
    setIsConnecting(true);
    try {
      const hash = ethers.keccak256(ethers.toUtf8Bytes(googleEmail.toLowerCase()));
      const derivedAddress = ethers.getAddress("0x" + hash.slice(26));

      setAccount(derivedAddress);
      setAuthMethod('google');
      setUserProfile({
        name: googleEmail.split('@')[0].replace('.', ' ').toUpperCase(),
        email: googleEmail,
        role: "developer"
      });
      setEthBalance("1.8450");
      setGcccBalance("120.00");
      setChainId(11155111); // Ethereum Sepolia

      setHasEntered(true);
      setIsWalletModalOpen(false);
      setIsAuthModalOpen(false);
    } catch (err) {
      console.error("Google Auth error:", err);
    } finally {
      setIsConnecting(false);
    }
  };

  // Connect via WalletConnect (or Mobile QR)
  const connectWalletConnect = async () => {
    setIsConnecting(true);
    try {
      const mockWcAddress = "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7";
      setAccount(mockWcAddress);
      setAuthMethod('walletconnect');
      setUserProfile({
        name: "Mobile WalletConnect User",
        email: "mobile.wallet@walletconnect.org",
        role: "buyer"
      });
      setEthBalance("0.9520");
      setGcccBalance("85.00");
      setChainId(11155111);

      setHasEntered(true);
      setIsWalletModalOpen(false);
    } catch (err) {
      console.error("WalletConnect error:", err);
    } finally {
      setIsConnecting(false);
    }
  };

  // Demo Login
  const loginDemo = (role = 'company') => {
    if (role === 'admin') {
      const adminAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
      setAccount(adminAddress);
      setAuthMethod('demo');
      setUserProfile({
        name: "Chief Carbon Auditor",
        email: "auditor@earth-audit.org",
        role: "admin"
      });
      setEthBalance("10.0000");
      setGcccBalance("10000.00");
      setChainId(11155111);
    } else {
      const companyAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
      setAccount(companyAddress);
      setAuthMethod('demo');
      setUserProfile({
        name: "EcoForestry Enterprises",
        email: "contact@ecoforestry.org",
        role: "company"
      });
      setEthBalance("4.2500");
      setGcccBalance("350.00");
      setChainId(11155111);
    }
    setHasEntered(true);
    setIsAuthModalOpen(false);
  };

  const disconnect = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setUserProfile(null);
    setAuthMethod(null);
    setEthBalance("0.00");
    setGcccBalance("0.00");
    setHasEntered(false); // Return to entrance screen
  };

  // Perform purchase
  const executeBuyCredits = async (project, amountTons, retireInstantly = false, beneficiary = "", reason = "") => {
    if (!account) {
      setIsWalletModalOpen(true);
      return { success: false, message: "Please connect your wallet first." };
    }

    const costEth = (amountTons * project.priceEth).toFixed(4);
    if (parseFloat(ethBalance) < parseFloat(costEth)) {
      return { success: false, message: `Insufficient ETH balance. You need ${costEth} ETH.` };
    }

    const newEthBal = (parseFloat(ethBalance) - parseFloat(costEth)).toFixed(4);
    setEthBalance(newEthBal);

    if (retireInstantly) {
      const certId = "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('').slice(0, 10);
      const newCert = {
        id: certId,
        beneficiary: beneficiary || userProfile?.name || "Anonymous Beneficiary",
        reason: reason || `Offset for ${project.name}`,
        amount: amountTons.toFixed(2),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        txHash: "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('').slice(0, 12) + "...",
        standard: "GreenChain AI & Ethereum Verified"
      };
      setCertificates(prev => [newCert, ...prev]);
      setActiveCertificate(newCert); // Automatically display certificate
      return { success: true, certificate: newCert, txHash: newCert.txHash };
    } else {
      const newGcccBal = (parseFloat(gcccBalance) + amountTons).toFixed(2);
      setGcccBalance(newGcccBal);
      const txHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('').slice(0, 12) + "...";
      return { success: true, txHash };
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnect();
        }
      });
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        account,
        provider,
        signer,
        chainId,
        ethBalance,
        gcccBalance,
        authMethod,
        userProfile,
        isConnecting,
        isWalletModalOpen,
        setIsWalletModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        demoRole,
        setDemoRole,
        hasEntered,
        setHasEntered,
        certificates,
        activeCertificate,
        setActiveCertificate,
        connectMetaMask,
        connectWithGoogle,
        connectWalletConnect,
        loginDemo,
        disconnect,
        executeBuyCredits,
        contractAddresses: {
          token: deployedContracts.contracts.CarbonCreditToken.address,
          registry: deployedContracts.contracts.CarbonCreditRegistry.address,
          marketplace: deployedContracts.contracts.CarbonMarketplace.address,
        }
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
