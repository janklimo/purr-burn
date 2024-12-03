'use client';

import Image from 'next/image';
import { Suspense } from 'react';

import Disclaimer from '@/components/Disclaimer';
import Chart from '@/components/leaderboard/Chart';
import PeriodSelector from '@/components/leaderboard/PeriodSelector';
import HoldersTable from '@/components/leaderboard/Table';
import TableSelector from '@/components/leaderboard/TableSelector';
import TopDescription from '@/components/leaderboard/TopDescription';
import ChangesTable from '@/components/tables/ChangesTable';
import TradeCallout from '@/components/TradeCallout';

import { useActiveTableStore } from '@/state/stores';

export default function Leaderboard() {
  const activeTable = useActiveTableStore((state) => state.activeTable);

  return (
    <main>
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
          <span className='text-accent'>PURR</span> leaderboard
        </h2>
        <TableSelector />
        <PeriodSelector />
        <TopDescription />
        <div className='flex justify-center mb-8'>
          <div className='relative w-full md:w-3/4 max-w-7xl'>
            {activeTable === 'holders' ? <HoldersTable /> : <ChangesTable />}
          </div>
        </div>
        <div className='relative w-full md:w-3/4 max-w-5xl mx-auto mb-10'>
          <Suspense>
            <Chart />
          </Suspense>
        </div>
        <TradeCallout />
        <div className='layout mt-6'>
          <Disclaimer />
        </div>
      </section>
    </main>
  );
}
