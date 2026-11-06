// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CarbonCreditToken (GCCC)
 * @dev ERC20-compliant token representing certified carbon credits on Ethereum.
 * Each 1.0 GCCC token represents exactly 1 metric ton of sequestered or avoided CO2 equivalent (tCO2e).
 * Built with security controls: role-based minting, pausable transfers, and permanent cryptographic retirement.
 */
contract CarbonCreditToken {
    string public name = "GreenChain Carbon Credit";
    string public symbol = "GCCC";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    address public owner;
    address public registryContract;
    bool public paused;

    // Total metric tons of carbon permanently offset/retired through burning
    uint256 public totalRetiredCredits;

    struct RetirementRecord {
        bytes32 certificateId;
        address retiree;
        string beneficiary;
        string retirementReason;
        uint256 amount;
        uint256 timestamp;
        uint256 blockNumber;
    }

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(bytes32 => RetirementRecord) public retirements;
    bytes32[] public retirementCertificateList;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Paused(address account);
    event Unpaused(address account);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event RegistryUpdated(address indexed previousRegistry, address indexed newRegistry);
    event CreditsRetired(
        address indexed retiree,
        uint256 amount,
        bytes32 indexed certificateId,
        string beneficiary,
        string reason,
        uint256 timestamp
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "GCCC: caller is not the owner");
        _;
    }

    modifier onlyAuthorizedMinter() {
        require(
            msg.sender == owner || msg.sender == registryContract,
            "GCCC: caller is not authorized to mint"
        );
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "GCCC: token operations are paused");
        _;
    }

    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "GCCC: new owner cannot be zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function setRegistryContract(address _registry) external onlyOwner {
        require(_registry != address(0), "GCCC: invalid registry address");
        emit RegistryUpdated(registryContract, _registry);
        registryContract = _registry;
    }

    function pause() external onlyOwner {
        paused = true;
        emit Paused(msg.sender);
    }

    function unpause() external onlyOwner {
        paused = false;
        emit Unpaused(msg.sender);
    }

    function transfer(address to, uint256 amount) external whenNotPaused returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        require(spender != address(0), "GCCC: approve to zero address");
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external whenNotPaused returns (bool) {
        uint256 currentAllowance = allowance[from][msg.sender];
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "GCCC: insufficient allowance");
            unchecked {
                allowance[from][msg.sender] = currentAllowance - amount;
            }
        }
        _transfer(from, to, amount);
        return true;
    }

    function mint(address to, uint256 amount) external onlyAuthorizedMinter whenNotPaused returns (bool) {
        require(to != address(0), "GCCC: cannot mint to zero address");
        require(amount > 0, "GCCC: mint amount must be greater than zero");

        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
        return true;
    }

    /**
     * @notice Permanently retires (burns) carbon credits to claim carbon neutrality.
     * @param amount Number of 18-decimal credits (tCO2e) to burn.
     * @param reason The specific purpose of retirement (e.g. "Corporate Net Zero 2026 Scope 1").
     * @param beneficiary The entity or person receiving offsetting credit.
     * @return certificateId The unique cryptographic SHA-256 hash identifying this on-chain certificate.
     */
    function retire(
        uint256 amount,
        string calldata reason,
        string calldata beneficiary
    ) external whenNotPaused returns (bytes32 certificateId) {
        require(amount > 0, "GCCC: retirement amount must be greater than 0");
        require(balanceOf[msg.sender] >= amount, "GCCC: insufficient balance to retire");
        require(bytes(beneficiary).length > 0, "GCCC: beneficiary is required");

        // Burn tokens from caller
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        totalRetiredCredits += amount;

        // Generate unique verifiable certificate hash
        certificateId = keccak256(
            abi.encodePacked(
                msg.sender,
                beneficiary,
                reason,
                amount,
                block.timestamp,
                block.number,
                totalRetiredCredits
            )
        );

        retirements[certificateId] = RetirementRecord({
            certificateId: certificateId,
            retiree: msg.sender,
            beneficiary: beneficiary,
            retirementReason: reason,
            amount: amount,
            timestamp: block.timestamp,
            blockNumber: block.number
        });

        retirementCertificateList.push(certificateId);

        emit Transfer(msg.sender, address(0), amount);
        emit CreditsRetired(
            msg.sender,
            amount,
            certificateId,
            beneficiary,
            reason,
            block.timestamp
        );

        return certificateId;
    }

    function getRetirementCertificate(bytes32 certificateId)
        external
        view
        returns (RetirementRecord memory)
    {
        require(retirements[certificateId].timestamp > 0, "GCCC: certificate does not exist");
        return retirements[certificateId];
    }

    function totalCertificatesIssued() external view returns (uint256) {
        return retirementCertificateList.length;
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "GCCC: transfer from zero address");
        require(to != address(0), "GCCC: transfer to zero address");
        require(balanceOf[from] >= amount, "GCCC: transfer amount exceeds balance");

        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
    }
}

