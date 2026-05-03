# Base Streak Arena

Daily streak game on Base. Check in, earn XP, climb the leaderboard, and claim your onchain OG status.

## MVP

- Futuristic Arcade x Base Blue landing page
- Arena dashboard mock
- XP + streak concept
- Season 0 leaderboard mock
- Base Arena OG badge section
- Starter Solidity contract draft for OG badge / season score records

## Stack

- Next.js
- Tailwind CSS
- Farcaster Mini App SDK
- Wagmi + Viem
- Solidity
- Vercel
- Base Mainnet target

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Safety

No private keys, seed phrases, wallet passwords, or deployment secrets belong in this repo. All wallet signing and Base Mainnet deployment steps must be done manually by the project owner.


## Farcaster Mini App v2

This build adds:

- `public/.well-known/farcaster.json` Mini App manifest draft
- Open Graph image assets
- Mini App SDK `sdk.actions.ready()` client bootstrap
- Farcaster share button

### Important publishing note

The manifest currently includes Mini App metadata only. For official discovery/publishing, generate the signed `accountAssociation` from Farcaster Developer Tools and add it to `public/.well-known/farcaster.json`, or use Farcaster hosted manifests. Do not paste private keys or wallet secrets into this repo.
