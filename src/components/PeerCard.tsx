import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

import { downArrow, upArrow } from '@/lib/formatters';

interface Props {
  symbol: string;
  price: number;
  multiple: number;
  url: string;
  image_url: string;
}

const PeerCard: FC<Props> = ({ symbol, price, multiple, url, image_url }) => {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className={clsx(
        'flex items-center cursor-newtab py-1 px-2 rounded-2xl mb-2 mr-2 hover:bg-primary-900 duration-200 transition-colors',
        multiple < 1 ? 'bg-loserRed' : 'bg-hl-light',
      )}
    >
      <div className='relative w-6 inline-block mr-1'>
        <Image
          src={image_url}
          width={64}
          height={64}
          priority
          className='rounded-full'
          alt={symbol}
        />
        {multiple < 1 && (
          <div className='absolute top-0 left-0 w-full h-full opacity-80'>
            <Image
              src='/images/red-x.png'
              width={474}
              height={593}
              alt='Check.'
            />
          </div>
        )}
      </div>
      <p className='text-hlGray mr-2'>{symbol}:</p>
      <p
        className={clsx(
          multiple >= 1 ? 'text-accent' : 'text-red',
          'font-bold',
        )}
      >
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
