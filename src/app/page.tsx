'use client';

import '@/lib/env';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import 'react-circular-progressbar/dist/styles.css';

import Peers from '@/components/Peers';
import Progress from '@/components/Progress';
import Stats from '@/components/Stats';
import TradeButton from '@/components/TradeButton';

export interface MessageContext {
  prevDayPx: string;
  dayNtlVlm: string;
  markPx: string;
  midPx: string;
  circulatingSupply: string;
}

interface MessageData {
  channel: string;
  data: {
    coin: string;
    ctx?: MessageContext;
  };
}

export default function HomePage() {
  const [data, setData] = useState<MessageContext | undefined>();

  useEffect(() => {
    const socket = new WebSocket('wss://api-ui.hyperliquid.xyz/ws');

    // Listen for the connection to open and send the message
    socket.addEventListener('open', () => {
      // Send the message to the server
      socket.send(
        JSON.stringify({
          method: 'subscribe',
          subscription: { type: 'activeAssetCtx', coin: 'PURR/USDC' },
        }),
      );
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      const data: MessageData = JSON.parse(event.data);

      if (data.data.ctx) {
        setData(data.data.ctx);
      }
    });

    // Handle any errors that occur
    socket.addEventListener('error', (error) => {
      console.error('WebSocket Error: ', error);
    });

    // Clean up function
    return () => {
      socket.close();
    };
  }, []);

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
              title='The cat has a hoodie'
            />
          </div>
          <div className='mb-4 h-96 w-80 md:h-[35rem] md:w-[70rem]'>
            <Progress data={data} />
          </div>
          <div className='mb-6 w-full sm:w-3/4'>
            <Stats data={data} />
          </div>
          <div className='my-4'>
            <Peers data={data} />
          </div>
          <div className='mt-6 mb-8'>
            <TradeButton />
            <p className='text-gray-400 text-sm mt-3'>
              Using this referral link gives you a{' '}
              <a
                href='https://hyperliquid.gitbook.io/hyperliquid-docs/referrals'
                className='text-hl-primary hover:text-accent transition-all'
                target='_blank'
                rel='noopener noreferrer'
              >
                4% discount
              </a>{' '}
              on your taker fees.
            </p>
          </div>
          <div className='text-white mt-3 text-center text-sm'>
            By{' '}
            <a
              href='https://twitter.com/janklimo'
              className='text-hl-primary hover:text-accent transition-all'
              target='_blank'
              rel='noopener noreferrer'
            >
              @janklimo
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
