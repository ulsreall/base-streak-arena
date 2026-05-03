// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title BaseArenaBadge
/// @notice Minimal MVP contract spec for Base Streak Arena OG/season records.
/// @dev This is a starter contract draft. Audit/review before Base Mainnet deployment.
contract BaseArenaBadge {
    address public owner;
    uint256 public constant OG_BADGE_ID = 1;

    mapping(address => bool) public hasClaimedOG;
    mapping(uint256 => mapping(address => bool)) public hasClaimedSeasonBadge;
    mapping(uint256 => mapping(address => uint256)) public seasonScores;

    event OGBadgeClaimed(address indexed player, uint256 indexed badgeId, uint256 timestamp);
    event SeasonScoreSaved(address indexed player, uint256 indexed seasonId, uint256 score, uint256 timestamp);
    event SeasonBadgeClaimed(address indexed player, uint256 indexed seasonId, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "NOT_OWNER");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function claimOGBadge() external {
        require(!hasClaimedOG[msg.sender], "OG_ALREADY_CLAIMED");
        hasClaimedOG[msg.sender] = true;
        emit OGBadgeClaimed(msg.sender, OG_BADGE_ID, block.timestamp);
    }

    function saveSeasonScore(address player, uint256 seasonId, uint256 score) external onlyOwner {
        seasonScores[seasonId][player] = score;
        emit SeasonScoreSaved(player, seasonId, score, block.timestamp);
    }

    function claimSeasonBadge(uint256 seasonId) external {
        require(!hasClaimedSeasonBadge[seasonId][msg.sender], "SEASON_BADGE_ALREADY_CLAIMED");
        require(seasonScores[seasonId][msg.sender] > 0, "NO_SEASON_SCORE");
        hasClaimedSeasonBadge[seasonId][msg.sender] = true;
        emit SeasonBadgeClaimed(msg.sender, seasonId, block.timestamp);
    }
}
