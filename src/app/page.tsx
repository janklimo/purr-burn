'use client';

import '@/lib/env';
import Head from 'next/head';
import Image from 'next/image';
import purr from 'public/images/purr.png';

import Data from '@/components/Data';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-hl'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <div className='w-64'>
            <Image
              src={purr}
              width={400}
              height={400}
              placeholder='blur'
              alt='The cat has a hoodie'
            />
          </div>
          <h1 className='mt-4'>PURR Burn</h1>
          <p className='mt-2 text-sm text-gray-800'>
            A starter for Next.js, Tailwind CSS, and TypeScript with Absolute
            Import, Seo, Link component, pre-configured
          </p>
          <Data />
          <p className='mt-2 text-sm text-gray-700'>
            <ArrowLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'>
              See the repository
            </ArrowLink>
          </p>

          <ButtonLink className='mt-6' href='/components' variant='light'>
            See all components...
          </ButtonLink>

          <UnstyledLink
            href='https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ftheodorusclarence%2Fts-nextjs-tailwind-starter'
            className='mt-4'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width='92'
              height='32'
              src='https://vercel.com/button'
              alt='Deploy with Vercel'
            />
          </UnstyledLink>
        </div>
      </section>
    </main>
  );
}
