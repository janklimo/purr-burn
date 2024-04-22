import Image from 'next/image';
import { FC } from 'react';

import { MessageContext } from '@/app/page';

interface Props {
  data: MessageContext | undefined;
}

const Peers: FC<Props> = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      <h2 className='text-white text-base mb-2'>
        <div className='w-5 inline-block mr-1'>
          <Image
            src='/images/purr.webp'
            width={64}
            height={64}
            priority
            alt='PURR'
          />
        </div>
        <span className='text-accent'>PURR</span> with the market cap of...
      </h2>
      <section className='flex justify-center items-center'>
        <div className='flex items-center bg-hl-light py-1 px-2 rounded-2xl'>
          <div className='w-6 inline-block mr-1'>
            <Image
              src='/images/coins/SHIB.png'
              width={64}
              height={64}
              priority
              alt='SHIB'
            />
          </div>
          <p className='text-hlGray mr-2'>SHIB:</p>
          <p className='text-accent font-bold'>$8.98</p>
          <p className='text-gray-500 mx-2'>/</p>
          <p className='text-accent font-bold'>&#x25B2; 32x</p>
        </div>
      </section>
    </div>
  );
};

export default Peers;
