// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICarbonCreditToken {
    function mint(address to, uint256 amount) external returns (bool);
}

/**
 * @title CarbonCreditRegistry
 * @dev Verifies project developer claims, models tree biomass sequestration,
 * validates ecological density, records AI risk assessments, and issues verified credits.
 */
contract CarbonCreditRegistry {
    enum ProjectType { Forestry, Afforestation, Grassland, WindEnergy, SolarEnergy, BlueCarbon }
    enum VerificationStatus { Submitted, UnderAudit, Verified, Rejected }

    struct TreeData {
        uint256 numberOfTrees;
        string species;
        uint256 landAreaHectares;
        uint256 plantingTimestamp;
        uint256 annualSequestrationKgPerTree;
        bool densityVerified;
    }

    struct Project {
        uint256 id;
        address developer;
        string name;
        string location;
        string country;
        ProjectType projectType;
        uint16 vintageYear;
        uint8 aiRiskScore;
        VerificationStatus status;
        uint256 verifiedCredits;
        uint256 mintedCredits;
        string ipfsEvidenceHash;
        string gpsCoordinates;
        address auditor;
        uint256 submissionTimestamp;
        uint256 verificationTimestamp;
        bool exists;
    }

    struct ProjectRegistrationInput {
        string name;
        string location;
        string country;
        ProjectType projectType;
        uint16 vintageYear;
        uint8 aiRiskScore;
        string ipfsEvidenceHash;
        string gpsCoordinates;
    }

    address public admin;
    ICarbonCreditToken public tokenContract;
    uint256 public projectCount;

    uint256 public constant MIN_TREES_PER_HECTARE = 100;
    uint256 public constant MAX_TREES_PER_HECTARE = 3000;

    mapping(address => bool) public isVerifier;
    mapping(uint256 => Project) public projects;
    mapping(uint256 => TreeData) public projectTreeData;
    mapping(bytes32 => bool) public registeredGpsHashes;

    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    event ProjectRegistered(
        uint256 indexed projectId,
        address indexed developer,
        string name,
        ProjectType projectType,
        uint16 vintageYear,
        uint8 aiRiskScore
    );
    event TreeDataLogged(
        uint256 indexed projectId,
        uint256 numberOfTrees,
        string species,
        uint256 landAreaHectares
    );
    event ProjectAudited(
        uint256 indexed projectId,
        address indexed auditor,
        VerificationStatus status,
        uint256 verifiedCredits
    );
    event CreditsMinted(
        uint256 indexed projectId,
        address indexed recipient,
        uint256 amount
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "Registry: caller is not admin");
        _;
    }

    modifier onlyVerifier() {
        require(isVerifier[msg.sender] || msg.sender == admin, "Registry: caller is not a verified auditor");
        _;
    }

    constructor(address _admin) {
        require(_admin != address(0), "Registry: zero address admin");
        admin = _admin;
        isVerifier[_admin] = true;
        emit VerifierAdded(_admin);
    }

    function setTokenContract(address _tokenAddress) external onlyAdmin {
        require(_tokenAddress != address(0), "Registry: zero address token");
        tokenContract = ICarbonCreditToken(_tokenAddress);
    }

    function addVerifier(address _verifier) external onlyAdmin {
        require(_verifier != address(0), "Registry: zero address");
        require(!isVerifier[_verifier], "Registry: already a verifier");
        isVerifier[_verifier] = true;
        emit VerifierAdded(_verifier);
    }

    function removeVerifier(address _verifier) external onlyAdmin {
        require(isVerifier[_verifier], "Registry: not a verifier");
        isVerifier[_verifier] = false;
        emit VerifierRemoved(_verifier);
    }

    function registerProject(ProjectRegistrationInput calldata input) external returns (uint256 projectId) {
        require(bytes(input.name).length > 0, "Registry: project name required");
        require(input.vintageYear >= 2020 && input.vintageYear <= 2035, "Registry: invalid vintage year");
        require(input.aiRiskScore <= 100, "Registry: AI risk score out of 0-100 bounds");

        bytes32 gpsHash = keccak256(abi.encodePacked(input.gpsCoordinates));
        require(!registeredGpsHashes[gpsHash], "Registry: land area already registered");
        registeredGpsHashes[gpsHash] = true;

        projectCount++;
        projectId = projectCount;

        Project storage p = projects[projectId];
        p.id = projectId;
        p.developer = msg.sender;
        p.name = input.name;
        p.location = input.location;
        p.country = input.country;
        p.projectType = input.projectType;
        p.vintageYear = input.vintageYear;
        p.aiRiskScore = input.aiRiskScore;
        p.status = VerificationStatus.Submitted;
        p.verifiedCredits = 0;
        p.mintedCredits = 0;
        p.ipfsEvidenceHash = input.ipfsEvidenceHash;
        p.gpsCoordinates = input.gpsCoordinates;
        p.auditor = address(0);
        p.submissionTimestamp = block.timestamp;
        p.verificationTimestamp = 0;
        p.exists = true;

        emit ProjectRegistered(projectId, msg.sender, input.name, input.projectType, input.vintageYear, input.aiRiskScore);
        return projectId;
    }

    function submitTreeData(
        uint256 projectId,
        uint256 numberOfTrees,
        string calldata species,
        uint256 landAreaHectares,
        uint256 annualSequestrationKgPerTree
    ) external {
        Project storage proj = projects[projectId];
        require(proj.exists, "Registry: project does not exist");
        require(proj.developer == msg.sender || msg.sender == admin, "Registry: only developer can submit tree data");
        require(
            proj.projectType == ProjectType.Forestry ||
            proj.projectType == ProjectType.Afforestation ||
            proj.projectType == ProjectType.BlueCarbon,
            "Registry: project is not tree-based"
        );
        require(numberOfTrees > 0, "Registry: tree count must be > 0");
        require(landAreaHectares > 0, "Registry: land area must be > 0");

        uint256 density = numberOfTrees / landAreaHectares;
        require(
            density >= MIN_TREES_PER_HECTARE && density <= MAX_TREES_PER_HECTARE,
            "Registry: tree density fails ecological bounds"
        );

        uint256 seqRate = annualSequestrationKgPerTree > 0 ? annualSequestrationKgPerTree : 22;

        projectTreeData[projectId] = TreeData({
            numberOfTrees: numberOfTrees,
            species: species,
            landAreaHectares: landAreaHectares,
            plantingTimestamp: block.timestamp,
            annualSequestrationKgPerTree: seqRate,
            densityVerified: true
        });

        emit TreeDataLogged(projectId, numberOfTrees, species, landAreaHectares);
    }

    function calculateEstimatedCredits(
        uint256 numberOfTrees,
        uint256 kgPerTreePerYear,
        uint256 creditingYears
    ) public pure returns (uint256 metricTons) {
        return (numberOfTrees * kgPerTreePerYear * creditingYears) / 1000;
    }

    function auditAndVerifyProject(
        uint256 projectId,
        bool approve,
        uint256 approvedCreditsMetricTons,
        uint8 finalAiRiskScore
    ) external onlyVerifier {
        Project storage proj = projects[projectId];
        require(proj.exists, "Registry: project does not exist");
        require(proj.status != VerificationStatus.Verified, "Registry: already verified");

        if (approve) {
            require(approvedCreditsMetricTons > 0, "Registry: credits must be > 0");
            proj.status = VerificationStatus.Verified;
            proj.verifiedCredits = approvedCreditsMetricTons * 10**18;
            proj.aiRiskScore = finalAiRiskScore;
        } else {
            proj.status = VerificationStatus.Rejected;
        }

        proj.auditor = msg.sender;
        proj.verificationTimestamp = block.timestamp;

        emit ProjectAudited(projectId, msg.sender, proj.status, proj.verifiedCredits);
    }

    function issueCredits(
        uint256 projectId,
        address recipient,
        uint256 amountToMint
    ) external {
        Project storage proj = projects[projectId];
        require(proj.exists, "Registry: project does not exist");
        require(proj.status == VerificationStatus.Verified, "Registry: project is not verified");
        require(
            msg.sender == proj.developer || msg.sender == admin || isVerifier[msg.sender],
            "Registry: unauthorized issuer"
        );
        require(
            proj.mintedCredits + amountToMint <= proj.verifiedCredits,
            "Registry: cannot exceed verified credits"
        );
        require(address(tokenContract) != address(0), "Registry: token contract not configured");

        proj.mintedCredits += amountToMint;
        bool success = tokenContract.mint(recipient, amountToMint);
        require(success, "Registry: credit minting failed");

        emit CreditsMinted(projectId, recipient, amountToMint);
    }

    function getProject(uint256 projectId) external view returns (Project memory) {
        require(projects[projectId].exists, "Registry: project does not exist");
        return projects[projectId];
    }

    function getTreeData(uint256 projectId) external view returns (TreeData memory) {
        return projectTreeData[projectId];
    }
}
