'use client';

import { FC } from 'react';

import CopyToClipboard from '@/components/CopyToClipboard';
import TradeCallout from '@/components/TradeCallout';

import FrequentlyAskedQuestions from '@/app/make-a-difference/FAQ';
import Gallery from '@/app/make-a-difference/Gallery';
import Progress from '@/app/make-a-difference/Progress';
import Shelter from '@/app/make-a-difference/Shelter';

const Campaign: FC = () => {
  return (
    <main>
      <section className='bg-hl-dark p-3 md:p-4'>
        <h1 className='font-serif text-white text-4xl md:text-5xl mb-5 text-center'>
          Make a difference
        </h1>
        <p className='text-gray-300 text-center mb-12 px-5'>
          Gmeow! Help a cat shelter in need by donating PURR. Win Hyperliquid
          merch. Details below 👇
        </p>
        <div className='mb-6'>
          <Progress />
        </div>
        <div className='mb-6'>
          <h2 className='font-serif text-white text-3xl mb-3 text-center'>
            How to donate?
          </h2>
          <p className='text-hlGray text-center text-sm mb-5 px-5'>
            Transfer PURR to this address:
          </p>
          <CopyToClipboard />
        </div>
        <p className='text-center text-yellow-200'>Leaderboard</p>
        <p className='text-center text-yellow-200'>Updates</p>
        <div className='my-4'>
          <Shelter />
          <Gallery />
        </div>
        <FrequentlyAskedQuestions />
        <TradeCallout />
      </section>
    </main>
  );
};

export default Campaign;
