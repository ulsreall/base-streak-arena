const players = [
  { rank: 1, name: "mancingdao.eth", xp: "2,450", streak: "12d", status: "Base Arena OG" },
  { rank: 2, name: "basebro.eth", xp: "2,180", streak: "10d", status: "Season 0" },
  { rank: 3, name: "onchaincat.eth", xp: "1,940", streak: "9d", status: "Season 0" },
  { rank: 4, name: "0x7a...91c", xp: "1,620", streak: "7d", status: "Challenger" },
];

export function Leaderboard() {
  return (
    <div className="arena-card rounded-[2rem] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Leaderboard</p>
          <h2 className="mt-2 text-2xl font-black text-white">Season 0 Arena</h2>
        </div>
        <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">Live soon</span>
      </div>
      <div className="space-y-3">
        {players.map((p) => (
          <div key={p.rank} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0052ff]/20 font-black text-cyan-100">#{p.rank}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-white">{p.name}</p>
              <p className="text-xs text-slate-400">{p.status}</p>
            </div>
            <div className="text-right">
              <p className="font-black text-white">{p.xp} XP</p>
              <p className="text-xs text-orange-200">🔥 {p.streak}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
