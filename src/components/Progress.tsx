import { FC, useEffect, useState } from 'react';

import Chart from '@/components/Chart';
import Skeleton from '@/components/Skeleton';

import useWebSocketData from '@/app/hooks/use-websocket-data';

interface Props {
  data: ReturnType<typeof useWebSocketData>;
}

const Progress: FC<Props> = ({ data }) => {
  const [supply, setSupply] = useState<number>(1_000_000_000);

  useEffect(() => {
    if (!data) return;

    setSupply(parseFloat(data.circulatingSupply));
  }, [data]);

  if (!data)
    return <Skeleton className='h-96 w-80 md:h-[35rem] md:w-[70rem]' />;

  return <Chart supply={supply} />;
};

export default Progress;
