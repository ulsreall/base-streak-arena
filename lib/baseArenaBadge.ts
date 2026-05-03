import { parseAbi } from "viem";

export const BASE_CHAIN_ID = 8453;
export const BASE_CHAIN_ID_HEX = "0x2105";
export const BASE_BLOCK_EXPLORER = "https://basescan.org";
export const BASE_ARENA_BADGE_MAX_SUPPLY = 2000;
export const BASE_ARENA_BADGE_MINT_PRICE_ETH = "0.00015";
export const BASE_ARENA_BADGE_MINT_PRICE_WEI_HEX = "0x886c98b76000";

// IMPORTANT: paid mint requires deploying the updated payable contract.
// After deploying contracts/BaseArenaBadge.sol on Base Mainnet,
// paste the NEW deployed paid-contract address here, then redeploy the frontend.
export const BASE_ARENA_BADGE_ADDRESS = "0xda63914D2cF06563E4e6357a3d5bB5A8d8577338" as const;

export const baseArenaBadgeAbi = parseAbi([
  "function claimOGBadge() external payable returns (uint256 tokenId)",
  "function hasClaimedOG(address user) external view returns (bool)",
  "function totalSupply() external view returns (uint256)",
  "function MAX_SUPPLY() external view returns (uint256)",
  "function MINT_PRICE() external view returns (uint256)",
  "function withdraw(address to) external",
  "event OGBadgeClaimed(address indexed player, uint256 indexed tokenId, uint256 timestamp)",
]);
