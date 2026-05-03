const APP_URL = "https://base-streak-arena.vercel.app";

type RouteContext = {
  params: Promise<{ tokenId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { tokenId } = await context.params;
  const cleanTokenId = /^\d+$/.test(tokenId) ? tokenId : "1";

  return Response.json(
    {
      name: `Base Arena OG #${cleanTokenId}`,
      description:
        "A soulbound early-player badge for Base Streak Arena — the Farcaster Mini App for daily Base streaks, XP, leaderboard status, and onchain OG proof.",
      image: `${APP_URL}/nft/base-arena-og.png`,
      external_url: APP_URL,
      attributes: [
        { trait_type: "App", value: "Base Streak Arena" },
        { trait_type: "Badge", value: "Base Arena OG" },
        { trait_type: "Chain", value: "Base Mainnet" },
        { trait_type: "Transferability", value: "Soulbound" },
        { trait_type: "Season", value: "Season 0" },
        { trait_type: "Status", value: "Early Player" }
      ]
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300"
      }
    }
  );
}
