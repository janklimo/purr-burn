import { FC } from 'react';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

interface Props {
  supply: string | undefined;
}

const Progress: FC<Props> = ({ supply }) => {
  if (typeof supply !== 'string')
    return <p className='text-hlGray text-xl mt-10'>Loading...</p>;

  const value = Number(parseFloat(supply).toFixed(2));

  return (
    <CircularProgressbarWithChildren
      value={(value / 1_000_000_000) * 100}
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
          {value.toLocaleString()}
        </p>
        <p className='text-accent text-xl font-mono'>PURR</p>
      </div>
    </CircularProgressbarWithChildren>
  );
};

export default Progress;
