"use client";

import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import {
  BASE_ARENA_BADGE_ADDRESS,
  BASE_ARENA_BADGE_MAX_SUPPLY,
  baseArenaBadgeAbi,
} from "@/lib/baseArenaBadge";

const publicClient = createPublicClient({
  chain: base,
  transport: http("https://mainnet.base.org"),
});

export function SeasonZeroStats() {
  const [claimed, setClaimed] = useState<number | null>(null);
  const hasContract = BASE_ARENA_BADGE_ADDRESS.startsWith("0x") && BASE_ARENA_BADGE_ADDRESS.length === 42;
  const contractAddress = hasContract ? (BASE_ARENA_BADGE_ADDRESS as `0x${string}`) : undefined;

  useEffect(() => {
    if (!contractAddress) return;

    let cancelled = false;
    publicClient
      .readContract({
        address: contractAddress,
        abi: baseArenaBadgeAbi,
        functionName: "totalSupply",
      })
      .then((supply) => {
        if (!cancelled) setClaimed(Number(supply));
      })
      .catch(() => {
        if (!cancelled) setClaimed(null);
      });

    return () => {
      cancelled = true;
    };
  }, [contractAddress]);

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      <div className="rounded-3xl border border-blue-300/20 bg-blue-300/10 p-5">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-100">OG claimed</p>
        <p className="mt-3 text-3xl font-black text-white">
          {claimed === null ? "Loading" : claimed.toLocaleString()}
          <span className="text-base text-slate-400"> / {BASE_ARENA_BADGE_MAX_SUPPLY.toLocaleString()}</span>
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-400">Live from Base Mainnet contract.</p>
      </div>
      <div className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-5">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-100">Daily loop</p>
        <p className="mt-3 text-3xl font-black text-white">No gas</p>
        <p className="mt-2 text-xs leading-5 text-slate-400">XP and streak are saved locally for launch MVP.</p>
      </div>
      <div className="rounded-3xl border border-purple-300/20 bg-purple-300/10 p-5">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-purple-100">Leaderboard</p>
        <p className="mt-3 text-3xl font-black text-white">Supabase next</p>
        <p className="mt-2 text-xs leading-5 text-slate-400">Schema planned for wallet, Farcaster user, XP, streak.</p>
      </div>
    </div>
  );
}
