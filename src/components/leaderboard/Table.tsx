import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ColTypeDef, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { useCallback, useState } from 'react';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

import Actions from '@/components/leaderboard/Actions';

import { apiHost } from '@/constant/config';

import { formatPurrBalance } from '../../lib/formatters';

import { LeaderboardData, LeaderboardRowData } from '@/types/responses';

const columnDefs: ColDef<LeaderboardRowData>[] = [
  { field: 'rank' },
  { field: 'address', flex: 2, minWidth: 200 },
  {
    field: 'purr_balance',
    headerName: 'PURR Balance',
    type: ['purrBalance'],
    minWidth: 150,
  },
  {
    field: 'address',
    headerName: 'More',
    cellRenderer: Actions,
    minWidth: 200,
  },
];

const columnTypes: { [key: string]: ColTypeDef } = {
  purrBalance: {
    valueFormatter: formatPurrBalance,
  },
};

const defaultColDef = {
  editable: false,
  enableRowGroup: false,
  enablePivot: false,
  enableValue: false,
  filter: false,
  flex: 1,
  minWidth: 100,
};

const Table = () => {
  const [rowData, setRowData] = useState<LeaderboardRowData[]>([]);
  const [snapshotDate, setSnapshotDate] = useState<string>();

  const onGridReady = useCallback(() => {
    fetch(`${apiHost}/leaderboard`)
      .then<LeaderboardData>((resp) => resp.json())
      .then((data) => {
        setRowData(data.rows);
        setSnapshotDate(data.created_at);
      });
  }, []);

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

export default Table;
