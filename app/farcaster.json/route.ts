const manifest = {
  "accountAssociation": {
    "header": "eyJmaWQiOjI1MDU0MSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDA2MjY4MTIyMTI3OWZFMzRmYzYwYzZEMzFiM2Q0NURGZDdBODI5NzMifQ",
    "payload": "eyJkb21haW4iOiJiYXNlLXN0cmVhay1hcmVuYS52ZXJjZWwuYXBwIn0",
    "signature": "RJ+HkCNroYmn52BXseCBDv/LSClED6EE7tGSP27Ehfdn2KFvjXpiJmQwxHDJDhBOilRryWpjbhZ9ungnQ0OzGRw="
  },
  "miniapp": {
    "version": "1",
    "name": "Base Streak Arena",
    "homeUrl": "https://base-streak-arena.vercel.app",
    "iconUrl": "https://base-streak-arena.vercel.app/icon.png",
    "splashImageUrl": "https://base-streak-arena.vercel.app/splash.png",
    "splashBackgroundColor": "#020617",
    "subtitle": "Daily Base streaks",
    "description": "Check in daily, earn XP, climb the leaderboard, and claim Base Arena OG status onchain.",
    "primaryCategory": "games",
    "tags": [
      "base",
      "streak",
      "game",
      "leaderboard",
      "badges"
    ],
    "heroImageUrl": "https://base-streak-arena.vercel.app/og-image.png",
    "tagline": "Build your streak",
    "ogTitle": "Base Streak Arena",
    "ogDescription": "Daily streak game on Base with XP, leaderboard, and OG status.",
    "ogImageUrl": "https://base-streak-arena.vercel.app/og-image.png",
    "requiredChains": [
      "eip155:8453"
    ],
    "requiredCapabilities": [
      "wallet.getEthereumProvider"
    ]
  }
};

export function GET() {
  return Response.json(manifest, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
