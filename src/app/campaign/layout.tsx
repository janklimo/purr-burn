import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'PURR Burn – Make a difference',
};

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
