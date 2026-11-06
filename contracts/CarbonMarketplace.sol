// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20Carbon {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function retire(uint256 amount, string calldata reason, string calldata beneficiary) external returns (bytes32);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title CarbonMarketplace
 * @dev Secure peer-to-peer and project-to-buyer decentralized marketplace for certified carbon credits.
 * Supports direct purchases as well as instant one-click buy-and-retire execution.
 */
contract CarbonMarketplace {
    IERC20Carbon public immutable creditToken;
    address public owner;
    uint256 public feeBasisPoints; // e.g. 100 = 1% platform fee for ecosystem conservation
    address public feeRecipient;
    uint256 public listingCounter;

    bool private _locked; // Reentrancy lock

    struct Listing {
        uint256 listingId;
        uint256 projectId;
        address seller;
        uint256 amountAvailable;     // In 18-decimal token units
        uint256 pricePerCreditWei;   // Price for 1.0 metric ton (10^18 units) in Wei
        string vintage;
        string projectName;
        bool active;
    }

    mapping(uint256 => Listing) public listings;

    event ListingCreated(
        uint256 indexed listingId,
        uint256 indexed projectId,
        address indexed seller,
        uint256 amount,
        uint256 pricePerCreditWei,
        string vintage,
        string projectName
    );
    event ListingCancelled(uint256 indexed listingId, address indexed seller);
    event CreditsPurchased(
        uint256 indexed listingId,
        address indexed buyer,
        address indexed seller,
        uint256 amount,
        uint256 totalCostWei
    );
    event DirectRetirementCompleted(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 amount,
        bytes32 indexed certificateId,
        string beneficiary
    );

    modifier nonReentrant() {
        require(!_locked, "Marketplace: reentrant call");
        _locked = true;
        _;
        _locked = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Marketplace: not owner");
        _;
    }

    constructor(address _creditToken, address _feeRecipient) {
        require(_creditToken != address(0), "Marketplace: invalid token");
        creditToken = IERC20Carbon(_creditToken);
        owner = msg.sender;
        feeRecipient = _feeRecipient != address(0) ? _feeRecipient : msg.sender;
        feeBasisPoints = 100; // 1%
    }

    function setFee(uint256 _feeBasisPoints, address _recipient) external onlyOwner {
        require(_feeBasisPoints <= 500, "Marketplace: fee cannot exceed 5%");
        feeBasisPoints = _feeBasisPoints;
        feeRecipient = _recipient;
    }

    /**
     * @notice List verified carbon credits for sale on the marketplace
     */
    function listCredits(
        uint256 projectId,
        uint256 amount,
        uint256 pricePerCreditWei,
        string calldata vintage,
        string calldata projectName
    ) external nonReentrant returns (uint256) {
        require(amount > 0, "Marketplace: amount must be > 0");
        require(pricePerCreditWei > 0, "Marketplace: price must be > 0");

        // Transfer tokens into escrow in the marketplace contract
        bool success = creditToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Marketplace: token escrow transfer failed");

        listingCounter++;
        uint256 listingId = listingCounter;

        listings[listingId] = Listing({
            listingId: listingId,
            projectId: projectId,
            seller: msg.sender,
            amountAvailable: amount,
            pricePerCreditWei: pricePerCreditWei,
            vintage: vintage,
            projectName: projectName,
            active: true
        });

        emit ListingCreated(listingId, projectId, msg.sender, amount, pricePerCreditWei, vintage, projectName);
        return listingId;
    }

    /**
     * @notice Cancel an active listing and withdraw remaining escrowed credits
     */
    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Marketplace: listing not active");
        require(listing.seller == msg.sender || msg.sender == owner, "Marketplace: unauthorized");

        listing.active = false;
        uint256 refundAmount = listing.amountAvailable;
        listing.amountAvailable = 0;

        bool success = creditToken.transfer(listing.seller, refundAmount);
        require(success, "Marketplace: token refund failed");

        emit ListingCancelled(listingId, listing.seller);
    }

    /**
     * @notice Buy carbon credits from an active listing
     */
    function buyCredits(uint256 listingId, uint256 amount) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Marketplace: listing inactive");
        require(amount > 0 && amount <= listing.amountAvailable, "Marketplace: invalid amount");

        // Calculate total cost in Wei: (amount * pricePerCreditWei) / 10^18
        uint256 totalCost = (amount * listing.pricePerCreditWei) / 10**18;
        require(msg.value >= totalCost, "Marketplace: insufficient ETH payment");

        listing.amountAvailable -= amount;
        if (listing.amountAvailable == 0) {
            listing.active = false;
        }

        uint256 fee = (totalCost * feeBasisPoints) / 10000;
        uint256 sellerProceeds = totalCost - fee;

        // Transfer tokens to buyer
        bool tokenSuccess = creditToken.transfer(msg.sender, amount);
        require(tokenSuccess, "Marketplace: token transfer to buyer failed");

        // Pay seller and fee recipient
        if (fee > 0) {
            (bool feeSuccess, ) = payable(feeRecipient).call{value: fee}("");
            require(feeSuccess, "Marketplace: fee transfer failed");
        }
        (bool paySuccess, ) = payable(listing.seller).call{value: sellerProceeds}("");
        require(paySuccess, "Marketplace: seller payment failed");

        // Refund any overpayment
        if (msg.value > totalCost) {
            (bool refundSuccess, ) = payable(msg.sender).call{value: msg.value - totalCost}("");
            require(refundSuccess, "Marketplace: excess refund failed");
        }

        emit CreditsPurchased(listingId, msg.sender, listing.seller, amount, totalCost);
    }

    /**
     * @notice Buy and immediately retire credits to offset carbon footprint in one transaction
     */
    function buyAndRetireCredits(
        uint256 listingId,
        uint256 amount,
        string calldata beneficiary,
        string calldata retirementReason
    ) external payable nonReentrant returns (bytes32 certificateId) {
        Listing storage listing = listings[listingId];
        require(listing.active, "Marketplace: listing inactive");
        require(amount > 0 && amount <= listing.amountAvailable, "Marketplace: invalid amount");

        uint256 totalCost = (amount * listing.pricePerCreditWei) / 10**18;
        require(msg.value >= totalCost, "Marketplace: insufficient ETH payment");

        listing.amountAvailable -= amount;
        if (listing.amountAvailable == 0) {
            listing.active = false;
        }

        uint256 fee = (totalCost * feeBasisPoints) / 10000;
        uint256 sellerProceeds = totalCost - fee;

        // Perform instant retirement from contract custody on behalf of beneficiary
        certificateId = creditToken.retire(amount, retirementReason, beneficiary);

        if (fee > 0) {
            (bool feeSuccess, ) = payable(feeRecipient).call{value: fee}("");
            require(feeSuccess, "Marketplace: fee transfer failed");
        }
        (bool paySuccess, ) = payable(listing.seller).call{value: sellerProceeds}("");
        require(paySuccess, "Marketplace: seller payment failed");

        if (msg.value > totalCost) {
            (bool refundSuccess, ) = payable(msg.sender).call{value: msg.value - totalCost}("");
            require(refundSuccess, "Marketplace: excess refund failed");
        }

        emit CreditsPurchased(listingId, msg.sender, listing.seller, amount, totalCost);
        emit DirectRetirementCompleted(listingId, msg.sender, amount, certificateId, beneficiary);

        return certificateId;
    }

    function getListing(uint256 listingId) external view returns (Listing memory) {
        return listings[listingId];
    }
}

