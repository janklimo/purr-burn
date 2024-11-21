import { FC } from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

const Shelter: FC = () => {
  return (
    <>
      <p className='text-hlGray text-sm text-center mb-8'>
        Their home is civic organization{' '}
        <UnderlineLink href='https://zilinskelabky.sk/' className='mr-2'>
          Žilinské labky ️🐱
        </UnderlineLink>
        located in{' '}
        <UnderlineLink href='https://maps.app.goo.gl/VMqBQgEBBzYW5vNQ6'>
          Žilina, Slovakia
        </UnderlineLink>
        .
      </p>
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
