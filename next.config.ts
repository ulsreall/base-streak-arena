import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/.well-known/farcaster.json",
        destination: "/farcaster.json",
      },
    ];
  },
};

export default nextConfig;
