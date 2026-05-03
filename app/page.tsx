import { Flame, ShieldCheck, Zap } from "lucide-react";
import { ArenaButton } from "@/components/ArenaButton";
import { DailyArena } from "@/components/DailyArena";
import { Leaderboard } from "@/components/Leaderboard";
import { MiniAppClient } from "@/components/MiniAppClient";
import { OnchainBadgeClaim } from "@/components/OnchainBadgeClaim";
import { SeasonZeroSection } from "@/components/SeasonZeroSection";

export default function Home() {
  return (
    <main className="grid-glow min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <nav className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0052ff] shadow-[0_0_30px_rgba(0,82,255,0.55)]">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-black text-white">Base Streak Arena</p>
              <p className="text-xs text-slate-400">Season 0 preparing</p>
            </div>
          </div>
          <span className="rounded-full border border-blue-300/30 bg-blue-300/10 px-3 py-1 text-xs font-bold text-blue-100">Base Mainnet</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="arena-card rounded-[2.4rem] p-6 sm:p-8 lg:p-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
              <Zap className="h-4 w-4" /> Farcaster Mini App
            </div>
            <h1 className="neon-text text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              Build your streak. <span className="text-cyan-200">Claim your status.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Daily streak game on Base. Check in, earn XP, climb the leaderboard, and claim your
              <span className="font-bold text-white"> Base Arena OG</span> badge onchain.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ArenaButton href="#arena">Enter Arena</ArenaButton>
              <ArenaButton href="#badges" variant="secondary">View OG Benefit</ArenaButton>
            </div>
            <MiniAppClient />
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-2xl font-black text-white">+10 XP</p>
                <p className="text-sm text-slate-400">daily check-in</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-2xl font-black text-white">30 days</p>
                <p className="text-sm text-slate-400">Season 0 target</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-2xl font-black text-white">OG</p>
                <p className="text-sm text-slate-400">early status</p>
              </div>
            </div>
          </div>

          <DailyArena />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div id="badges" className="arena-card rounded-[2rem] p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-yellow-300/15 p-3 text-yellow-200">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-yellow-100">Early benefit</p>
                <h2 className="text-2xl font-black text-white">Base Arena OG</h2>
              </div>
            </div>
            <p className="leading-7 text-slate-300">
              Season 0 players can claim permanent onchain OG status on Base Mainnet. Early players may receive priority access to future seasons, badges, and community benefits.
            </p>
            <div className="mt-5 rounded-3xl border border-yellow-200/20 bg-yellow-200/10 p-5">
              <p className="text-sm font-bold text-yellow-100">OG requirements</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>• Join during Season 0</li>
                <li>• Connect wallet on Base Mainnet</li>
                <li>• Claim once per wallet</li>
                <li>• Max supply: 2,000 OG badges</li>
              </ul>
            </div>
            <OnchainBadgeClaim />
          </div>
          <Leaderboard />
        </div>

        <SeasonZeroSection />

        <footer className="pb-8 text-center text-sm text-slate-500">
          Built for Farcaster by Base Streak Arena. No guaranteed rewards. Play for status, streaks, and community benefits.
        </footer>
      </section>
    </main>
  );
}
