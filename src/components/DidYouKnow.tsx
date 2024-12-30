import { FC } from 'react';
import useSWR from 'swr';

import Skeleton from '@/components/Skeleton';

import useWebSocketData from '@/app/hooks/use-websocket-data';
import { apiHost } from '@/constant/config';

import { LeaderboardData, LeaderboardRowData } from '@/types/responses';

interface HypeData {
  totalSupply: string;
  circulatingSupply: string;
  markPx: string;
}

const findFirstRankAboveBalance = (
  data: LeaderboardRowData[],
  balance: number,
): number => {
  const found = data.find((row) => balance > row.balance)!;
  return found.rank;
};

const toOrdinal = (n: number): string => {
  const suffixes: { [key: number]: string } = {
    1: 'st',
    2: 'nd',
    3: 'rd',
  };
  if (n % 100 >= 11 && n % 100 <= 13) {
    return `${n}th`;
  }
  return `${n}${suffixes[n % 10] || 'th'}`;
};

const adjustCirculatingSupply = (supply: number) => {
  if (supply > 900_000_000) {
    return supply - 428_060_000 - 238_000_000;
  }
  return supply;
};

const fetcher = (url: string) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tokenId: '0x0d01dc56dcaaca66ad901c959b4011ec',
      type: 'tokenDetails',
    }),
  }).then((res) => res.json());

interface Props {
  data: ReturnType<typeof useWebSocketData>;
}

const DidYouKnow: FC<Props> = ({ data }) => {
  const { data: leaderboardData, error: leaderboardError } =
    useSWR<LeaderboardData>(`${apiHost}/leaderboard`, (url: string) =>
      fetch(url).then((res) => res.json()),
    );

  const { data: hypeData, error: hypeError } = useSWR<HypeData>(
    ['https://api.hyperliquid.xyz/info', 'fetchHypeTokenInfo'],
    ([url]) => fetcher(url),
    { refreshInterval: 10_000 },
  );

  const renderContent = () => {
    if (!data || !leaderboardData?.rows.length) {
      return <Skeleton className='h-6 mb-3 w-full max-w-xl mx-auto' />;
    }

    const supply = parseFloat(data.circulatingSupply);
    const burntAmount = 600_000_000 - supply;
    const markPrice = parseFloat(data.markPx);

    return (
      <p className='text-hlGray text-sm mb-3'>
        The total amount of burned tokens would rank as the{' '}
        <span className='font-bold text-accent'>
          {toOrdinal(
            findFirstRankAboveBalance(leaderboardData.rows, burntAmount),
          )}
        </span>{' '}
        largest holder with{' '}
        <span className='font-bold text-accent'>
          {burntAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          PURR
        </span>{' '}
        worth{' '}
        <span className='font-bold text-accent'>
          {(markPrice * burntAmount).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          })}
        </span>
      </p>
    );
  };

  const renderHypeContent = () => {
    if (!hypeData || !data) {
      return <Skeleton className='h-6 w-full max-w-xl mx-auto' />;
    }

    const purrSupply = parseFloat(data.circulatingSupply);
    const purrPrice = parseFloat(data.markPx);
    const purrMarketCap = purrSupply * purrPrice;

    const hypeTotalSupply = parseFloat(hypeData.totalSupply);
    const hypeCirculatingSupply = adjustCirculatingSupply(
      parseFloat(hypeData.circulatingSupply),
    );
    const hypePrice = parseFloat(hypeData.markPx);
    const hypeFdv = hypeTotalSupply * hypePrice;
    const hypeMarketCap = hypeCirculatingSupply * hypePrice;

    return (
      <p className='text-hlGray text-sm mb-3'>
        With a market cap of{' '}
        <span className='font-bold text-accent'>
          {(purrMarketCap / 1_000_000).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
          })}
          M
        </span>
        , PURR is currently valued at{' '}
        <span className='font-bold text-accent'>
          {(purrMarketCap / hypeMarketCap).toLocaleString('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>{' '}
        of HYPE's{' '}
        <span className='font-bold text-accent'>
          {(hypeMarketCap / 1_000_000_000).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
          })}
          B
        </span>{' '}
        market cap (
        <span className='font-bold text-accent'>
          {(purrMarketCap / hypeFdv).toLocaleString('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>{' '}
        of HYPE's{' '}
        <span className='font-bold text-accent'>
          {(hypeFdv / 1_000_000_000).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
          })}
          B
        </span>{' '}
        FDV)
      </p>
    );
  };

  if (leaderboardError || hypeError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h2 className='text-white text-base mb-2'>💡 Did you know?</h2>
      {renderHypeContent()}
      {renderContent()}
    </div>
  );
};

export default DidYouKnow;
