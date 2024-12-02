import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  ModuleRegistry,
  ValueFormatterParams,
  ValueGetterParams,
} from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { useCallback, useEffect, useState } from 'react';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { columnTypes, defaultColDef } from '@/components/tables/shared';

import useWebSocketData from '@/app/hooks/use-websocket-data';
import { apiHost } from '@/constant/config';
import { useActiveTableStore } from '@/state/stores';

import {
  downArrow,
  formatInteger,
  formatPurrBalance,
  upArrow,
} from '../../lib/formatters';

import { ChangesData, ChangesRowData } from '@/types/responses';

/**
 * Table value getters and formatters.
 */
const purrChangeFormatter = (
  params: ValueFormatterParams<ChangesRowData>,
): string => {
  const balanceValue = Math.abs(
    params.data?.balance_difference_absolute || 0,
  ).toLocaleString('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const change = params.data?.balance_difference_percent || 0;

  let percentValue = Math.abs(change).toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  /**
   * When an account goes from 0 to N balance, show infinity. Otherwise round to 0%
   * for very tiny changes.
   */
  if (change === 0) percentValue = '∞%';

  return withArrow(params.value, `${balanceValue} (${percentValue})`);
};

const purrBalanceValueGetter = (
  params: ValueGetterParams<ChangesRowData>,
  price: string | undefined,
) => {
  const purrBalance = Number(params.data?.balance_difference_absolute);

  if (!purrBalance || !price) return null;

  return purrBalance * parseFloat(price);
};

const purrBalanceValueFormatter = (params: ValueFormatterParams): string => {
  if (!params.value) return '...';

  const value = Math.abs(params.value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return withArrow(params.value, value);
};

const withArrow = (numericValue: number, formattedValue: string): string => {
  if (numericValue === 0) return formattedValue;

  return numericValue > 0
    ? `${upArrow} ${formattedValue}`
    : `${downArrow} ${formattedValue}`;
};

const rankDifferenceFormatter = (
  params: ValueFormatterParams<ChangesRowData>,
): string => {
  const value = params.value.toLocaleString('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return withArrow(params.value, value);
};

const ChangesTable = () => {
  const [rowData, setRowData] = useState<ChangesRowData[]>([]);
  const [snapshotDate, setSnapshotDate] = useState<string>();
  const data = useWebSocketData();
  const activeTable = useActiveTableStore((state) => state.activeTable);
  const activePeriod = useActiveTableStore((state) => state.activePeriod);

  const onGridReady = useCallback(() => {
    setRowData([]);

    fetch(`${apiHost}/changes?type=${activeTable}&period=${activePeriod}`)
      .then<ChangesData>((resp) => resp.json())
      .then((data) => {
        setRowData(data.rows);
        setSnapshotDate(data.created_at);
      });
  }, [activeTable, activePeriod]);

  useEffect(onGridReady, [activeTable, activePeriod, onGridReady]);

  const columnDefs: ColDef<ChangesRowData>[] = [
    {
      headerName: '',
      field: 'rank',
      width: 80,
      pinned: 'left',
    },
    {
      field: 'display_address',
      headerName: 'Address',
      pinned: 'left',
      width: 170,
    },
    {
      field: 'balance',
      headerName: 'Balance (PURR)',
      valueFormatter: formatPurrBalance,
      minWidth: 150,
    },
    {
      field: 'balance_difference_absolute',
      headerName: 'Change (PURR)',
      type: ['colorHighlight'],
      valueFormatter: purrChangeFormatter,
      minWidth: 150,
      flex: 3,
    },
    {
      field: 'balance_difference_absolute',
      headerName: 'Change (USD)',
      type: ['colorHighlight'],
      valueGetter: (params) => purrBalanceValueGetter(params, data?.markPx),
      valueFormatter: purrBalanceValueFormatter,
      minWidth: 150,
    },
    {
      field: 'balance_rank',
      headerName: 'Rank',
      valueFormatter: formatInteger,
      width: 80,
    },
    {
      field: 'rank_difference',
      headerName: 'Rank change',
      type: ['colorHighlight'],
      valueFormatter: rankDifferenceFormatter,
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
          columnTypes={columnTypes}
          columnDefs={columnDefs}
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

export default ChangesTable;
