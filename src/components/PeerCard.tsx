import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

import { downArrow, upArrow } from '@/lib/formatters';

interface Props {
  symbol: string;
  price: number;
  multiple: number;
  url: string;
}

const PeerCard: FC<Props> = ({ symbol, price, multiple, url }) => {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='flex items-center cursor-newtab bg-hl-light py-1 px-2 rounded-2xl mb-2 mr-2 hover:bg-primary-900 duration-200 transition-colors'
    >
      <div className='w-6 inline-block mr-1'>
        <Image
          src={`/images/coins/${symbol}.png`}
          width={64}
          height={64}
          priority
          className='rounded-full'
          alt={symbol}
        />
      </div>
      <p className='text-hlGray mr-2'>{symbol}:</p>
      <p className='text-accent font-bold'>
        {price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
      <p className='text-gray-500 mx-2'>/</p>
      <p
        className={clsx(
          multiple >= 1 ? 'text-accent' : 'text-red',
          'font-bold',
        )}
      >
        {multiple >= 1 ? upArrow : downArrow} {multiple.toFixed(2)}x
      </p>
    </a>
  );
};

export default PeerCard;
