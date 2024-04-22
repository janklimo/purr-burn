import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
  symbol: string;
  price: number;
  multiple: number;
}

const PeerCard: FC<Props> = ({ symbol, price, multiple }) => {
  return (
    <div className='flex items-center bg-hl-light py-1 px-2 rounded-2xl mb-2 mr-2'>
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
        {multiple >= 1 ? '\u25B2' : '\u25BC'} {multiple.toFixed(2)}x
      </p>
    </div>
  );
};

export default PeerCard;
