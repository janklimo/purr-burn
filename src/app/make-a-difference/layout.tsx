import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Make a difference',
};

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
