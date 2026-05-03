// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title BaseArenaBadge
/// @notice Minimal non-transferable ERC721-style OG badge for Base Streak Arena.
/// @dev Deploy on Base Mainnet after reviewing constructor args. Free claim; users only pay gas.
contract BaseArenaBadge {
    string public name = "Base Arena OG";
    string public symbol = "BSAOG";

    address public owner;
    uint256 public totalSupply;
    string private baseTokenURI;

    mapping(address => bool) public hasClaimedOG;
    mapping(uint256 => address) private owners;
    mapping(address => uint256) private balances;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event OGBadgeClaimed(address indexed player, uint256 indexed tokenId, uint256 timestamp);
    event BaseTokenURIUpdated(string newBaseTokenURI);

    error NotOwner();
    error AlreadyClaimed();
    error Soulbound();
    error ZeroAddress();
    error TokenNotFound();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    constructor(string memory initialBaseTokenURI) {
        owner = msg.sender;
        baseTokenURI = initialBaseTokenURI;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    function claimOGBadge() external returns (uint256 tokenId) {
        if (hasClaimedOG[msg.sender]) revert AlreadyClaimed();

        tokenId = totalSupply + 1;
        totalSupply = tokenId;
        hasClaimedOG[msg.sender] = true;
        owners[tokenId] = msg.sender;
        balances[msg.sender] += 1;

        emit Transfer(address(0), msg.sender, tokenId);
        emit OGBadgeClaimed(msg.sender, tokenId, block.timestamp);
    }

    function balanceOf(address account) external view returns (uint256) {
        if (account == address(0)) revert ZeroAddress();
        return balances[account];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address tokenOwner = owners[tokenId];
        if (tokenOwner == address(0)) revert TokenNotFound();
        return tokenOwner;
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        ownerOf(tokenId);
        return string.concat(baseTokenURI, _toString(tokenId));
    }

    function setBaseTokenURI(string calldata newBaseTokenURI) external onlyOwner {
        baseTokenURI = newBaseTokenURI;
        emit BaseTokenURIUpdated(newBaseTokenURI);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        if (newOwner == address(0)) revert ZeroAddress();
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    /// @notice Soulbound badge: transfers and approvals are disabled.
    function transferFrom(address, address, uint256) external pure {
        revert Soulbound();
    }

    function safeTransferFrom(address, address, uint256) external pure {
        revert Soulbound();
    }

    function safeTransferFrom(address, address, uint256, bytes calldata) external pure {
        revert Soulbound();
    }

    function approve(address, uint256) external pure {
        revert Soulbound();
    }

    function setApprovalForAll(address, bool) external pure {
        revert Soulbound();
    }

    function getApproved(uint256) external pure returns (address) {
        return address(0);
    }

    function isApprovedForAll(address, address) external pure returns (bool) {
        return false;
    }

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return interfaceId == 0x01ffc9a7 || interfaceId == 0x80ac58cd || interfaceId == 0x5b5e139f;
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
