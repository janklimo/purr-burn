'use client';

import Head from 'next/head';
import Image from 'next/image';

import Chart from '@/components/leaderboard/Chart';
import Table from '@/components/leaderboard/Table';
import TradeCallout from '@/components/TradeCallout';

export default function Leaderboard() {
  return (
    <main>
      <Head>
        <title>PURR Burn – Leaderboard</title>
      </Head>
      <section className='bg-hl-dark p-3 md:p-4'>
        <h2 className='text-white text-lg mb-3 text-center'>
          <div className='w-5 inline-block mr-1'>
            <Image
              src='/images/purr.webp'
              width={64}
              height={64}
              priority
              alt='PURR'
            />
          </div>
          <span className='text-accent'>PURR</span> holders leaderboard
        </h2>
        <p className='text-center text-xs text-hlGray mb-8'>
          Click on <span className='font-semibold text-white'>Zoom in 🔎 </span>{' '}
          to see detailed stats
        </p>
        <div className='flex justify-center mb-8'>
          <div className='relative w-full md:w-3/4 max-w-5xl'>
            <Table />
          </div>
        </div>
        <div className='relative w-full md:w-3/4 max-w-5xl mx-auto mb-10'>
          <Chart />
        </div>
        <TradeCallout />
      </section>
    </main>
  );
}
