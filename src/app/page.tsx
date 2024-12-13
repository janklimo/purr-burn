'use client';

import '@/lib/env';
import Head from 'next/head';
import Image from 'next/image';

import Chart from '@/components/Chart';
import ChartInner from '@/components/ChartInner';
import DidYouKnow from '@/components/DidYouKnow';
import Disclaimer from '@/components/Disclaimer';
import Peers from '@/components/Peers';
import Stats from '@/components/Stats';
import TradeCallout from '@/components/TradeCallout';

import useTokenInfo from '@/app/hooks/use-token-info';
import useWebSocketData from '@/app/hooks/use-websocket-data';

export default function HomePage() {
  const data = useWebSocketData();
  const { tokenInfo } = useTokenInfo();

  return (
    <main>
      <Head>
        <title>PURR Burn</title>
      </Head>
      <section className='bg-hl-dark'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-4 text-center'>
          <div className='w-48 md:w-56 -mb-10 md:-mb-14 z-10'>
            <Image
              src='/images/purr.png'
              width={400}
              height={400}
              priority
              alt='The cat has a hoodie'
              title='Hoodie stays on'
            />
          </div>
          <div className='mb-4 h-96 w-80 md:h-[35rem] md:w-[70rem] relative'>
            <Chart data={data} />
            <ChartInner data={data} />
          </div>
          <div className='mb-6 w-full sm:w-3/4'>
            <Stats data={data} />
          </div>
          <div className='mt-4 mb-6 w-full'>
            <DidYouKnow data={data} />
          </div>
          <div className='my-4 w-full'>
            <Peers data={data} tokenInfo={tokenInfo} />
          </div>
          <TradeCallout />
          <div className='mt-6'>
            <Disclaimer />
          </div>
        </div>
      </section>
    </main>
  );
}
