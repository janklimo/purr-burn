'use client';

import { FC, useEffect, useState } from 'react';

import Disclaimer from '@/components/Disclaimer';
import Chart from '@/components/stats/Chart';
import DominanceChart from '@/components/stats/DominanceChart';
import CoinSelect from '@/components/stats/Select';
import TradeCallout from '@/components/TradeCallout';

import { apiHost } from '@/constant/config';

import { MarketStat } from '@/types/responses';

const Stats: FC = () => {
  const [data, setData] = useState<MarketStat[] | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${apiHost}/stats`)
        .then<MarketStat[]>((resp) => resp.json())
        .then((data) => setData(data));
    };

    fetchData();
  }, []);

  return (
    <main>
      <section className='bg-hl-dark p-3 md:p-4'>
        <div className='flex justify-center items-center flex-col mb-8'>
          <CoinSelect data={data} />
          <div className='relative w-full md:w-3/4 max-w-5xl mb-12'>
            <Chart type='marketCap' data={data} />
          </div>
          <div className='relative w-full md:w-3/4 max-w-5xl mb-12'>
            <Chart type='volume' data={data} />
          </div>
          <div className='relative w-full md:w-3/4 max-w-5xl'>
            <DominanceChart data={data} />
          </div>
        </div>
        <TradeCallout />
        <div className='layout mt-6'>
          <Disclaimer />
        </div>
      </section>
    </main>
  );
};

export default Stats;
