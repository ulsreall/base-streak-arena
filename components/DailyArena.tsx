"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarCheck2, Flame, Share2, Sparkles, Trophy, Zap } from "lucide-react";

const APP_URL = "https://base-streak-arena.vercel.app";
const STORAGE_KEY = "base-streak-arena:season0-player";
const DAY_MS = 24 * 60 * 60 * 1000;

type PlayerState = {
  xp: number;
  streak: number;
  bestStreak: number;
  checkIns: number;
  lastCheckIn: string | null;
  createdAt: string;
};

const defaultState = (): PlayerState => ({
  xp: 0,
  streak: 0,
  bestStreak: 0,
  checkIns: 0,
  lastCheckIn: null,
  createdAt: new Date().toISOString(),
});

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  const start = new Date(`${a}T00:00:00.000Z`).getTime();
  const end = new Date(`${b}T00:00:00.000Z`).getTime();
  return Math.round((end - start) / DAY_MS);
}

function loadState(): PlayerState {
  if (typeof window === "undefined") return defaultState();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<PlayerState>;
    return {
      xp: Number(parsed.xp ?? 0),
      streak: Number(parsed.streak ?? 0),
      bestStreak: Number(parsed.bestStreak ?? 0),
      checkIns: Number(parsed.checkIns ?? 0),
      lastCheckIn: parsed.lastCheckIn ?? null,
      createdAt: parsed.createdAt ?? new Date().toISOString(),
    };
  } catch {
    return defaultState();
  }
}

function saveState(state: PlayerState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("base-streak-arena:player-updated", { detail: state }));
}

export function DailyArena() {
  const [player, setPlayer] = useState<PlayerState>(() => defaultState());
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("Season 0 is live. Check in once per day — no gas needed.");

  useEffect(() => {
    const state = loadState();
    setPlayer(state);
    setLoaded(true);
  }, []);

  const today = todayKey();
  const checkedToday = player.lastCheckIn === today;
  const nextReward = checkedToday ? 0 : 10 + Math.min(player.streak, 10);

  const rankLabel = useMemo(() => {
    if (player.xp >= 300) return "Arena Veteran";
    if (player.xp >= 150) return "Streak Builder";
    if (player.xp >= 50) return "Season 0 Player";
    return "Fresh Player";
  }, [player.xp]);

  function checkIn() {
    if (!loaded) return;

    if (checkedToday) {
      setMessage("Udah check-in hari ini bang. Balik lagi besok buat lanjutin streak.");
      return;
    }

    const diff = player.lastCheckIn ? daysBetween(player.lastCheckIn, today) : 0;
    const newStreak = !player.lastCheckIn || diff === 1 ? player.streak + 1 : 1;
    const reward = 10 + Math.min(newStreak - 1, 10);
    const next: PlayerState = {
      ...player,
      xp: player.xp + reward,
      streak: newStreak,
      bestStreak: Math.max(player.bestStreak, newStreak),
      checkIns: player.checkIns + 1,
      lastCheckIn: today,
    };

    saveState(next);
    setPlayer(next);
    setMessage(`Check-in locked 🔥 +${reward} XP. Streak lu sekarang Day ${newStreak}.`);
  }

  const shareText = `I just hit Day ${Math.max(player.streak, 1)} streak on Base Streak Arena 🔵🔥\n\n${player.xp} XP earned in Season 0.\nBase Arena OG is live on Base.\n\nNo guaranteed rewards — just proof you were early.`;
  const shareUrl = `https://farcaster.xyz/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(APP_URL)}`;

  return (
    <div id="arena" className="arena-card rounded-[2.4rem] p-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">gm, player</p>
            <h2 className="mt-1 text-3xl font-black text-white">Arena Dashboard</h2>
          </div>
          <div className="rounded-2xl bg-orange-400/15 p-3 text-orange-200">
            <Flame className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50">
          <div className="mb-2 flex items-center gap-2 font-black uppercase tracking-[0.18em] text-cyan-100">
            <CalendarCheck2 className="h-4 w-4" /> Daily Check-in
          </div>
          {message}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Streak</p>
            <p className="mt-2 text-3xl font-black text-white">{player.streak}d</p>
            <p className="text-xs text-orange-200">Best: {player.bestStreak}d</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">XP</p>
            <p className="mt-2 text-3xl font-black text-white">{player.xp}</p>
            <p className="text-xs text-cyan-200">Next: +{nextReward} XP</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Check-ins</p>
            <p className="mt-2 text-3xl font-black text-white">{player.checkIns}</p>
            <p className="text-xs text-slate-400">Season 0 logs</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Rank</p>
            <p className="mt-2 text-lg font-black text-white">{rankLabel}</p>
            <p className="text-xs text-slate-400">local score</p>
          </div>
        </div>

        <button
          onClick={checkIn}
          disabled={checkedToday}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0052ff] px-5 py-4 text-sm font-black text-white shadow-[0_0_36px_rgba(0,82,255,0.42)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300 disabled:shadow-none"
        >
          {checkedToday ? <Sparkles className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
          {checkedToday ? "CHECKED IN TODAY" : "CHECK IN TODAY"}
        </button>

        <a
          href={shareUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-300/25 bg-cyan-300/10 px-5 py-4 text-sm font-black text-cyan-100 transition hover:bg-cyan-300/15"
        >
          <Share2 className="h-4 w-4" />
          Share streak to Farcaster
        </a>

        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-300/15 bg-emerald-300/10 p-4 text-xs leading-5 text-emerald-50">
          <Trophy className="mt-0.5 h-4 w-4 shrink-0" />
          Check-in ini offchain dulu pakai localStorage, jadi user gak bayar gas harian. Onchain action tetap OG Badge claim sekali aja.
        </div>
      </div>
    </div>
  );
}
