'use client';

import { DocumentDuplicateIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';
import { toast } from 'sonner';
import { useCopyToClipboard } from 'usehooks-ts';

const address = '0x16b9d3859E5A152b9Fca5A6f5b6527dA37618841';

const CopyToClipboard: FC = () => {
  const [_, copy] = useCopyToClipboard();

  const handleCopy = () => {
    copy(address).then(() => {
      toast('Copied to clipboard 👍', {
        duration: 2000,
      });
    });
  };

  return (
    <div className='flex justify-center items-center'>
      <span className='bg-inputBlack font-mono text-xs md:text-base text-gray-200 rounded-lg px-4 md:px-6 py-3 md:py-4 mr-2'>
        {address}
      </span>
      <DocumentDuplicateIcon
        onClick={handleCopy}
        className='size-5 text-gray-200 hover:text-hl-primary transition duration-400 cursor-pointer'
      />
    </div>
  );
};

export default CopyToClipboard;
