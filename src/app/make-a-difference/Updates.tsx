import { CheckCircleIcon } from '@heroicons/react/24/solid';
import shipping_1 from 'public/images/updates/shipping_1.png';
import shipping_2 from 'public/images/updates/shipping_2.png';
import shipping_3 from 'public/images/updates/shipping_3.png';
import { FC } from 'react';

import { classNames } from '@/lib/utils';

import UnderlineLink from '@/components/links/UnderlineLink';
import PhotoAlbum from '@/components/PhotoAlbum';

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
  {
    title: 'Funding goal reached! 🎉',
    description: (
      <div className='text-gray-400'>
        <p className='my-2'>Incredible 🤯</p>
        <p className='my-2'>
          It took just 3 hours and 16 minutes to reach our goal. Thank you
          everyone for your kindness and generosity. You can review all
          transactions on{' '}
          <UnderlineLink href='https://hypurrscan.io/address/0x16b9d3859E5A152b9Fca5A6f5b6527dA37618841'>
            HypurrScan
          </UnderlineLink>
          .
        </p>
        <p className='my-2'>
          To anyone still trying to donate PURR, thank you. However, there is a
          strict hard cap on the amount of PURR that can be donated so that I
          can wrap up the campaign and transfer the funds as a single transfer.
        </p>
      </div>
    ),
    date: new Date('2024-12-25T16:56:37Z').toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }),
  },
  {
    title: 'Plushies shipped',
    description: (
      <div className='text-gray-400'>
        <p className='my-2'>
          Shipped all 3 plushies. The total shipping cost is 6,276.5 THB
          (approx. $186.91).
        </p>
        <PhotoAlbum images={[shipping_1, shipping_2, shipping_3]} />
      </div>
    ),
    date: new Date('2024-01-24T05:20:00Z').toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }),
  },
  {
    title: 'Tokens sold',
    description: (
      <div className='text-gray-400'>
        <p className='my-2'>
          Successfully converted all remaining PURR tokens to USDC, bringing our
          total fundraising amount to 8,167.15821500 USDC. You can verify all
          transactions on{' '}
          <UnderlineLink href='https://hypurrscan.io/address/0x16b9d3859E5A152b9Fca5A6f5b6527dA37618841'>
            HypurrScan
          </UnderlineLink>
          .
        </p>
      </div>
    ),
    date: new Date('2025-01-30T03:29:14Z').toLocaleString(undefined, {
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
              <div className='flex-auto'>
                <div className='flex justify-between'>
                  <p className='py-0.5 text-sm'>
                    <span className='font-medium text-hlGray'>
                      {update.title}
                    </span>
                  </p>
                  <time
                    dateTime={update.date}
                    className='flex-none py-0.5 text-xs/5 text-gray-500'
                  >
                    {update.date}
                  </time>
                </div>
                {update.description && (
                  <p className='mt-3 text-xs text-white'>
                    {update.description}
                  </p>
                )}
              </div>
            </>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Updates;
