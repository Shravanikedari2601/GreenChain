export const INITIAL_PROJECTS = [
  {
    id: 1,
    name: "Patagonia Grassland Carbon",
    location: "Santa Cruz Province",
    country: "Argentina",
    projectType: "Grassland",
    vintage: "Vintage 2024",
    priceUsd: 12.40,
    priceEth: 0.0033,
    availableCredits: 130000,
    totalCredits: 250000,
    verifier: "Earth Audit Partners",
    aiRiskScore: 18,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    description: "Holistic planned grazing project across Patagonian steppe restoring soil carbon, water retention and desertified native grasslands.",
    hectares: 2500,
    treeCount: 0,
    species: "Native Tussock Grass",
    evidenceCid: "ipfs://QmPatagoniaGrasslandAuditProof",
  },
  {
    id: 2,
    name: "Cerrado Native Forest Recovery",
    location: "Tocantins",
    country: "Brazil",
    projectType: "Afforestation",
    vintage: "Vintage 2025",
    priceUsd: 15.75,
    priceEth: 0.0042,
    availableCredits: 96000,
    totalCredits: 180000,
    verifier: "Verra VCS Standard",
    aiRiskScore: 24,
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80",
    description: "Re-establishing endemic Cerrado savanna-forest corridor with deep-root native tree species protecting major aquifer headwaters.",
    hectares: 200,
    treeCount: 96000,
    species: "Dipteryx Alata & Native Savanna Trees",
    evidenceCid: "ipfs://QmCerradoForestSatelliteAudit",
  },
  {
    id: 3,
    name: "Sunridge Wind Farm Expansion",
    location: "Kansas",
    country: "USA",
    projectType: "Renewable Energy",
    vintage: "Renewable Energy",
    priceUsd: 9.20,
    priceEth: 0.0025,
    availableCredits: 32000,
    totalCredits: 95000,
    verifier: "Gold Standard Verifiers",
    aiRiskScore: 15,
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
    description: "Utility-scale wind energy turbine facility displacing coal-fired grid generation across the Midcontinent Independent System Operator (MISO).",
    hectares: 850,
    treeCount: 0,
    species: "Wind Turbines (45MW Capacity)",
    evidenceCid: "ipfs://QmSunridgeWindMWhTelemetryVerification",
  },
  {
    id: 4,
    name: "Amazon Basin Reforestation Phase II",
    location: "Para State",
    country: "Brazil",
    projectType: "Forestry",
    vintage: "Vintage 2024",
    priceUsd: 18.50,
    priceEth: 0.0050,
    availableCredits: 51000,
    totalCredits: 120000,
    verifier: "Terra Carbon Hub",
    aiRiskScore: 22,
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
    description: "High-biodiversity multi-canopy afforestation on degraded pasture land in the Brazilian Amazon with satellite radar canopy monitoring.",
    hectares: 120,
    treeCount: 50000,
    species: "Amazon Native Mixed Hardwoods",
    evidenceCid: "ipfs://QmAmazonBasinPhase2EvidenceReport2024",
  },
  {
    id: 5,
    name: "Sundarbans Coastal Mangrove Belt",
    location: "Bay of Bengal",
    country: "India",
    projectType: "Blue Carbon",
    vintage: "Vintage 2025",
    priceUsd: 21.00,
    priceEth: 0.0056,
    availableCredits: 45000,
    totalCredits: 100000,
    verifier: "Blue Carbon Alliance",
    aiRiskScore: 19,
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
    description: "Tidal mangrove restoration sequestering blue carbon up to 4x faster than terrestrial tropical forests while mitigating storm surge erosion.",
    hectares: 150,
    treeCount: 75000,
    species: "Rhizophora & Avicennia Mangrove",
    evidenceCid: "ipfs://QmSundarbansMangroveBlueCarbonAudit",
  },
  {
    id: 6,
    name: "Thar Desert Solar Photovoltaic Park",
    location: "Rajasthan",
    country: "India",
    projectType: "Solar Energy",
    vintage: "Renewable Energy",
    priceUsd: 8.75,
    priceEth: 0.0023,
    availableCredits: 85000,
    totalCredits: 200000,
    verifier: "Clean Energy Registry",
    aiRiskScore: 16,
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    description: "High-efficiency bifacial solar array generating zero-emission electricity to replace thermal coal grid power in Northern India.",
    hectares: 600,
    treeCount: 0,
    species: "Photovoltaic Solar Modules (75MW)",
    evidenceCid: "ipfs://QmTharDesertSolarGridAudit",
  }
];

export const EDUCATIONAL_MODULES = {
  whatAreCredits: {
    title: "What Are Carbon Credits?",
    summary: "A carbon credit is a measurable, verifiable certificate representing the reduction, avoidance, or removal of one metric ton (1,000 kg) of carbon dioxide equivalent (tCO2e) from the atmosphere.",
    keyPrinciples: [
      {
        name: "Additionality",
        desc: "The emission reduction would not have occurred without the financial revenue from carbon credits."
      },
      {
        name: "Permanence",
        desc: "The carbon must remain locked away for decades or centuries (enforced through biological buffer reserves and satellite monitoring)."
      },
      {
        name: "No Double Counting",
        desc: "Ethereum smart contracts guarantee that each credit is issued once, traded transparently, and burned forever upon retirement."
      },
      {
        name: "Measurable & Audited",
        desc: "Calculated with peer-reviewed allometric equations and verified by third-party certifiers (Verra, Gold Standard, Earth Audit)."
      }
    ]
  },
  howMarketWorks: {
    title: "How the Carbon Market Operates",
    types: [
      {
        name: "Compliance Carbon Market (Cap-and-Trade)",
        desc: "Legally mandated systems (such as the EU Emissions Trading System ETS or California Cap-and-Trade) where governments set strict emission caps and penalize excess emissions."
      },
      {
        name: "Voluntary Carbon Market (VCM)",
        desc: "Marketplace where corporations, developers, and individuals proactively purchase verified carbon credits to offset their carbon footprint and achieve Net-Zero milestones."
      }
    ],
    lifecycle: [
      "Project Design & Methodology Selection",
      "Biological & Environmental Data Logging (Tree count, GPS polygon, biomass)",
      "Independent Audit & AI Risk Evaluation",
      "Smart Contract Tokenization (1 Token = 1 tCO2e)",
      "Decentralized Marketplace Trading",
      "Permanent On-Chain Retirement & Certificate Issuance"
    ]
  },
  renewableEnergy: {
    title: "Renewable Energy & Carbon Credits",
    description: "Renewable energy projects generate carbon credits by displacing fossil-fuel-generated electricity on the regional power grid. The avoided emissions are calculated using the Grid Emission Factor (tCO2e / MWh).",
    sources: [
      {
        type: "Wind Energy",
        icon: "Wind",
        benefit: "Zero fuel emissions, low land footprint, generates ~0.8 to 1.1 tCO2e avoided per MWh displaced from coal grids."
      },
      {
        type: "Solar Photovoltaic",
        icon: "Sun",
        benefit: "Scalable modular arrays producing peak day power, offsetting thermal peaking plants with high reliability."
      },
      {
        type: "Hydro & Run-of-River",
        icon: "Droplets",
        benefit: "Continuous baseline clean energy generation without massive reservoirs or ecosystem disruption."
      },
      {
        type: "Biomass & Biogas",
        icon: "Flame",
        benefit: "Captures fugitive methane (a greenhouse gas 28x more potent than CO2) from agricultural waste and converts it to clean power."
      }
    ]
  }
};

