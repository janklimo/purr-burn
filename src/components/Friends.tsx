'use client';

import '@/lib/env';
import Image from 'next/image';
import { FC } from 'react';

const friends = [
  {
    name: 'HypurrCollective',
    link: 'https://www.hypurr.co/',
    logo: '/images/friends/hypurrcollective.jpeg',
  },
  {
    name: 'HypurrScan',
    link: 'https://hypurrscan.io/',
    logo: '/images/friends/hypurrscan.png',
  },
  {
    name: 'HyBridge',
    link: 'https://hybridge.xyz/',
    logo: '/images/friends/hybridge.svg',
  },
  {
    name: 'HyperDATA',
    link: 'https://hyperscan.fun/',
    logo: '/images/friends/hyperfun.svg',
  },
];

const Friends: FC = () => (
  <>
    <h3 className='text-white text-lg mb-4 text-center'>
      Hyperliquid ecosystem friends 👫
    </h3>
    <div className='flex flex-wrap justify-center gap-2 mb-4'>
      {friends.map((friend) => {
        return (
          <div
            key={friend.link}
            className='group relative flex border border-hl-light cursor-pointer rounded-lg bg-white/5 py-2 px-3 shadow-md transition hover:bg-primary-200/20 hover:border hover:border-hl-primary'
          >
            <a href={friend.link} target='_blank' rel='noopener noreferrer'>
              <div className='flex justify-center items-center w-full'>
                <div className='w-6 inline-block mr-2'>
                  <Image
                    src={friend.logo}
                    width={64}
                    height={64}
                    priority
                    alt={friend.name}
                    className='rounded-full'
                  />
                </div>
                <span className='font-semibold text-gray-300 group-hover:text-white text-sm'>
                  {friend.name}
                </span>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  </>
);

export default Friends;
