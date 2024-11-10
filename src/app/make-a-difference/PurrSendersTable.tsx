import { PurrSender } from '@/app/hooks/use-purr-senders';
import Skeleton from '@/components/Skeleton';
import { FC } from 'react';

const getMedal = (index: number) => {
  switch (index) {
    case 0:
      return '🥇';
    case 1:
      return '🥈';
    case 2:
      return '🥉';
    default:
      return null;
  }
};

const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

interface Props {
  data: Array<PurrSender>;
  loading: boolean;
}

const PurrSendersTable: FC<Props> = ({ data, loading }) => {
  if (loading) return <Skeleton className='flex max-w-2xl h-60 mx-auto' />;

  // Take only the first 10 entries
  const topSenders = data.slice(0, 10);

  return (
    <div className='flex justify-center overflow-x-auto'>
      <table className='w-full max-w-2xl text-sm text-left text-table-text'>
        <thead className='bg-table-background'>
          <tr className='border-b border-table-border'>
            <th className='px-6 py-4'>Rank</th>
            <th className='px-6 py-4'>Address</th>
            <th className='px-6 py-4 text-right'>Total PURR Donated</th>
          </tr>
        </thead>
        <tbody>
          {topSenders.map((sender, index) => (
            <tr
              key={sender.address}
              className={`
                border-b border-table-border bg-table-background hover:bg-table-hover transition-colors
              `}
            >
              <td className='px-6 py-3 whitespace-nowrap'>
                <div className='flex items-center gap-2'>
                  <span>{index + 1}</span>
                  {getMedal(index)}
                </div>
              </td>
              <td className='px-6 py-3 font-mono'>
                {formatAddress(sender.address)}
              </td>
              <td className='px-6 py-3 text-right'>
                {sender.totalSent.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurrSendersTable;
