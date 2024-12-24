import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

const faqs = [
  {
    question: 'Why this shelter?',
    answer: (
      <p>
        They face an urgent challenge: their facility needs critical repairs to
        protect their animals from the upcoming winter. What sets them apart is
        their commitment to complete financial transparency - as a registered
        charity, they maintain a public account where you can track every
        donation and see exactly how your money helps their animals. You can
        review all of their transactions{' '}
        <UnderlineLink href='https://ib.fio.sk/ib/transparent?a=2201410531'>
          here
        </UnderlineLink>
        .
      </p>
    ),
  },
  {
    question: 'Can you be trusted?',
    answer:
      "Many of you know me personally. I will provide proof of all token transfers, and you'll be able to verify the donations on the shelter's public account once the funds are received.",
  },
  {
    question: 'Will you sell PURR once the target is reached?',
    answer:
      'Unfortunately, yes. Since the shelter can only accept traditional currency, I will need to convert the raised PURR tokens into fiat before transferring the funds. ',
  },
  {
    question: 'Why was my PURR donation returned to me?',
    answer:
      "Thank you for trying to help! There is a hard limit on how much we're raising, so any extra donations get sent back automatically.",
  },
  {
    question: "I'm a Top 3 donor. How do I claim my prize?",
    answer: (
      <p>
        <UnderlineLink href='https://etherscan.io/verifiedsignatures'>
          Sign
        </UnderlineLink>{' '}
        a message containing your Discord name with your wallet and DM me on
        Discord: <span className='font-mono'>jan1667</span>
      </p>
    ),
  },
];

const FrequentlyAskedQuestions: FC = () => {
  return (
    <div className='mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8'>
      <div className='mx-auto max-w-4xl divide-y divide-white/10'>
        <h2 className='font-serif text-3xl text-center text-white'>FAQ</h2>
        <dl className='mt-10 space-y-6 divide-y divide-white/10'>
          {faqs.map((faq, index) => (
            <Disclosure key={index} as='div' className='pt-6'>
              <dt>
                <DisclosureButton className='group flex w-full items-start justify-between text-left text-white'>
                  <span className='text-base font-semibold leading-7'>
                    {faq.question}
                  </span>
                  <span className='ml-6 flex h-7 items-center'>
                    <PlusIcon
                      aria-hidden='true'
                      className='h-6 w-6 group-data-[open]:hidden'
                    />
                    <MinusIcon
                      aria-hidden='true'
                      className='h-6 w-6 [.group:not([data-open])_&]:hidden'
                    />
                  </span>
                </DisclosureButton>
              </dt>
              <DisclosurePanel as='dd' className='mt-2 pr-12'>
                <p className='text-sm text-left leading-5 text-gray-300'>
                  {faq.answer}
                </p>
              </DisclosurePanel>
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
