import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Base Streak Arena",
  description: "Daily streak game on Base. Check in, earn XP, climb the leaderboard, and claim your onchain OG status.",
  openGraph: {
    title: "Base Streak Arena",
    description: "Build your streak. Claim your Base Arena OG status.",
    type: "website",
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
