import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  ModuleRegistry,
  ValueFormatterParams,
  ValueGetterParams,
} from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { useCallback, useState } from 'react';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { columnTypes, defaultColDef } from '@/components/tables/shared';

import useWebSocketData from '@/app/hooks/use-websocket-data';
import { apiHost } from '@/constant/config';

import { LeaderboardData, LeaderboardRowData } from '@/types/responses';

/**
 * Table value getters and formatters.
 */
const purrShareValueGetter = (
  params: ValueGetterParams<LeaderboardRowData>,
  supply: string | undefined,
) => {
  const purrBalance = Number(params.data?.balance);

  if (!purrBalance || !supply) return null;

  const circulatingSupply = parseFloat(supply);

  return purrBalance / circulatingSupply;
};

const purrShareValueFormatter = (params: ValueFormatterParams): string => {
  if (!params.value) return '...';

  return params.value.toLocaleString('en-US', {
    style: 'percent',
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
};

const purrBalanceValueGetter = (
  params: ValueGetterParams<LeaderboardRowData>,
  price: string | undefined,
) => {
  const purrBalance = Number(params.data?.balance);

  if (!purrBalance || !price) return null;

  return purrBalance * parseFloat(price);
};

const purrBalanceValueFormatter = (params: ValueFormatterParams): string => {
  if (!params.value) return '...';

  return params.value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const HoldersTable = () => {
  const [rowData, setRowData] = useState<LeaderboardRowData[]>([]);
  const [snapshotDate, setSnapshotDate] = useState<string>();
  const data = useWebSocketData();

  const onGridReady = useCallback(() => {
    fetch(`${apiHost}/leaderboard`)
      .then<LeaderboardData>((resp) => resp.json())
      .then((data) => {
        setRowData(data.rows);
        setSnapshotDate(data.created_at);
      });
  }, []);

  const columnDefs: ColDef<LeaderboardRowData>[] = [
    { field: 'rank', pinned: 'left', width: 80 },
    { field: 'display_address', headerName: 'Address', pinned: 'left' },
    {
      field: 'balance',
      headerName: 'PURR Balance',
      type: ['purrBalance'],
      minWidth: 150,
    },
    {
      field: 'balance',
      headerName: '% Total',
      valueGetter: (params) =>
        purrShareValueGetter(params, data?.circulatingSupply),
      valueFormatter: purrShareValueFormatter,
      minWidth: 150,
    },
    {
      field: 'balance',
      headerName: 'Value (USD)',
      valueGetter: (params) => purrBalanceValueGetter(params, data?.markPx),
      valueFormatter: purrBalanceValueFormatter,
      minWidth: 150,
    },
    {
      field: 'address',
      type: ['moreActions'],
    },
  ];

  return (
    <div className='w-full h-[40rem] mb-8'>
      <div className='ag-theme-material-dark w-full h-full'>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          columnTypes={columnTypes}
          defaultColDef={defaultColDef}
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSizeSelector={false}
          onGridReady={onGridReady}
          localeText={{
            noRowsToShow: 'Loading...',
          }}
          enableCellTextSelection
        />
      </div>
      {snapshotDate && (
        <p className='text-right text-xs text-hlGray mt-2'>
          Last refreshed: {snapshotDate}
        </p>
      )}
    </div>
  );
};

export default HoldersTable;
