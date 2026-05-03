# Base Streak Arena — Paid Onchain OG Badge Deploy Guide

This build keeps the **Base Arena OG Badge** as a paid mint on Base Mainnet, but the public UI does **not** display the mint fee copy.

## Important redeploy note

The old free contract cannot be edited after deployment. To use this paid mint version, deploy a **new paid contract**, then paste the new contract address into `lib/baseArenaBadge.ts`.

Old free contract address should not be used for this paid build.

## What changed

- `contracts/BaseArenaBadge.sol`
  - Minimal soulbound ERC721-style OG badge
  - Paid mint: `0.00015 ETH` per NFT
  - Max supply: `2,000` badges
  - One mint per wallet
  - `claimOGBadge()` is `payable`
  - Owner can withdraw collected mint fees with `withdraw(address payable to)`
  - Emits `OGBadgeClaimed`
- `components/OnchainBadgeClaim.tsx`
  - Does not show mint-fee wording in the Mini App UI
  - Sends `value: 0.00015 ETH` with the mint transaction
  - Shows supply counter `claimed / 2,000`
  - Uses Base public RPC for contract reads, and Farcaster wallet provider only for wallet/transaction calls
  - Shows BaseScan + Farcaster share link after mint
- `lib/baseArenaBadge.ts`
  - Base Mainnet config
  - Contract ABI
  - Mint value constant: `0x886c98b76000`
  - Blank placeholder contract address until the new paid contract is deployed
- `public/nft/base-arena-og.png`
  - 1:1 preview image for the Base Arena OG NFT
- `app/metadata/og/[tokenId]/route.ts`
  - Dynamic NFT metadata endpoint used by `tokenURI(tokenId)`

## Recommended launch flow

1. Upload this ZIP to GitHub and let Vercel redeploy.
2. Confirm metadata/image URLs are live:

```text
https://base-streak-arena.vercel.app/metadata/og/1
https://base-streak-arena.vercel.app/nft/base-arena-og.png
```

3. Deploy the updated `contracts/BaseArenaBadge.sol` manually from Remix or your preferred deploy tool.
4. Use Base Mainnet.
5. Constructor arg:

```text
"https://base-streak-arena.vercel.app/metadata/og/"
```

For MVP, this token URI points to the included metadata route. Example token #1 metadata will be:

```text
https://base-streak-arena.vercel.app/metadata/og/1
```

The metadata image is:

```text
https://base-streak-arena.vercel.app/nft/base-arena-og.png
```

6. After deploy, read these values in Remix/BaseScan:

```text
name()        -> Base Arena OG
symbol()      -> BSAOG
MAX_SUPPLY()  -> 2000
MINT_PRICE()  -> 150000000000000 wei
```

`150000000000000 wei` = `0.00015 ETH`.

7. Copy the NEW paid contract address.
8. Open `lib/baseArenaBadge.ts` and replace:

```ts
export const BASE_ARENA_BADGE_ADDRESS = "" as const;
```

with:

```ts
export const BASE_ARENA_BADGE_ADDRESS = "0xYourNewPaidContractAddress" as const;
```

9. Commit and wait for Vercel redeploy.
10. Open the Mini App, connect wallet, and mint OG badge.

## Withdraw mint fees

Collected ETH stays in the contract until the owner withdraws.

In Remix/BaseScan, owner can call:

```text
withdraw(0xYourOwnerWalletAddress)
```

Only the contract owner can withdraw.

## Safety notes

- Never paste seed phrase/private key/OTP anywhere.
- The assistant does not need your private key.
- You manually sign deployment, mint, and withdraw transactions.
- The mint amount is fixed in ETH, so the USD value changes with ETH price.
- No guaranteed token, airdrop, profit, or reward language.
- Contract is intentionally simple for v1. If this becomes high-value, get a real review/audit before scaling.

## Verify after deploy

- New paid contract address appears in `lib/baseArenaBadge.ts`.
- Vercel build passes.
- Mini App opens in Farcaster.
- Connect wallet asks for Base Mainnet.
- Mint button creates a Base transaction with `0.00015 ETH` value.
- BaseScan shows the transaction and `OGBadgeClaimed` event.
- `tokenURI(1)` returns `https://base-streak-arena.vercel.app/metadata/og/1` after the first mint.
