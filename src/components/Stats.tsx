import { FC } from 'react';
import Marquee from 'react-fast-marquee';

import { MessageContext } from '@/app/page';

const PriceChange: FC<{ change: number }> = ({ change }) => {
  if (change >= 1) {
    const percent = change - 1;

    return (
      <span className='text-accent'>
        &#x25B2;{' '}
        {percent.toLocaleString(undefined, {
          style: 'percent',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    );
  } else {
    const percent = 1 - change;

    return (
      <span className='text-red'>
        &#x25BC;{' '}
        {percent.toLocaleString(undefined, {
          style: 'percent',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    );
  }
};

interface Props {
  data: MessageContext | undefined;
}

const Stats: FC<Props> = ({ data }) => {
  if (!data) return null;

  const supply = parseFloat(data.circulatingSupply);
  const burntAmount = 600_000_000 - supply;
  const markPrice = parseFloat(data.markPx);
  const previousDayPrice = parseFloat(data.prevDayPx);
  const volume = parseFloat(data.dayNtlVlm);

  return (
    <div className='bg-hl-light p-2 mt-4 text-hlGray'>
      <Marquee pauseOnHover gradient gradientColor='#163832' gradientWidth={18}>
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
        <p className='text-accent text-sm font-mono'>
          {markPrice.toFixed(5)}{' '}
          <PriceChange change={markPrice / previousDayPrice} />
        </p>
        <p className='text-gray-500 mx-3'>/</p>
        {/* Volume */}
        <p className='text-hlGray text-sm mr-3'>Daily volume:</p>
        <p className='text-accent text-sm font-mono'>
          {volume.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className='text-gray-500 mx-3'>/</p>
        {/* Market cap */}
        <p className='text-hlGray text-sm mr-3'>Market cap:</p>
        <p className='text-accent text-sm font-mono'>
          {(markPrice * supply).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          })}
        </p>
        <p className='text-gray-500 mx-3'>/</p>
      </Marquee>
    </div>
  );
};

export default Stats;
