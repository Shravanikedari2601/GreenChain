# GreenChain AI — Decentralized Carbon Credit & Verification dApp

GreenChain AI is an end-to-end decentralized application (dApp) for transparent, verified carbon credit issuance, trading, and permanent cryptographic retirement on the Ethereum blockchain.

The platform integrates **biological tree density algorithms**, **AI risk scoring**, **independent auditor workflows**, and **Ethereum smart contracts** to eliminate double-counting and phantom carbon offsets.

---

## 🌟 Key Features

### 1. Web3 Authentication & Account Creation
- **MetaMask Extension**: Direct connection to browser wallet.
- **Gmail / Google Web3 Auth**: One-click onboarding via Gmail that deterministically generates and binds a secure Ethereum keypair/address.
- **WalletConnect & Mobile QR**: Connect mobile wallets (Rainbow, Trust, MetaMask Mobile).
- **Coinbase Wallet**: Integrated browser and mobile support.
- **Access Control & Gating**: When signed in, user sees active account address (`0x...`), ETH balance, and carbon credit balance (GCCC). When disconnected, state-modifying actions prompt wallet connection.

### 2. Smart Contract Suite (`Solidity ^0.8.20`)
- **`CarbonCreditToken.sol` (GCCC)**:
  - Standard ERC-20 token where $1.0\ \text{GCCC} = 1\ \text{metric ton CO}_2\text{e}$ sequestered or avoided.
  
  - Role-based minter access (only verified registry contract can mint).
  - Cryptographic retirement / burn function emitting an immutable on-chain Certificate of Carbon Neutrality.
  - Pausable emergency controls.
- **`CarbonCreditRegistry.sol`**:
  - Validates project developer submissions.
  - **Biological Tree Verification**: Validates tree density ($\text{trees} / \text{ha}$) against scientific ecological bounds (100 to 3,000 trees/ha) to reject fraudulent claims.
  - Species-specific sequestration constants (Mangrove, Teak, Amazon Hardwood, Acacia).
  - Anti-double-issuance check via GPS polygon hash registry.
  - Records AI risk evaluation (0–100 score).
  - Multi-signature auditor signoff before credit release.
- **`CarbonMarketplace.sol`**:
  - Non-custodial escrow for peer-to-peer and project-to-corporate trading.
  - Buy with native ETH.
  - **Instant Buy & Retire**: One-click purchase and retirement that burns credits and generates an on-chain offset certificate in a single transaction.

### 3. Frontend Architecture (React 18 + Vite + Tailwind CSS + Ethers.js)
- **High-Fidelity UI**: Designed to match the video reference (`GreenChain AI`).
- **Hero & AI Risk Widget**: Real-time score display (e.g. `22 / 100 risk score`), land ownership check, baseline study match, and satellite canopy monitoring.
- **Live Plantation Counter**: Real-time dynamic ticker of verified trees planted ($8,452,000+$ trees), hectares restored ($14,890\ \text{ha}$), and $\text{tCO}_2\text{e}$ offset.
- **Marketplace**: Verified project cards (Patagonia Grassland, Cerrado Forest, Sunridge Wind Farm, Amazon Basin Phase II, Sundarbans Mangrove, Thar Solar Park).
- **Tree Verification Module**: Guided wizard calculating biomass volume, density safety, annual carbon capture, and predicted risk score.
- **Educational Hub**:
  - What are carbon credits (Additionality, Permanence, Measurability).
  - How the compliance and voluntary carbon markets work.
  - Interactive 4-step onboarding guide.
  - Renewable energy offset guide (Wind, Solar, Hydro, Biomass).

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ or v24+ recommended)
- npm (v9+)
- (Optional) MetaMask browser extension

### Installation
```bash
# 1. Install root dependencies (Hardhat)
npm install

# 2. Install frontend dependencies
cd frontend
npm install
cd ..
```

---

## 🧪 Testing the Smart Contracts
Execute the comprehensive Hardhat unit test suite:
```bash
npx hardhat test
```
*Output: 8 passing test suites covering minting, biological density validation, GPS double-counting prevention, marketplace escrow, and retirement certificates.*

---

## 🌐 Deploying to Ethereum Sepolia Testnet

### 1. Configure RPC & Private Key
Edit `.env` (or copy from `.env.example`):
```env
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
PRIVATE_KEY=your_metamask_private_key_here
```

> **Chainlist Sepolia Testnet RPCs (Chain ID: 11155111):**
> - `https://ethereum-sepolia-rpc.publicnode.com`
> - `https://rpc.sepolia.org`
> - `https://1rpc.io/sepolia`
> - `https://sepolia.drpc.org`
>
> **Get Free Sepolia Testnet ETH:**
> - Google Cloud Web3 Faucet: https://cloud.google.com/application/web3/faucet/ethereum/sepolia
> - Sepolia PoW Faucet: https://sepoliafaucet.com

### 2. Run Deployment Script
```bash
npm run deploy:sepolia
```
The script will:
1. Deploy `CarbonCreditToken (GCCC)`
2. Deploy `CarbonCreditRegistry`
3. Link Registry minting authorization
4. Deploy `CarbonMarketplace`
5. Seed initial verified projects
6. Export contract addresses and ABIs directly to `frontend/src/contracts/deployed-contracts.json`

---

## 💻 Running the Frontend Locally

```bash
cd frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔒 Security Best Practices Implemented
1. **Reentrancy Protection**: Used on all ETH transfers and token withdrawals in `CarbonMarketplace`.
2. **Access Control**: Strict `onlyAdmin` and `onlyVerifier` modifiers.
3. **Biological Validation**: Prevents inflated claims by verifying tree count against land area.
4. **GPS Anti-Double-Counting**: Cryptographic hash registry blocks duplicate project acreage.
5. **No Phantom Credits**: Token minting is strictly capped to the verified metric tons approved by auditors.
6. **Permanent Burn On-Chain**: Offset certificates are generated through verifiable irreversible burning of tokens.

