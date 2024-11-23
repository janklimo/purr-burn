import { FC } from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

const Shelter: FC = () => {
  return (
    <>
      <div className='max-w-2xl mx-auto text-hlGray text-center text-sm'>
        <p className='my-6'>
          The cats call{' '}
          <UnderlineLink href='https://zilinskelabky.sk/' className='mr-2'>
            Žilinské labky ️🐱
          </UnderlineLink>
          their home - a shelter located in{' '}
          <UnderlineLink href='https://maps.app.goo.gl/VMqBQgEBBzYW5vNQ6'>
            Žilina, Slovakia
          </UnderlineLink>
          .
        </p>
        <p className='my-6'>
          Every day, the voluteers at Žilinské labky fight to give stray cats a
          second chance at life. The shelter is their sanctuary - but right now,
          its leaking roof threatens their safety. Help them repair their home
          so that they can continue protecting these vulnerable souls. Every
          PURR makes a difference.
        </p>
        <p className='my-6'>See their journey:</p>
      </div>
      <div className='flex justify-center mb-6'>
        <iframe
          width='672'
          height='378'
          src='https://www.youtube.com/embed/25YId7nEmmw?si=yowUtpAGKcafTl3H&cc_lang_pref=en&cc_load_policy=1'
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default Shelter;
