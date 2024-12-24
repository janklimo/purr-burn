import { Metadata } from 'next';
import * as React from 'react';

import { siteConfig } from '@/constant/config';

export const metadata: Metadata = {
  title: 'Make a difference',
  openGraph: {
    title: 'Make a difference',
    description:
      'Help a cat shelter in need by donating PURR. Win a Hyperliquid plushie.',
    images: [
      {
        url: `${siteConfig.url}/images/og/make-a-difference.png`,
        width: 1200,
        height: 630,
        alt: 'Make a difference - Help a cat shelter in need',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Make a difference',
    description:
      'Help a cat shelter in need by donating PURR. Win a Hyperliquid plushie.',
    images: [`${siteConfig.url}/images/og/make-a-difference.png`],
  },
};

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
