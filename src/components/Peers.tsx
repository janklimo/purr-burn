import Image from 'next/image';
import { FC } from 'react';

import PeerCard from '@/components/PeerCard';

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
      <section className='flex justify-center items-center flex-wrap'>
        <PeerCard symbol='SHIB' price={3.45} multiple={4.98} />
        <PeerCard symbol='SHIB' price={3.45} multiple={4.98} />
        <PeerCard symbol='SHIB' price={3.45} multiple={4.98} />
      </section>
    </div>
  );
};

export default Peers;
