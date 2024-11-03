import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';

const faqs = [
  {
    question: 'How does it work?',
    answer:
      'Transfer your JEFF dust to the address above. The amount gets converted to USDC at the current highest Bid price and sent back to you.',
  },
  {
    question: (
      <p>
        Why don't you call it <i>Bye, JEFF</i>?
      </p>
    ),
    answer: "That's disrespectful to the OG.",
  },
];

const FrequentlyAskedQuestions: FC = () => {
  return (
    <div className='mx-auto max-w-7xl px-6 py-16 sm:py-32 lg:px-8'>
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
