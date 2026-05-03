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
        "A limited soulbound early-player badge for Base Streak Arena — only 2,000 Base Arena OG badges for Season 0 players.",
      image: `${APP_URL}/nft/base-arena-og.png`,
      external_url: APP_URL,
      attributes: [
        { trait_type: "App", value: "Base Streak Arena" },
        { trait_type: "Badge", value: "Base Arena OG" },
        { trait_type: "Chain", value: "Base Mainnet" },
        { trait_type: "Transferability", value: "Soulbound" },
        { trait_type: "Season", value: "Season 0" },
        { trait_type: "Status", value: "Early Player" },
        { trait_type: "Max Supply", value: "2000" }
      ]
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300"
      }
    }
  );
}
