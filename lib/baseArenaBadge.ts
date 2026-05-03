import { parseAbi } from "viem";

export const BASE_CHAIN_ID = 8453;
export const BASE_CHAIN_ID_HEX = "0x2105";
export const BASE_BLOCK_EXPLORER = "https://basescan.org";
export const BASE_ARENA_BADGE_MAX_SUPPLY = 2000;

// After deploying contracts/BaseArenaBadge.sol on Base Mainnet,
// paste the deployed address here, then redeploy the frontend.
export const BASE_ARENA_BADGE_ADDRESS = "0x7EC9A34C9d9d309D3Be2F261897A43297B00c2dC" as const;

export const baseArenaBadgeAbi = parseAbi([
  "function claimOGBadge() external returns (uint256 tokenId)",
  "function hasClaimedOG(address user) external view returns (bool)",
  "function totalSupply() external view returns (uint256)",
  "function MAX_SUPPLY() external view returns (uint256)",
  "event OGBadgeClaimed(address indexed player, uint256 indexed tokenId, uint256 timestamp)",
]);
