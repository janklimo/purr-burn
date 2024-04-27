import { FC, useEffect, useState } from 'react';

import Chart from '@/components/Chart';

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
      <Chart />
      {!data && <p className='text-hlGray text-xl mt-10'>Loading...</p>}
    </>
  );
};

export default Progress;
