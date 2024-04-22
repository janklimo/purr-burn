import { FC } from 'react';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

import { MessageContext } from '@/app/page';

interface Props {
  data: MessageContext | undefined;
}

const Progress: FC<Props> = ({ data }) => {
  if (!data) return <p className='text-hlGray text-xl mt-10'>Loading...</p>;

  const supply = parseFloat(data.circulatingSupply);

  return (
    <CircularProgressbarWithChildren
      value={(supply / 1_000_000_000) * 100}
      strokeWidth={9}
      styles={buildStyles({
        strokeLinecap: 'round',

        // Colors
        pathColor: '#98FCE4',
        textColor: '#f88',
        trailColor: '#163832',
        backgroundColor: '#163832',
      })}
    >
      <div>
        <p className='text-hlGray text-sm mb-2'>Circulating Supply</p>
        <p className='text-accent text-xl font-mono'>
          {supply.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
        </p>
        <p className='text-accent text-xl font-mono'>PURR</p>
      </div>
    </CircularProgressbarWithChildren>
  );
};

export default Progress;
