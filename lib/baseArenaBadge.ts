import { parseAbi } from "viem";

export const BASE_CHAIN_ID = 8453;
export const BASE_CHAIN_ID_HEX = "0x2105";
export const BASE_BLOCK_EXPLORER = "https://basescan.org";

// After deploying contracts/BaseArenaBadge.sol on Base Mainnet,
// paste the deployed address here, then redeploy the frontend.
export const BASE_ARENA_BADGE_ADDRESS = "" as `0x${string}` | "";

export const baseArenaBadgeAbi = parseAbi([
  "function claimOGBadge() external returns (uint256 tokenId)",
  "function hasClaimedOG(address user) external view returns (bool)",
  "function totalSupply() external view returns (uint256)",
  "event OGBadgeClaimed(address indexed player, uint256 indexed tokenId, uint256 timestamp)",
]);
