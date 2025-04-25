import Image from 'next/image';
import { FC } from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

const MobileCallout: FC = () => {
  return (
    <div className='xl:hidden'>
      <div className='bg-primary-100 py-3 '>
        <div className='flex justify-center text-sm mb-1'>
          <span className='mr-1'>Trade</span>
          <div className='w-5 inline-block mr-1'>
            <Image
              src='/images/purr.webp'
              width={64}
              height={64}
              priority
              alt='PURR'
            />
          </div>
          <span className='mr-1'>PURR</span>
          <UnderlineLink
            dotted={false}
            href='https://app.hyperliquid.xyz/join/AK194'
          >
            on Hyperliquid
          </UnderlineLink>
          <div className='w-5 inline-block'>
            <Image
              src='/images/blob.gif'
              width={64}
              height={64}
              priority
              alt='PURR'
            />
          </div>
        </div>
        <div className='text-xs text-center text-gray-600 mt-2'>
          This referral link gives you 4% discount on your trading fees.
        </div>
      </div>
      <div className='flex justify-center items-center bg-beige py-3 text-sm text-yellow-900'>
        <UnderlineLink
          dotted={false}
          className='mr-1'
          borderColor='border-yellow-900'
          href='https://www.stakingrewards.com/stake-app?input=hyperliquid&best-deal=true&validator=purrposefulnode&locked=true'
        >
          Boost your stake with
        </UnderlineLink>
        <div className='w-5 inline-flex items-center mr-1'>
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
        <div className='w-8 inline-flex items-center mr-1'>
          <Image
            src='/images/node-logo.png'
            width={64}
            height={64}
            priority
            alt='HYPE'
          />
        </div>
        <span>PurrposefulNode</span>
      </div>
    </div>
  );
};

export default MobileCallout;
