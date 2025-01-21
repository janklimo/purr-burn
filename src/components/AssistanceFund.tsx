import { FC } from 'react';

import Skeleton from '@/components/Skeleton';

import useWebSocketData from '@/app/hooks/use-websocket-data';

interface Props {
  data: ReturnType<typeof useWebSocketData>;
  assistanceFundBalance: number | undefined;
}

const AssistanceFund: FC<Props> = ({ data, assistanceFundBalance }) => {
  const renderContent = () => {
    if (!data || !assistanceFundBalance) {
      return <Skeleton className='h-6 mb-3 w-full max-w-xl mx-auto' />;
    }

    const markPrice = parseFloat(data.markPx);
    const fundValue = markPrice * assistanceFundBalance;

    return (
      <>
        <p className='text-hlGray text-sm'>
          The Assistance Fund currently holds{' '}
          <span className='font-bold text-accent'>
            {assistanceFundBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{' '}
            PURR
          </span>{' '}
          worth{' '}
          <span className='font-bold text-accent'>
            {fundValue.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            })}
          </span>
        </p>
      </>
    );
  };

  return (
    <div>
      <h2 className='text-white text-base mb-2'>🏦 Assistance Fund</h2>
      {renderContent()}
    </div>
  );
};

export default AssistanceFund;
