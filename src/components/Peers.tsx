import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

import PeerCard from '@/components/PeerCard';

import useWebSocketData from '@/app/hooks/use-websocket-data';
import { apiHost } from '@/constant/config';

import { PeersData } from '@/types/responses';

interface Props {
  data: ReturnType<typeof useWebSocketData>;
}

const Peers: FC<Props> = ({ data }) => {
  const [coins, setCoins] = useState<PeersData>([]);

  useEffect(() => {
    fetch(`${apiHost}/peers`)
      .then<PeersData>((resp) => resp.json())
      .then((data) => {
        setCoins(data);
      })
      .catch(() => console.error('Failed to fetch peer coins.'));
  }, []);

  if (!data || !coins.length)
    return <p className='text-hlGray text-xl mt-10'>Loading...</p>;

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
            price={coin.market_cap / supply}
            multiple={coin.market_cap / purrMarketCap}
            url={coin.url}
          />
        ))}
      </section>
    </div>
  );
};

export default Peers;
