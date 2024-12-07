export interface LeaderboardRowData {
  rank: number;
  address: string;
  display_address: string;
  balance: number;
}

export interface LeaderboardData {
  created_at: string;
  rows: LeaderboardRowData[];
}

export interface Snapshot {
  rank: number;
  balance: number;
  date: string;
}

export interface Level {
  level: string;
  amount: number;
}

export interface UserSnapshotData {
  snapshots: Snapshot[];
  rank: number;
  balance: number;
  tag: string | null;
  levels: Level[];
}

interface Coin {
  symbol: string;
  fdv: number;
  url: string;
  image_url: string;
}

export type PeersData = Coin[];

/**
 * Changes
 */

export interface ChangesRowData {
  rank: number;
  address: string;
  display_address: string;
  balance: number;
  balance_rank: number;
  balance_difference_absolute: number;
  balance_difference_percent: number;
  rank_difference: number;
}

export interface ChangesData {
  created_at: string;
  rows: ChangesRowData[];
}

/**
 * Stats
 */

export type MarketStat = {
  date: string;
  usdc_supply: number;
  market_cap_total: number;
  volume_total: number;
  sorted_token_names: string[];
  [key: `market_cap_${string}`]: number;
  [key: `volume_${string}`]: number;
};
