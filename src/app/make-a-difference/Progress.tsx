import { FC } from 'react';

const Progress: FC = () => {
  return (
    <div>
      <p className='text-hlGray text-sm text-center'>
        We've collected{' '}
        <span className='font-bold text-accent'>12,389.21 PURR</span> – we're{' '}
        <span className='font-bold text-accent'>43%</span> of the way there!
      </p>
      <div className='flex justify-center'>
        <div className='mt-6 w-4/5 max-w-2xl'>
          <div className='overflow-hidden rounded-full bg-hl-light'>
            <div
              style={{ width: '37.5%' }}
              className='h-2 rounded-full bg-accent'
            />
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
