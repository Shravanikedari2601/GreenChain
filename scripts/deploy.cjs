const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const network = await hre.ethers.provider.getNetwork();

  console.log("==================================================");
  console.log("GreenChain AI - Smart Contract Deployment Engine");
  console.log("==================================================");
  console.log("Deployer Address:", deployer.address);
  console.log("Network Name:    ", network.name);
  console.log("Chain ID:        ", network.chainId.toString());

  // 1. Deploy Carbon Credit Token (GCCC)
  console.log("\n[1/3] Deploying CarbonCreditToken (GCCC)...");
  const Token = await hre.ethers.getContractFactory("CarbonCreditToken");
  const token = await Token.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("✓ CarbonCreditToken deployed at:", tokenAddress);

  // 2. Deploy Carbon Credit Registry
  console.log("\n[2/3] Deploying CarbonCreditRegistry...");
  const Registry = await hre.ethers.getContractFactory("CarbonCreditRegistry");
  const registry = await Registry.deploy(deployer.address);
  await registry.waitForDeployment();
  const registryAddress = await registry.getAddress();
  console.log("✓ CarbonCreditRegistry deployed at:", registryAddress);

  // Link Token and Registry
  console.log("Linking Token and Registry authorization...");
  await token.setRegistryContract(registryAddress);
  await registry.setTokenContract(tokenAddress);
  console.log("✓ Authorization granted.");

  // 3. Deploy Carbon Marketplace
  console.log("\n[3/3] Deploying CarbonMarketplace...");
  const Marketplace = await hre.ethers.getContractFactory("CarbonMarketplace");
  const marketplace = await Marketplace.deploy(tokenAddress, deployer.address);
  await marketplace.waitForDeployment();
  const marketplaceAddress = await marketplace.getAddress();
  console.log("✓ CarbonMarketplace deployed at:", marketplaceAddress);

  // 4. Seed initial verified projects matching the reference demo
  console.log("\nSeeding initial verified carbon projects...");
  const initialProjects = [
    {
      name: "Amazon Basin Reforestation Phase II",
      location: "Para State",
      country: "Brazil",
      projectType: 0, // Forestry
      vintageYear: 2024,
      aiRiskScore: 22,
      ipfsEvidenceHash: "ipfs://QmAmazonBasinPhase2EvidenceReport2024",
      gpsCoordinates: "-3.4653, -62.2159",
      trees: 50000,
      species: "Amazon Native Mixed Canopy",
      hectares: 120,
      approvedCredits: 51000,
      priceEth: "0.005", // ~$18.50 at ~3700 ETH
      vintage: "Vintage 2024",
    },
    {
      name: "Patagonia Grassland Carbon",
      location: "Santa Cruz Province",
      country: "Argentina",
      projectType: 2, // Grassland
      vintageYear: 2024,
      aiRiskScore: 18,
      ipfsEvidenceHash: "ipfs://QmPatagoniaGrasslandAuditProof",
      gpsCoordinates: "-48.7758, -70.3411",
      trees: 0,
      species: "Native Perennial Tussock Grass",
      hectares: 2500,
      approvedCredits: 130000,
      priceEth: "0.0033", // ~$12.40
      vintage: "Vintage 2024",
    },
    {
      name: "Cerrado Native Forest Recovery",
      location: "Tocantins",
      country: "Brazil",
      projectType: 1, // Afforestation
      vintageYear: 2025,
      aiRiskScore: 24,
      ipfsEvidenceHash: "ipfs://QmCerradoForestSatelliteAudit",
      gpsCoordinates: "-10.184, -48.333",
      trees: 96000,
      species: "Cerrado Native Flora & Dipteryx",
      hectares: 200,
      approvedCredits: 96000,
      priceEth: "0.0042", // ~$15.75
      vintage: "Vintage 2025",
    },
    {
      name: "Sunridge Wind Farm Expansion",
      location: "Kansas",
      country: "USA",
      projectType: 3, // WindEnergy
      vintageYear: 2025,
      aiRiskScore: 15,
      ipfsEvidenceHash: "ipfs://QmSunridgeWindMWhTelemetryVerification",
      gpsCoordinates: "38.5266, -96.7265",
      trees: 0,
      species: "Renewable Wind Turbines 45MW",
      hectares: 850,
      approvedCredits: 32000,
      priceEth: "0.0025", // ~$9.20
      vintage: "Renewable Energy",
    },
  ];

  for (let i = 0; i < initialProjects.length; i++) {
    const p = initialProjects[i];
    console.log(`Registering project: ${p.name}...`);
    await registry.registerProject({
      name: p.name,
      location: p.location,
      country: p.country,
      projectType: p.projectType,
      vintageYear: p.vintageYear,
      aiRiskScore: p.aiRiskScore,
      ipfsEvidenceHash: p.ipfsEvidenceHash,
      gpsCoordinates: p.gpsCoordinates,
    });

    if (p.trees > 0) {
      await registry.submitTreeData(i + 1, p.trees, p.species, p.hectares, 22);
    }

    // Verify
    await registry.auditAndVerifyProject(i + 1, true, p.approvedCredits, p.aiRiskScore);

    // Mint partial credits to deployer for marketplace listing
    const seedListingAmount = hre.ethers.parseEther(Math.min(p.approvedCredits, 1000).toString());
    await registry.issueCredits(i + 1, deployer.address, seedListingAmount);

    // Approve marketplace
    await token.approve(marketplaceAddress, seedListingAmount);

    // List on marketplace
    const priceWei = hre.ethers.parseEther(p.priceEth);
    await marketplace.listCredits(
      i + 1,
      seedListingAmount,
      priceWei,
      p.vintage,
      p.name
    );
    console.log(`✓ Project #${i + 1} registered, audited, verified, and listed on marketplace.`);
  }

  // Export addresses and ABIs to frontend directory
  const frontendContractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");
  if (!fs.existsSync(frontendContractsDir)) {
    fs.mkdirSync(frontendContractsDir, { recursive: true });
  }

  const tokenArtifact = await hre.artifacts.readArtifact("CarbonCreditToken");
  const registryArtifact = await hre.artifacts.readArtifact("CarbonCreditRegistry");
  const marketplaceArtifact = await hre.artifacts.readArtifact("CarbonMarketplace");

  const deployedData = {
    network: {
      name: network.name,
      chainId: Number(network.chainId),
      rpcUrl: network.name === "sepolia" ? "https://ethereum-sepolia-rpc.publicnode.com" : "http://127.0.0.1:8545",
    },
    contracts: {
      CarbonCreditToken: {
        address: tokenAddress,
        abi: tokenArtifact.abi,
      },
      CarbonCreditRegistry: {
        address: registryAddress,
        abi: registryArtifact.abi,
      },
      CarbonMarketplace: {
        address: marketplaceAddress,
        abi: marketplaceArtifact.abi,
      },
    },
    deployedAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(frontendContractsDir, "deployed-contracts.json"),
    JSON.stringify(deployedData, null, 2)
  );
  console.log(`\n✓ Contract data exported to ${path.join(frontendContractsDir, "deployed-contracts.json")}`);
  console.log("==================================================");
  console.log("Deployment Successful!");
  console.log("==================================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

