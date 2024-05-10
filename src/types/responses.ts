export interface LeaderboardRowData {
  rank: number;
  address: string;
  purr_balance: number;
}

export interface LeaderboardData {
  created_at: string;
  rows: LeaderboardRowData[];
}

export interface Snapshot {
  rank: number;
  purr_balance: number;
  date: string;
}

export interface Level {
  level: string;
  amount: number;
}

export interface UserSnapshotData {
  snapshots: Snapshot[];
  rank: number;
  purr_balance: number;
  tag: string | null;
  levels: Level[];
}

interface Coin {
  symbol: string;
  market_cap: number;
  url: string;
}

export type PeersData = Coin[];
