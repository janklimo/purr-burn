'use client';

import { FC, useEffect, useState } from 'react';

import CopyToClipboard from '@/components/CopyToClipboard';
import UnderlineLink from '@/components/links/UnderlineLink';
import TradeCallout from '@/components/TradeCallout';

import Boxes from '@/app/make-a-difference/Boxes';
import FrequentlyAskedQuestions from '@/app/make-a-difference/FAQ';
import Gallery from '@/app/make-a-difference/Gallery';
import Leaderboard from '@/app/make-a-difference/Leaderboard';
import Progress from '@/app/make-a-difference/Progress';
import Shelter from '@/app/make-a-difference/Shelter';
import Updates from '@/app/make-a-difference/Updates';

import TermsModal from './TermsModal';

const Campaign: FC = () => {
  const [showTerms, setShowTerms] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const accepted = localStorage.getItem('termsAccepted');
    if (accepted === 'true') setShowTerms(false);
  }, []);

  const handleAcceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true');
    setShowTerms(false);
  };

  if (!mounted) return null;

  return (
    <>
      <TermsModal open={showTerms} onAccept={handleAcceptTerms} />
      <main>
        <section className='bg-hl-dark p-3 md:p-4'>
          <h1 className='font-serif text-white text-4xl md:text-5xl mb-5 text-center'>
            Make a Difference
          </h1>
          <p className='text-gray-300 text-center mb-12 px-5'>
            Gmeow! Help a cat shelter in need by donating PURR. Win a
            Hyperliquid plushie. Details below 👇
          </p>

          <div className='mb-8'>
            <Progress />
          </div>

          <div className='my-10 md:my-16'>
            <Updates />
          </div>

          <div className='my-10 md:my-16'>
            <h2 className='font-serif text-white text-3xl mb-5 text-center'>
              How to donate?
            </h2>
            <CopyToClipboard />
            <p className='text-hlGray text-center text-sm mt-2 px-5'>
              Send PURR to this address. By doing so, you agree to our{' '}
              <UnderlineLink href='/terms'>Terms of Use</UnderlineLink>.
            </p>
          </div>

          <div className='my-10 md:my-16'>
            <Leaderboard />
          </div>

          <div className='my-10 md:my-16'>
            <h2 className='font-serif text-3xl text-center text-white mb-6'>
              Making a Difference For...
            </h2>
            <p className='text-hlGray text-center text-sm mb-5 px-5'>
              These 100+ beautiful shelter residents
            </p>
            <Gallery />
            <Shelter />
            <Boxes />
          </div>
          <FrequentlyAskedQuestions />
          <TradeCallout />
        </section>
      </main>
    </>
  );
};

export default Campaign;
