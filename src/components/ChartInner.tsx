import NumberFlow from '@number-flow/react';
import { FC } from 'react';

import useWebSocketData from '@/app/hooks/use-websocket-data';

interface Props {
  data: ReturnType<typeof useWebSocketData>;
}

const ChartInner: FC<Props> = ({ data }) => {
  if (!data) return null;

  const circulatingSupply = parseFloat(data.circulatingSupply);

  return (
    <div className='absolute text-center top-1/2 left-1/2 text-white -translate-x-1/2 -translate-y-1/2 -mt-16 md:-mt-4'>
      <span className='font-bold text-sm text-hlGray'>Circulating Supply</span>
      <div className='text-accent font-mono font-semibold text-lg md:text-2xl mt-1'>
        <NumberFlow
          value={circulatingSupply}
          format={{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }}
          spinTiming={{ duration: 1500 }}
        />
      </div>
      <p className='font-mono text-md md:text-xl text-accent'>PURR</p>
    </div>
  );
};

export default ChartInner;
