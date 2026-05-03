import Link from "next/link";
import type { ReactNode } from "react";

type ArenaButtonProps = { href?: string; children: ReactNode; variant?: "primary" | "secondary"; };

export function ArenaButton({ href, children, variant = "primary" }: ArenaButtonProps) {
  const cls = variant === "primary"
    ? "bg-[#0052ff] text-white shadow-[0_0_36px_rgba(0,82,255,0.42)] hover:bg-[#1f66ff]"
    : "border border-white/15 bg-white/5 text-slate-100 hover:bg-white/10";
  const base = `inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold transition ${cls}`;
  if (href) return <Link className={base} href={href}>{children}</Link>;
  return <button className={base}>{children}</button>;
}
