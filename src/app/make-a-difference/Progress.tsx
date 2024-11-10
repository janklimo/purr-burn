import { usePurrBalance } from '@/app/hooks/use-purr-balance';
import Skeleton from '@/components/Skeleton';
import Image from 'next/image';
import { FC } from 'react';

const Progress: FC = () => {
  const { purrBalance, loading, error } = usePurrBalance();

  if (loading) return <Skeleton className='flex max-w-2xl h-20 mx-auto' />;

  const progressPercent = purrBalance / 42_000;

  return (
    <div>
      <p className='text-hlGray text-sm text-center'>
        We've collected{' '}
        <span className='font-bold text-accent'>
          {purrBalance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          PURR
        </span>{' '}
        – we're{' '}
        <span className='font-bold text-accent'>
          {progressPercent.toLocaleString(undefined, {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>{' '}
        of the way there!
      </p>
      <div className='flex justify-center'>
        <div className='mt-6 w-4/5 max-w-2xl'>
          <div className='rounded-full bg-hl-light'>
            <div
              style={{ width: `${(progressPercent * 100).toFixed(1)}%` }}
              className='relative h-5 rounded-full bg-accent'
            >
              <div className='absolute -top-3 -right-1 z-10'>
                <div className='w-8'>
                  <Image
                    src='/images/purr.png'
                    width={400}
                    height={400}
                    priority
                    alt='The cat has a hoodie'
                    title='Hoodie stays on'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-4 grid grid-cols-2 text-sm font-medium text-gray-300'>
            <div className='text-left'>0 PURR</div>
            <div className='text-right'>42,000 PURR</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
