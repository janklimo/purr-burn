import { FC } from 'react';

const Shelter: FC = () => {
  return (
    <>
      <h2 className='font-serif text-3xl text-center text-white mb-6'>
        Making a Difference For...
      </h2>
      <p className='text-hlGray text-sm text-center mb-8'>Background</p>
      <div className='flex justify-center mb-6'>
        <iframe
          width='560'
          height='315'
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
