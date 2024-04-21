'use client';

import '@/lib/env';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import 'react-circular-progressbar/dist/styles.css';

import Progress from '@/components/Progress';
import Stats from '@/components/Stats';

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
      <section className='bg-hl'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <div className='w-48 sm:w-64 -mb-6 sm:-mb-8 z-10'>
            <Image
              src='/images/purr.png'
              width={400}
              height={400}
              priority
              alt='The cat has a hoodie'
            />
          </div>
          <div className='mb-8'>
            <Progress supply={data?.circulatingSupply} />
          </div>
          <Stats data={data} />
        </div>
      </section>
    </main>
  );
}
