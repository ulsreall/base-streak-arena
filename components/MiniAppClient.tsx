"use client";

import { useEffect, useState } from "react";
import { Share2, CheckCircle2 } from "lucide-react";

const APP_URL = "https://base-streak-arena.vercel.app";
const SHARE_TEXT = "I joined Base Streak Arena Season 0 🔵🔥 Build your streak, earn XP, and claim Base Arena OG status.";

export function MiniAppClient() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    import("@farcaster/miniapp-sdk")
      .then(({ sdk }) => sdk.actions.ready())
      .then(() => { if (mounted) setReady(true); })
      .catch(() => { if (mounted) setReady(false); });
    return () => { mounted = false; };
  }, []);

  const shareUrl = `https://farcaster.xyz/~/compose?text=${encodeURIComponent(SHARE_TEXT)}&embeds[]=${encodeURIComponent(APP_URL)}`;

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
      <a
        href={shareUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-3 text-sm font-black text-cyan-100 transition hover:bg-cyan-300/15"
      >
        <Share2 className="h-4 w-4" />
        Share to Farcaster
      </a>
      <div className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-bold text-emerald-100">
        <CheckCircle2 className="h-4 w-4" />
        {ready ? "Mini App ready" : "Web preview ready"}
      </div>
    </div>
  );
}
