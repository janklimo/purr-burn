import Image from 'next/image';
import { FC } from 'react';

interface Props {
  price: number;
}

const PurrCard: FC<Props> = ({ price }) => {
  return (
    <a
      href='https://www.coingecko.com/en/coins/purr-2'
      target='_blank'
      rel='noopener noreferrer'
      className='inline-flex items-center cursor-newtab bg-hl-light py-1 px-2 rounded-2xl mr-2 my-3 md:my-0 hover:bg-primary-900 duration-200 transition-colors'
    >
      <div className='relative w-6 inline-block mr-1'>
        <Image
          src='https://coin-images.coingecko.com/coins/images/37125/large/PURR_CG.png?1713368828'
          width={64}
          height={64}
          priority
          className='rounded-full'
          alt='PURR'
        />
      </div>
      <p className='text-hlGray mr-2 font-normal'>PURR:</p>
      <p className='text-accent font-bold'>
        {price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })}
      </p>
    </a>
  );
};

export default PurrCard;
