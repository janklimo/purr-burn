import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import * as React from 'react';
import { Toaster } from 'sonner';

import '@/styles/colors.css';
import '@/styles/globals.css';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-material.css';
// Must come after other ag-grid CSS imports
import '@/styles/ag-grid.css';

import MobileCallout from '@/components/MobileCallout';
import Navbar from '@/components/Navbar';

import { siteConfig } from '@/constant/config';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.png`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.png`],
    // creator: '@th_clarence',
  },
  // authors: [
  //   {
  //     name: 'Theodorus Clarence',
  //     url: 'https://theodorusclarence.com',
  //   },
  // ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className='bg-hl-dark hyperliquid'>
        <MobileCallout />
        <Navbar />
        {children}
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                'border border-hl-primary rounded-lg bg-toast-bg py-4 px-5 text-white text-sm shadow-md',
              title: 'font-normal',
              description: 'font-normal',
            },
          }}
        />
      </body>
      <Analytics />
    </html>
  );
}
