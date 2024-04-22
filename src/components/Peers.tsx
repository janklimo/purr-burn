import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

import PeerCard from '@/components/PeerCard';

import { MessageContext } from '@/app/page';

interface Props {
  data: MessageContext | undefined;
}

const Peers: FC<Props> = ({ data }) => {
  const [coins, setCoins] = useState<{ symbol: string; marketCap: number }[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/coins');
        const data: { [key: string]: number } = await response.json();
        const formattedData = Object.entries(data).map(
          ([symbol, marketCap]) => ({
            symbol,
            marketCap,
          }),
        );
        setCoins(formattedData);
      } catch (error) {
        console.error('Failed to fetch coins', error);
      }
    };

    fetchData();
  }, []);

  if (!coins.length) return null;
  if (!data) return null;

  const markPrice = parseFloat(data.markPx);
  const supply = parseFloat(data.circulatingSupply);
  const purrMarketCap = markPrice * supply;

  return (
    <div>
      <h2 className='text-white text-base mb-4'>
        <span className='mr-2'>Price of</span>
        <div className='w-5 inline-block mr-1'>
          <Image
            src='/images/purr.webp'
            width={64}
            height={64}
            priority
            alt='PURR'
          />
        </div>
        <span className='text-accent'>PURR</span> with the market cap of ...
      </h2>
      <section className='flex justify-center items-center flex-wrap'>
        {coins.map((coin) => (
          <PeerCard
            key={coin.symbol}
            symbol={coin.symbol}
            price={coin.marketCap / supply}
            multiple={coin.marketCap / purrMarketCap}
          />
        ))}
      </section>
    </div>
  );
};

export default Peers;
