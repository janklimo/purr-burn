import { ValueFormatterParams } from '@ag-grid-community/core';

export const formatPurrBalance = (params: ValueFormatterParams): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(params.value);
};

export const formatInteger = (params: ValueFormatterParams): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(params.value);
};

export const trimAddress = (address: string): string => {
  if (address.includes('.eth')) return address;

  return (
    address.substring(0, 6) + '...' + address.substring(address.length - 4)
  );
};

export const upArrow = '▲';
export const downArrow = '▼';
