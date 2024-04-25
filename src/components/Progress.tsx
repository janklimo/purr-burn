import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';

import Counter from '@/components/Counter';

import { MessageContext } from '@/app/page';

interface Props {
  data: MessageContext | undefined;
}

const Progress: FC<Props> = ({ data }) => {
  const [supply, setSupply] = useState<number>(1_000_000_000);

  useEffect(() => {
    if (!data) return;

    setSupply(parseFloat(data.circulatingSupply));
  }, [data]);

  const progress = (supply / 1_000_000_000) * 100;

  return (
    <>
      <CircularProgressbarWithChildren
        value={progress}
        strokeWidth={9}
        styles={buildStyles({
          strokeLinecap: 'round',

          // Colors
          pathColor: '#98FCE4',
          trailColor: '#163832',
          // This should match the duration of the counter spring animation
          pathTransitionDuration: 1,
        })}
      >
        <div className='relative'>
          <p className='text-hlGray text-sm mb-2'>Circulating Supply</p>
          <Counter end={supply} />
          <p className='text-accent text-xl font-mono'>PURR</p>
          <div className='w-10 z-10 absolute -bottom-5 -right-3 transform scale-x-[-1] -rotate-90'>
            <Image
              src='/images/arrow.svg'
              width={100}
              height={100}
              priority
              alt='The cat has a hoodie'
              title='The cat has a hoodie'
            />
          </div>
        </div>
      </CircularProgressbarWithChildren>
      {!data && <p className='text-hlGray text-xl mt-10'>Loading...</p>}
    </>
  );
};

export default Progress;
