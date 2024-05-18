import { CellClassParams, ColTypeDef } from '@ag-grid-community/core';

import { formatPurrBalance } from '@/lib/formatters';

import Actions from '@/components/leaderboard/Actions';

import { ChangesRowData } from '@/types/responses';

const cellColorFormatter = (params: CellClassParams<ChangesRowData>) => {
  if (params.value > 0) return { color: '#98FCE4' };
  if (params.value < 0) return { color: '#ed7088' };

  return { color: 'white' };
};

export const defaultColDef = {
  editable: false,
  enableRowGroup: false,
  enablePivot: false,
  enableValue: false,
  filter: false,
  flex: 1,
  minWidth: 100,
};

export const columnTypes: { [key: string]: ColTypeDef } = {
  moreActions: {
    headerName: 'More',
    valueGetter: (params) => ({
      address: params.data?.address,
      displayAddress: params.data?.display_address,
    }),
    cellRenderer: Actions,
    minWidth: 200,
  },
  purrBalance: {
    valueFormatter: formatPurrBalance,
  },
  colorHighlight: {
    cellStyle: cellColorFormatter,
  },
};
