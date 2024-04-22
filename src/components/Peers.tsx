import Image from 'next/image';
import { FC } from 'react';

import { MessageContext } from '@/app/page';

interface Props {
  data: MessageContext | undefined;
}

const Peers: FC<Props> = ({ data }) => {
  if (!data) return null;

  return (
    <div className=''>
      <p className='text-white text-base'>
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
      </p>
      ;
    </div>
  );
};

export default Peers;
