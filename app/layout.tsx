import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const miniAppEmbed = {
  version: "1",
  imageUrl: "https://base-streak-arena.vercel.app/og-image-v5.png",
  button: {
    title: "Enter Arena",
    action: {
      type: "launch_miniapp",
      name: "Base Streak Arena",
      url: "https://base-streak-arena.vercel.app",
      splashImageUrl: "https://base-streak-arena.vercel.app/splash-v5.png",
      splashBackgroundColor: "#020617",
    },
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://base-streak-arena.vercel.app"),
  title: "Base Streak Arena",
  description: "Daily streak game on Base. Check in, earn XP, climb the leaderboard, and claim your onchain OG status.",
  openGraph: {
    title: "Base Streak Arena",
    description: "Build your streak. Claim your Base Arena OG status.",
    type: "website",
    images: ["/og-image-v5.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Base Streak Arena",
    description: "Build your streak. Claim your Base Arena OG status.",
    images: ["/og-image-v5.png"],
  },
  other: {
    "talentapp:project_verification": "3bac6f21603a46c0967e7000f85547a84bff80c3b89848be553299883901dde1b0fa24312d79412c489b41fac57f63ba9523bebad443c7f56e1d3256958c5525",
    "fc:miniapp": JSON.stringify(miniAppEmbed),
    "fc:frame": JSON.stringify(miniAppEmbed),
  },
};

export const viewport: Viewport = {
  themeColor: "#0052ff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
