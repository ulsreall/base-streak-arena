"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "base-streak-arena:season0-player";

type PlayerState = {
  xp: number;
  streak: number;
  bestStreak: number;
  checkIns: number;
  lastCheckIn: string | null;
};

const starterPlayers = [
  { rank: 1, name: "mancingdao.eth", xp: 10, streak: 1, status: "Base Arena OG #1" },
  { rank: 2, name: "basebro.eth", xp: 0, streak: 0, status: "Waiting for Season 0" },
  { rank: 3, name: "onchaincat.eth", xp: 0, streak: 0, status: "Waiting for Season 0" },
];

function readLocalPlayer() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PlayerState;
    return {
      rank: 0,
      name: "You / local player",
      xp: Number(parsed.xp ?? 0),
      streak: Number(parsed.streak ?? 0),
      status: parsed.xp > 0 ? "Season 0 active" : "Ready to check in",
    };
  } catch {
    return null;
  }
}

export function Leaderboard() {
  const [localPlayer, setLocalPlayer] = useState<ReturnType<typeof readLocalPlayer>>(null);

  useEffect(() => {
    const update = () => setLocalPlayer(readLocalPlayer());
    update();
    window.addEventListener("base-streak-arena:player-updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("base-streak-arena:player-updated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const players = [...starterPlayers, ...(localPlayer ? [localPlayer] : [])]
    .sort((a, b) => b.xp - a.xp || b.streak - a.streak)
    .map((player, index) => ({ ...player, rank: index + 1 }));

  return (
    <div className="arena-card rounded-[2rem] p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Leaderboard</p>
          <h2 className="mt-2 text-2xl font-black text-white">Season 0 Arena</h2>
        </div>
        <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-100">Local live</span>
      </div>

      <div className="mb-4 rounded-2xl border border-blue-300/15 bg-blue-300/10 p-4 text-sm leading-6 text-slate-300">
        Launch MVP: skor disimpan lokal dulu biar user bisa main tanpa login/database. Supabase leaderboard global bisa masuk next build setelah soft launch stabil.
      </div>

      <div className="space-y-3">
        {players.map((p) => (
          <div key={`${p.name}-${p.rank}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0052ff]/20 font-black text-cyan-100">#{p.rank}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-white">{p.name}</p>
              <p className="text-xs text-slate-400">{p.status}</p>
            </div>
            <div className="text-right">
              <p className="font-black text-white">{p.xp.toLocaleString()} XP</p>
              <p className="text-xs text-orange-200">🔥 {p.streak}d</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
