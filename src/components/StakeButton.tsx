import Image from 'next/image';
import { FC } from 'react';

const StakeButton: FC = () => {
  return (
    <a
      href='https://app.loopingcollective.org/product/lhype?partner=purrposefulnode'
      className='inline-flex items-center bg-beige text-sm text-yellow-900 px-3 py-2 hover:bg-beige-hover transition-all duration-300 rounded-md'
      target='_blank'
      rel='noopener noreferrer'
    >
      <span className='mr-1'>Boost your stake with</span>
      <div className='w-5 inline-block mr-1'>
        <Image
          src='/images/loopedhype.svg'
          width={64}
          height={64}
          priority
          alt='HYPE'
          className='rounded-full'
        />
      </div>
      <span className='mr-1'>loopedHYPE and</span>
      <div className='w-8 inline-block mr-1'>
        <Image
          src='/images/node-logo.png'
          width={64}
          height={64}
          priority
          alt='HYPE'
        />
      </div>
      <span>PurrposefulNode</span>
    </a>
  );
};

export default StakeButton;
