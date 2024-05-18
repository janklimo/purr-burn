import { FC } from 'react';

import { useActiveTableStore } from '@/state/stores';

const TopDescription: FC = () => {
  const activeTable = useActiveTableStore((state) => state.activeTable);

  const count = activeTable === 'holders' ? 5_000 : 1_000;

  return (
    <p className='text-center text-xs text-hlGray mb-8 mt-8'>
      Listing Top {count.toLocaleString('en-US')} {activeTable}. Click on{' '}
      <span className='font-semibold text-white'>Zoom in 🔎 </span> to see
      detailed stats.
    </p>
  );
};

export default TopDescription;
