type StatCardProps = { label: string; value: string; note?: string; };

export function StatCard({ label, value, note }: StatCardProps) {
  return (
    <div className="arena-card rounded-3xl p-5">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
      {note ? <p className="mt-2 text-sm text-slate-400">{note}</p> : null}
    </div>
  );
}
