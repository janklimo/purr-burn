'use client';

import '@/lib/env';
import { FC } from 'react';

import 'react-circular-progressbar/dist/styles.css';

import TradeButton from '@/components/TradeButton';

const TradeCallout: FC = () => (
  <div className='flex flex-col justify-center items-center text-center'>
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
);

export default TradeCallout;
