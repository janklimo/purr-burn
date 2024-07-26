import { FC } from 'react';

import { useCoinStore } from '@/state/stores';

import { MarketStat } from '@/types/responses';

interface Props {
  data: MarketStat[] | undefined;
}

const CoinSelect: FC<Props> = ({ data }) => {
  const selectedCoin = useCoinStore((state) => state.selectedCoin);
  const setSelectedCoin = useCoinStore((state) => state.setSelectedCoin);

  if (!data) return null;

  const coins = [...data[data.length - 1].sorted_token_names].sort();

  return (
    <div className='mb-6'>
      <label
        htmlFor='coin'
        className='block text-sm font-medium leading-6 text-gray-200'
      >
        Select coin
      </label>
      <select
        id='coin'
        name='coin'
        className='mt-2 bg-white/5 block w-full rounded-md border border-hl-light py-1.5 pl-3 pr-10 text-gray-300 ring-0 focus:ring-1 focus:border-hl-primary focus:ring-hl-primary sm:text-sm sm:leading-6'
        value={selectedCoin}
        onChange={(event) => setSelectedCoin(event.target.value)}
      >
        <option>All</option>
        <option>Strict</option>
        <optgroup label=''></optgroup>
        {coins.map((coin) => {
          return <option key={coin}>{coin.toUpperCase()}</option>;
        })}
      </select>
    </div>
  );
};

export default CoinSelect;
