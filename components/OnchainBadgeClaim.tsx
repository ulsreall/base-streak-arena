"use client";

import { useMemo, useState } from "react";
import { Award, CheckCircle2, ExternalLink, Loader2, PlugZap, ShieldCheck } from "lucide-react";
import { createPublicClient, custom, encodeFunctionData, http, type EIP1193Provider } from "viem";
import { base } from "viem/chains";
import {
  BASE_ARENA_BADGE_ADDRESS,
  BASE_BLOCK_EXPLORER,
  BASE_CHAIN_ID_HEX,
  baseArenaBadgeAbi,
} from "@/lib/baseArenaBadge";

type ClaimState = "idle" | "connecting" | "checking" | "switching" | "claiming" | "success" | "error";

const fallbackPublicClient = createPublicClient({
  chain: base,
  transport: http("https://mainnet.base.org"),
});

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

async function getMiniAppProvider(): Promise<EIP1193Provider | undefined> {
  try {
    const { sdk } = await import("@farcaster/miniapp-sdk");
    const provider = await sdk.wallet.getEthereumProvider();
    if (provider) return provider as EIP1193Provider;
  } catch {
    // Browser preview fallback below.
  }

  if (typeof window !== "undefined") {
    const maybeWindow = window as Window & { ethereum?: EIP1193Provider };
    return maybeWindow.ethereum;
  }

  return undefined;
}

export function OnchainBadgeClaim() {
  const [state, setState] = useState<ClaimState>("idle");
  const [account, setAccount] = useState<`0x${string}` | null>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);
  const [message, setMessage] = useState("Connect wallet to check OG badge eligibility.");

  const hasContract = BASE_ARENA_BADGE_ADDRESS.startsWith("0x") && BASE_ARENA_BADGE_ADDRESS.length === 42;
  const contractAddress = hasContract ? (BASE_ARENA_BADGE_ADDRESS as `0x${string}`) : undefined;

  const txUrl = useMemo(() => (txHash ? `${BASE_BLOCK_EXPLORER}/tx/${txHash}` : null), [txHash]);
  const shareUrl = useMemo(() => {
    const text = txHash
      ? `I just claimed Base Arena OG on Base Streak Arena 🔵🔥\n\nOnchain status secured on Base.\n${txUrl}`
      : "I am joining Base Streak Arena Season 0 🔵🔥";
    return `https://farcaster.xyz/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent("https://base-streak-arena.vercel.app")}`;
  }, [txHash, txUrl]);

  async function connectAndCheck() {
    if (!hasContract) {
      setState("error");
      setMessage("Contract address belum dipasang. Deploy contract dulu, lalu isi BASE_ARENA_BADGE_ADDRESS.");
      return;
    }

    try {
      setState("connecting");
      setMessage("Opening wallet connection...");
      const provider = await getMiniAppProvider();
      if (!provider) throw new Error("Wallet provider not found. Open this inside Farcaster or a browser wallet.");

      const accounts = (await provider.request({ method: "eth_requestAccounts" })) as `0x${string}`[];
      const connected = accounts?.[0];
      if (!connected) throw new Error("No wallet account returned.");
      setAccount(connected);

      const chainId = (await provider.request({ method: "eth_chainId" })) as string;
      if (chainId.toLowerCase() !== BASE_CHAIN_ID_HEX) {
        setState("switching");
        setMessage("Switching wallet to Base Mainnet...");
        try {
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: BASE_CHAIN_ID_HEX }],
          });
        } catch {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: BASE_CHAIN_ID_HEX,
                chainName: "Base Mainnet",
                nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
                rpcUrls: ["https://mainnet.base.org"],
                blockExplorerUrls: [BASE_BLOCK_EXPLORER],
              },
            ],
          });
        }
      }

      setState("checking");
      setMessage("Checking if this wallet already claimed OG...");
      const client = createPublicClient({ chain: base, transport: custom(provider) });
      const claimed = await client.readContract({
        address: contractAddress!,
        abi: baseArenaBadgeAbi,
        functionName: "hasClaimedOG",
        args: [connected],
      });
      setAlreadyClaimed(Boolean(claimed));
      setState("idle");
      setMessage(claimed ? "This wallet already claimed Base Arena OG." : "Wallet ready. You can claim Base Arena OG.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Wallet connection failed.");
    }
  }

  async function claimBadge() {
    if (!hasContract) {
      setState("error");
      setMessage("Contract address belum dipasang. Deploy contract dulu, lalu isi BASE_ARENA_BADGE_ADDRESS.");
      return;
    }

    try {
      setState("claiming");
      setMessage("Confirm the claim transaction in your wallet...");
      const provider = await getMiniAppProvider();
      if (!provider) throw new Error("Wallet provider not found.");
      const [connected] = (await provider.request({ method: "eth_requestAccounts" })) as `0x${string}`[];
      if (!connected) throw new Error("No wallet account returned.");
      setAccount(connected);

      const data = encodeFunctionData({ abi: baseArenaBadgeAbi, functionName: "claimOGBadge" });
      const hash = (await provider.request({
        method: "eth_sendTransaction",
        params: [{ from: connected, to: contractAddress!, data }],
      })) as `0x${string}`;

      setTxHash(hash);
      setAlreadyClaimed(true);
      setState("success");
      setMessage("Claim submitted. Track it on BaseScan.");

      // Light non-blocking confirmation check. UI success uses tx hash immediately.
      fallbackPublicClient.waitForTransactionReceipt({ hash }).catch(() => undefined);
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Claim transaction failed or was rejected.");
    }
  }

  const busy = ["connecting", "checking", "switching", "claiming"].includes(state);

  return (
    <div className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.07] p-5 shadow-[0_0_38px_rgba(34,211,238,0.12)]">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-cyan-300/15 p-3 text-cyan-100">
          <Award className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.26em] text-cyan-100">Onchain claim</p>
          <h3 className="mt-1 text-2xl font-black text-white">Base Arena OG Badge</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Free soulbound OG badge on Base Mainnet. User only pays gas. No guaranteed token or reward.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300">
        <div className="flex flex-wrap items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-200" />
          <span>{message}</span>
        </div>
        {account && <p className="mt-2 text-xs text-slate-500">Connected: {shortAddress(account)}</p>}
        {!hasContract && (
          <p className="mt-2 text-xs text-yellow-100">
            Developer note: deploy contract first, then paste address in <code>lib/baseArenaBadge.ts</code>.
          </p>
        )}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={connectAndCheck}
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-black text-white transition hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy && state !== "claiming" ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlugZap className="h-4 w-4" />}
          Connect / Check
        </button>
        <button
          type="button"
          onClick={claimBadge}
          disabled={busy || alreadyClaimed || !hasContract}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0052ff] px-4 py-3 text-sm font-black text-white shadow-[0_0_34px_rgba(0,82,255,0.36)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-55"
        >
          {state === "claiming" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          {alreadyClaimed ? "OG Claimed" : "Claim OG Badge"}
        </button>
      </div>

      {txUrl && (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            href={txUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-4 py-3 text-sm font-black text-emerald-100"
          >
            View on BaseScan <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href={shareUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-3 text-sm font-black text-cyan-100"
          >
            Share claim to Farcaster <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}
