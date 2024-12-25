import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';

import { classNames } from '@/lib/utils';

const updates = [
  {
    title: 'Campaign started 🚀',
    date: new Date('2024-12-25T13:40:00Z').toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }),
  },
];

const Updates: FC = () => {
  return (
    <div className='max-w-xl mx-auto'>
      <h2 className='font-serif text-3xl text-center text-white mb-6'>
        Updates
      </h2>
      <ul role='list' className='space-y-6'>
        {updates.map((update, index) => (
          <li key={update.title} className='relative flex gap-x-4'>
            <div
              className={classNames(
                index === updates.length - 1 ? 'h-6' : '-bottom-6',
                'absolute left-0 top-0 flex w-6 justify-center',
              )}
            >
              <div className='w-1 bg-hl-light' />
            </div>
            <>
              <div className='relative flex size-6 flex-none items-center justify-center'>
                <CheckCircleIcon
                  aria-hidden='true'
                  className='size-6 text-hl-primary bg-hl-dark'
                />
              </div>
              <p className='flex-auto py-0.5 text-xs/5 text-gray-500'>
                <span className='font-medium text-hlGray'>{update.title}</span>
              </p>
              <time
                dateTime={update.date}
                className='flex-none py-0.5 text-xs/5 text-gray-400'
              >
                {update.date}
              </time>
            </>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Updates;
