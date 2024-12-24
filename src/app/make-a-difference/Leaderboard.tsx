import { FC } from 'react';

import usePurrSenders from '@/app/hooks/use-purr-senders';
import PurrSendersTable from '@/app/make-a-difference/PurrSendersTable';

const Leaderboard: FC = () => {
  const { data, loading } = usePurrSenders();

  return (
    <>
      <h2 className='font-serif text-3xl text-center text-white mb-6'>
        Leaderboard
      </h2>
      <p className='text-hlGray text-center text-sm mb-5 px-5'>
        Top 3 eligible donors will receive a Hyperliquid plushie 🐱
      </p>
      <p className='text-hlGray text-center text-sm mb-5 px-5'>
        Here's the current Top 10:
      </p>
      <PurrSendersTable data={data} loading={loading} />
    </>
  );
};

export default Leaderboard;
