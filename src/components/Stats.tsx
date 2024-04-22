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

  const supply = parseFloat(data.circulatingSupply);
  const burntAmount = 600_000_000 - supply;
  const markPrice = parseFloat(data.markPx);
  const previousDayPrice = parseFloat(data.prevDayPx);
  const volume = parseFloat(data.dayNtlVlm);

  return (
    <div className='bg-hl-light p-2 mt-4 w-full sm:w-3/4 text-hlGray'>
      <Marquee pauseOnHover>
        {/* Burnt from trading */}
        <p className='text-hlGray text-sm mr-3'>Burn from trading fees:</p>
        <p className='text-accent text-sm font-mono'>
          {burntAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          PURR
        </p>
        <p className='text-gray-500 mx-3'>/</p>
        {/* Price */}
        <p className='text-hlGray text-sm mr-3'>Price:</p>
        <p className='text-accent text-sm font-mono'>{markPrice.toFixed(5)}</p>
        <p className='text-gray-500 mx-3'>/</p>
        {/* Volume */}
        <p className='text-hlGray text-sm mr-3'>Daily volume:</p>
        <p className='text-accent text-sm font-mono'>
          {volume.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          PURR
        </p>
        <p className='text-gray-500 mx-3'>/</p>
        {/* Market cap */}
        <p className='text-hlGray text-sm mr-3'>Market cap:</p>
        <p className='text-accent text-sm font-mono'>
          {Number((markPrice * supply).toFixed()).toLocaleString()} USDC
        </p>
        <p className='text-gray-500 mx-3'>/</p>
      </Marquee>
    </div>
  );
};

export default Stats;
