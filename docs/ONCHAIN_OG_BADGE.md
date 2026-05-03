# Base Streak Arena — Onchain OG Badge Deploy Guide

This build adds the first real onchain action: **Base Arena OG Badge** claim on Base Mainnet.

## What changed

- `contracts/BaseArenaBadge.sol`
  - Minimal soulbound ERC721-style OG badge
  - Free claim, user only pays gas
  - One claim per wallet
  - Emits `OGBadgeClaimed`
- `components/OnchainBadgeClaim.tsx`
  - Connect wallet via Farcaster Mini App provider / browser wallet fallback
  - Switch/add Base Mainnet
  - Check `hasClaimedOG(address)`
  - Send `claimOGBadge()` transaction
  - Show BaseScan + Farcaster share link
- `lib/baseArenaBadge.ts`
  - Base Mainnet config
  - Contract ABI
  - Placeholder contract address

## Recommended launch flow

1. Upload this ZIP to GitHub and let Vercel redeploy.
2. Deploy `contracts/BaseArenaBadge.sol` manually from Remix or your preferred deploy tool.
3. Use Base Mainnet.
4. Constructor arg example:

```text
https://base-streak-arena.vercel.app/metadata/og/
```

For MVP, this token URI can be updated later with `setBaseTokenURI()`.

5. Copy the deployed contract address.
6. Open `lib/baseArenaBadge.ts` and replace:

```ts
export const BASE_ARENA_BADGE_ADDRESS = "" as `0x${string}` | "";
```

with:

```ts
export const BASE_ARENA_BADGE_ADDRESS = "0xYourDeployedContractAddress" as `0x${string}`;
```

7. Commit and wait for Vercel redeploy.
8. Open the Mini App, connect wallet, and claim OG badge.

## Safety notes

- Never paste seed phrase/private key/OTP anywhere.
- The assistant does not need your private key.
- You manually sign deployment and claim transactions.
- No guaranteed token, airdrop, or profit language.
- Contract is intentionally simple for v1. If this becomes high-value, get a real review/audit before scaling.

## Verify after deploy

- Contract address appears in `lib/baseArenaBadge.ts`.
- Vercel build passes.
- Mini App opens in Farcaster.
- Connect wallet asks for Base Mainnet.
- Claim button creates a Base transaction.
- BaseScan shows the transaction and `OGBadgeClaimed` event.
