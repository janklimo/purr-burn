'use client';

import '@/lib/env';
import Head from 'next/head';
import Image from 'next/image';

import 'react-circular-progressbar/dist/styles.css';

import Data from '@/components/Data';
import Progress from '@/components/Progress';

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
              src='/images/purr.png'
              width={400}
              height={400}
              priority
              alt='The cat has a hoodie'
            />
          </div>
          <Progress />
          <Data />
        </div>
      </section>
    </main>
  );
}
