'use client';

import { CustomCellRendererProps } from '@ag-grid-community/react';
import { FC } from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

import useAddressFromURL from '@/app/hooks/use-address-from-url';
import { useAddressStore } from '@/state/stores';

interface Props {
  address: string;
  displayAddress: string;
}

const Actions: FC<CustomCellRendererProps<Props>> = (params) => {
  const setAddress = useAddressStore((state) => state.setAddress);
  const { setAddressParam } = useAddressFromURL();

  return (
    <div className='relative'>
      <UnderlineLink
        href={`https://app.hyperliquid.xyz/explorer/address/${params.value.address}`}
        className='mr-2'
      >
        Explorer 🕵️
      </UnderlineLink>
      <UnderlineLink
        href='#'
        onClick={(event) => {
          event.preventDefault();
          const value = params.value.displayAddress.includes('...')
            ? params.value.address // Full 0x form
            : params.value.displayAddress; // ENS name
          setAddress(value);
          setAddressParam(value);
        }}
      >
        Zoom in 🔎
      </UnderlineLink>
    </div>
  );
};

export default Actions;
