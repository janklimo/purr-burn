import { FC } from 'react';
import Marquee from 'react-fast-marquee';

import { MessageContext } from '@/app/page';

interface Props {
  data: MessageContext | undefined;
}

const Stats: FC<Props> = ({ data }) => {
  if (!data) return null;

  //   {
  //     "prevDayPx": "0.14586",
  //     "dayNtlVlm": "30904561.76848998",
  //     "markPx": "0.15216",
  //     "midPx": "0.152125",
  //     "circulatingSupply": "599755866.52856004"
  // }

  return (
    <div className='bg-hl-light p-2 mt-4 w-full sm:w-3/4 text-hlGray'>
      <Marquee>
        <p className='text-hlGray text-sm mr-3'>Burn from trading fees:</p>
        <p className='text-accent text-sm font-mono'>400,000 PURR</p>
        <p className='text-gray-500 mx-3'>/</p>
        <p className='text-hlGray text-sm mr-3'>Burn from trading fees:</p>
        <p className='text-accent text-sm font-mono'>400,000 PURR</p>
        <p className='text-gray-500 mx-3'>/</p>
        <p className='text-hlGray text-sm mr-3'>Burn from trading fees:</p>
        <p className='text-accent text-sm font-mono'>400,000 PURR</p>
        <p className='text-gray-500 mx-3'>/</p>
        <p className='text-hlGray text-sm mr-3'>Burn from trading fees:</p>
        <p className='text-accent text-sm font-mono'>400,000 PURR</p>
        <p className='text-gray-500 mx-3'>/</p>
      </Marquee>
    </div>
  );
};

export default Stats;
