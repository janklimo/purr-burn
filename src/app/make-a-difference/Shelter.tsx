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
        <p className='my-6 mb-12'>
          Every day, the voluteers at Žilinské labky fight to give stray cats a
          second chance at life. The shelter is their sanctuary - but right now,
          its leaking roof threatens their safety. Help them repair their home
          so that they can continue protecting these vulnerable souls. Every
          PURR makes a difference.
        </p>
      </div>
      <div className='flex justify-center mb-12'>
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
      <div className='max-w-2xl mx-auto text-hlGray text-center text-sm'>
        <p className='my-6'>
          Beyond the immediate need for shelter renovation, there are
          significant monthly operating costs to keep the rescued animals
          healthy and comfortable. The shelter spends approximately $735 monthly
          just on food and litter to care for their residents.
        </p>
        <p className='my-6'>
          Additionally, each new rescue requires about $135 in essential
          veterinary care, including vaccinations, microchipping,
          spaying/neutering, and parasite prevention. These costs can increase
          significantly if animals arrive injured or ill, sometimes requiring
          emergency surgery or specialized medical treatment. These medical
          procedures ensure the animals stay healthy and ready for their forever
          homes.
        </p>
        <p className='my-6'>
          Any additional funds raised will help the shelter establish new
          quarantine units with proper isolation capabilities. These specialized
          enclosures are essential for preventing the spread of highly
          contagious diseases like panleukopenia among the shelter's cats.
          Having dedicated quarantine spaces would significantly improve the
          shelter's ability to contain disease outbreaks and provide better care
          for sick animals while protecting the healthy ones.
        </p>
      </div>
    </>
  );
};

export default Shelter;
