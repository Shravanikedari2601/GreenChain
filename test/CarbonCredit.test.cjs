const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GreenChain AI Carbon Credit System", function () {
  let token, registry, marketplace;
  let owner, developer, buyer, verifier, feeRecipient;

  beforeEach(async function () {
    [owner, developer, buyer, verifier, feeRecipient] = await ethers.getSigners();

    // 1. Deploy Token
    const TokenFactory = await ethers.getContractFactory("CarbonCreditToken");
    token = await TokenFactory.deploy();
    await token.waitForDeployment();

    // 2. Deploy Registry
    const RegistryFactory = await ethers.getContractFactory("CarbonCreditRegistry");
    registry = await RegistryFactory.deploy(owner.address);
    await registry.waitForDeployment();

    // Link Registry to Token
    await token.setRegistryContract(await registry.getAddress());
    await registry.setTokenContract(await token.getAddress());
    await registry.addVerifier(verifier.address);

    // 3. Deploy Marketplace
    const MarketplaceFactory = await ethers.getContractFactory("CarbonMarketplace");
    marketplace = await MarketplaceFactory.deploy(await token.getAddress(), feeRecipient.address);
    await marketplace.waitForDeployment();
  });

  describe("CarbonCreditToken", function () {
    it("should allow registry to mint credits", async function () {
      const amount = ethers.parseEther("1000"); // 1000 metric tons
      await token.mint(developer.address, amount);
      expect(await token.balanceOf(developer.address)).to.equal(amount);
      expect(await token.totalSupply()).to.equal(amount);
    });

    it("should revert if unauthorized address attempts to mint", async function () {
      await expect(
        token.connect(developer).mint(developer.address, ethers.parseEther("100"))
      ).to.be.revertedWith("GCCC: caller is not authorized to mint");
    });

    it("should allow a user to retire credits and generate a verifiable certificate", async function () {
      const amount = ethers.parseEther("50");
      await token.mint(buyer.address, amount);

      const tx = await token.connect(buyer).retire(
        amount,
        "Corporate Scope 1 Net Zero Offset",
        "Acme Sustainability Corp"
      );
      const receipt = await tx.wait();

      expect(await token.balanceOf(buyer.address)).to.equal(0);
      expect(await token.totalRetiredCredits()).to.equal(amount);
      expect(await token.totalCertificatesIssued()).to.equal(1);
    });
  });

  describe("CarbonCreditRegistry & Tree Data Verification", function () {
    it("should register a forestry project and enforce biological density bounds", async function () {
      const regInput = {
        name: "Amazon Basin Reforestation Phase II",
        location: "Para State",
        country: "Brazil",
        projectType: 0, // Forestry
        vintageYear: 2024,
        aiRiskScore: 22,
        ipfsEvidenceHash: "ipfs://QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        gpsCoordinates: "-3.4653, -62.2159",
      };

      await registry.connect(developer).registerProject(regInput);
      const project = await registry.getProject(1);
      expect(project.name).to.equal(regInput.name);
      expect(project.developer).to.equal(developer.address);

      // Rejects unrealistic density (e.g. 50 trees on 100 hectares = 0.5 trees/ha < MIN 100)
      await expect(
        registry.connect(developer).submitTreeData(1, 50, "Native Teak", 100, 25)
      ).to.be.revertedWith("Registry: tree density fails ecological bounds");

      // Valid density: 50,000 trees on 100 hectares = 500 trees/hectare (within 100-3000)
      await registry.connect(developer).submitTreeData(1, 50000, "Native Teak", 100, 25);
      const treeData = await registry.getTreeData(1);
      expect(treeData.numberOfTrees).to.equal(50000);
      expect(treeData.densityVerified).to.be.true;
    });

    it("should prevent double registration of the same GPS coordinates", async function () {
      const regInput = {
        name: "Patagonia Grassland",
        location: "Santa Cruz",
        country: "Argentina",
        projectType: 2, // Grassland
        vintageYear: 2024,
        aiRiskScore: 18,
        ipfsEvidenceHash: "ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        gpsCoordinates: "-48.7758, -70.3411",
      };

      await registry.connect(developer).registerProject(regInput);

      await expect(
        registry.connect(developer).registerProject(regInput)
      ).to.be.revertedWith("Registry: land area already registered");
    });

    it("should allow certified auditor to audit, verify and issue credits", async function () {
      const regInput = {
        name: "Cerrado Native Forest Recovery",
        location: "Tocantins",
        country: "Brazil",
        projectType: 1, // Afforestation
        vintageYear: 2025,
        aiRiskScore: 24,
        ipfsEvidenceHash: "ipfs://QmAuditDoc123",
        gpsCoordinates: "-10.184, -48.333",
      };

      await registry.connect(developer).registerProject(regInput);
      await registry.connect(developer).submitTreeData(1, 20000, "Acacia", 40, 22);

      // Auditor verifies 440 metric tons (20000 * 22 / 1000)
      const approvedTons = 440;
      await registry.connect(verifier).auditAndVerifyProject(1, true, approvedTons, 20);

      const verifiedProj = await registry.getProject(1);
      expect(verifiedProj.status).to.equal(2); // Verified
      expect(verifiedProj.verifiedCredits).to.equal(ethers.parseEther("440"));

      // Issue credits to developer
      const issueAmount = ethers.parseEther("440");
      await registry.connect(developer).issueCredits(1, developer.address, issueAmount);
      expect(await token.balanceOf(developer.address)).to.equal(issueAmount);

      // Cannot mint beyond verified amount
      await expect(
        registry.connect(developer).issueCredits(1, developer.address, ethers.parseEther("1"))
      ).to.be.revertedWith("Registry: cannot exceed verified credits");
    });
  });

  describe("CarbonMarketplace", function () {
    const listAmount = ethers.parseEther("100"); // 100 tons
    const pricePerTonWei = ethers.parseEther("0.01"); // 0.01 ETH per ton

    beforeEach(async function () {
      // Mint tokens to developer and approve marketplace
      await token.mint(developer.address, listAmount);
      await token.connect(developer).approve(await marketplace.getAddress(), listAmount);

      // List credits
      await marketplace.connect(developer).listCredits(
        1,
        listAmount,
        pricePerTonWei,
        "Vintage 2024",
        "Amazon Basin Reforestation"
      );
    });

    it("should allow buyer to purchase credits with ETH", async function () {
      const buyAmount = ethers.parseEther("10"); // Buy 10 tons
      const expectedCost = (buyAmount * pricePerTonWei) / ethers.parseEther("1"); // 0.1 ETH

      const buyerDevBalBefore = await token.balanceOf(buyer.address);
      await marketplace.connect(buyer).buyCredits(1, buyAmount, { value: expectedCost });

      expect(await token.balanceOf(buyer.address)).to.equal(buyAmount);

      const listing = await marketplace.getListing(1);
      expect(listing.amountAvailable).to.equal(ethers.parseEther("90"));
    });

    it("should allow buyer to direct buy-and-retire credits in a single transaction", async function () {
      const buyAmount = ethers.parseEther("5"); // 5 tons
      const expectedCost = (buyAmount * pricePerTonWei) / ethers.parseEther("1");

      const tx = await marketplace.connect(buyer).buyAndRetireCredits(
        1,
        buyAmount,
        "ZeroCarbon Enterprise Inc.",
        "Annual Scope 2 Offset",
        { value: expectedCost }
      );
      await tx.wait();

      expect(await token.totalRetiredCredits()).to.equal(buyAmount);
    });
  });
});

