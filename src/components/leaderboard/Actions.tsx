'use client';

import { CustomCellRendererProps } from '@ag-grid-community/react';
import { FC } from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

import { useAddressStore } from '@/state/stores';

const Actions: FC<CustomCellRendererProps> = (params) => {
  const setAddress = useAddressStore((state) => state.setAddress);

  return (
    <div className='relative'>
      <UnderlineLink
        href={`https://app.hyperliquid.xyz/explorer/address/${params.value}`}
        className='mr-2'
      >
        Explorer 🕵️
      </UnderlineLink>
      <UnderlineLink
        href='#'
        onClick={(event) => {
          event.preventDefault();
          setAddress(params.value);
        }}
      >
        Zoom in 🔎
      </UnderlineLink>
    </div>
  );
};

export default Actions;
