import { FC, useEffect, useState } from 'react';

import Skeleton from '@/components/Skeleton';

import useWebSocketData from '@/app/hooks/use-websocket-data';
import { apiHost } from '@/constant/config';

import { LeaderboardData, LeaderboardRowData } from '@/types/responses';

const findFirstRankAboveBalance = (
  data: LeaderboardRowData[],
  balance: number,
): number => {
  const found = data.find((row) => balance > row.purr_balance)!;

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

interface Props {
  data: ReturnType<typeof useWebSocketData>;
}

const DidYouKnow: FC<Props> = ({ data }) => {
  const [rowData, setRowData] = useState<LeaderboardRowData[]>([]);

  useEffect(() => {
    fetch(`${apiHost}/leaderboard`)
      .then<LeaderboardData>((resp) => resp.json())
      .then((data) => {
        setRowData(data.rows);
      });
  }, []);

  if (!data || rowData.length === 0)
    return <Skeleton className='flex w-full h-14' />;

  const supply = parseFloat(data.circulatingSupply);
  const burntAmount = 600_000_000 - supply;
  const markPrice = parseFloat(data.markPx);

  return (
    <div>
      <h2 className='text-white text-base mb-2'>💡 Did you know?</h2>
      <p className='text-hlGray text-sm'>
        The total amount of burned tokens would rank as the{' '}
        <span className='font-bold text-accent'>
          {toOrdinal(findFirstRankAboveBalance(rowData, burntAmount))}
        </span>{' '}
        largest holder worth{' '}
        <span className='font-bold text-accent'>
          {(markPrice * burntAmount).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          })}
        </span>
      </p>
    </div>
  );
};

export default DidYouKnow;
