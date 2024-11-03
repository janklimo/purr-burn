import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'PURR Burn – Leaderboard',
};

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
