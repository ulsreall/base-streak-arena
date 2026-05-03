# Base Streak Arena — Supabase Leaderboard Plan

This build ships with a localStorage MVP leaderboard so the app can launch without login/database friction.
Use this plan when upgrading to a real global leaderboard.

## Table: season0_players

```sql
create table if not exists season0_players (
  id uuid primary key default gen_random_uuid(),
  wallet_address text unique,
  farcaster_fid bigint,
  farcaster_username text,
  display_name text,
  xp integer not null default 0,
  streak integer not null default 0,
  best_streak integer not null default 0,
  check_ins integer not null default 0,
  last_check_in date,
  og_claimed boolean not null default false,
  og_token_id integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists season0_players_rank_idx
on season0_players (xp desc, streak desc, check_ins desc);
```

## Suggested RLS direction

For first real backend version, do not let the browser freely update arbitrary XP.
Use one of these:

1. Supabase Edge Function validates a wallet/Farcaster session, then updates check-in.
2. Server route validates Farcaster Mini App context/signature, then upserts score.
3. Keep localStorage launch MVP until validation flow is ready.

## Upsert shape

```ts
{
  wallet_address: "0x...",
  farcaster_fid: 123,
  farcaster_username: "mancingdao.eth",
  display_name: "mancingdao.eth",
  xp: 40,
  streak: 3,
  best_streak: 3,
  check_ins: 3,
  last_check_in: "2026-05-04",
  og_claimed: true,
  og_token_id: 1
}
```

## Public leaderboard query

```sql
select wallet_address, farcaster_username, display_name, xp, streak, check_ins, og_claimed
from season0_players
order by xp desc, streak desc, check_ins desc
limit 50;
```

## Launch copy

Keep leaderboard wording honest until Supabase is connected:

```text
Launch MVP: score is saved locally first. Global leaderboard comes after soft launch.
```

No guaranteed airdrop/token/profit wording.
