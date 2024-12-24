'use client';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { FC, useState } from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

interface Props {
  open: boolean;
  onAccept: () => void;
}

const TermsModal: FC<Props> = ({ open, onAccept }) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <Dialog open={open} onClose={() => null} className='relative z-50'>
      <DialogBackdrop className='fixed inset-0 bg-hl-light/75 backdrop-filter backdrop-blur-sm' />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel className='relative transform rounded-lg bg-hl-dark p-6 text-left shadow-xl w-full max-w-md'>
            <DialogTitle
              as='h3'
              className='text-2xl font-serif text-white mb-4'
            >
              Terms of Use
            </DialogTitle>
            <div className='text-hlGray mb-6 text-sm'>
              <p className='mb-4'>
                Before participating in the fundraising campaign, please read
                and accept our{' '}
                <UnderlineLink href='/terms' target='_blank'>
                  Terms of Use
                </UnderlineLink>
                .
              </p>
              <p>
                By accepting, you acknowledge that you have read and agree to be
                bound by the terms.
              </p>
            </div>

            <div className='mb-6'>
              <label className='flex items-center text-white cursor-pointer text-sm'>
                <input
                  type='checkbox'
                  className='rounded border-gray-300 text-hl-primary focus:ring-hl-primary mr-2'
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                I accept the Terms of Use
              </label>
            </div>

            <button
              onClick={onAccept}
              disabled={!accepted}
              className='w-full bg-hl-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed py-2 px-4 rounded transition-opacity'
            >
              Continue
            </button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default TermsModal;
