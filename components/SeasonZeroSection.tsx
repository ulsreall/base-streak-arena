import { CheckCircle2, ShieldCheck, Trophy } from "lucide-react";
import { SeasonZeroStats } from "@/components/SeasonZeroStats";

export function SeasonZeroSection() {
  return (
    <section id="season-0" className="arena-card rounded-[2.4rem] p-6 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-cyan-200">Season 0</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">How to enter the Arena</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Season 0 is the first public run of Base Streak Arena. Check in daily, build XP, share your streak, and mint the limited Base Arena OG badge on Base Mainnet.
          </p>
        </div>
        <div className="rounded-2xl border border-yellow-300/25 bg-yellow-300/10 px-4 py-3 text-sm font-black text-yellow-100">
          2,000 OG badges only
        </div>
      </div>

      <SeasonZeroStats />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-4 inline-flex rounded-2xl bg-blue-300/15 p-3 text-blue-100">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-black text-white">1. Check in daily</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">Daily check-in is offchain/local first, so no daily gas. Your streak and XP live in your browser for this MVP.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-4 inline-flex rounded-2xl bg-yellow-300/15 p-3 text-yellow-100">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-black text-white">2. Mint OG badge</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">One wallet can mint once. Max supply is 2,000 Base Arena OG badges.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-4 inline-flex rounded-2xl bg-orange-300/15 p-3 text-orange-100">
            <Trophy className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-black text-white">3. Share streak</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">Share your Day streak to Farcaster and bring more players into Season 0. Leaderboard global comes after soft launch.</p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-red-300/15 bg-red-300/10 p-5 text-sm leading-7 text-red-50">
        <p className="font-black uppercase tracking-[0.2em] text-red-100">Rules & Safety</p>
        <ul className="mt-3 space-y-2 text-slate-300">
          <li>• No guaranteed airdrop, token, profit, or reward.</li>
          <li>• OG badge is a Season 0 status badge and early-player proof.</li>
          <li>• Daily check-in is free/offchain; onchain action is only the OG badge mint.</li>
          <li>• Never share seed phrase, private key, OTP, or wallet password.</li>
        </ul>
      </div>
    </section>
  );
}
