'use client';

import { AgChartTheme } from '@ag-grid-community/core';
import { AgLineSeriesOptions } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-react';
import { FC } from 'react';

import { axesConfig, ChartType, generateCoinSeries } from '@/lib/stats/utils';

import Skeleton from '@/components/Skeleton';

import { useCoinStore } from '@/state/stores';

import { MarketStat } from '@/types/responses';

export const colors = [
  '#51D2C1', // Hyperliquid green
  '#FF6B6B', // Coral red
  '#FFD93D', // Bright yellow
  '#FF8C42', // Orange
  '#6A0572', // Deep purple
  '#4E9F3D', // Forest green
  '#F038FF', // Bright pink
  '#465775', // Steel blue
  '#D63AF9', // Vibrant purple
  '#7F8C8D', // Concrete gray
  '#00A8E8', // Azure blue
  '#9B59B6', // Amethyst purple
  '#2ECC71', // Emerald green
  '#E74C3C', // Crimson red
  '#3498DB', // Dodger blue
  '#1ABC9C', // Turquoise
  '#F1C40F', // Sunflower yellow
  '#34495E', // Wet asphalt
  '#16A085', // Green sea
  '#FFA500', // Classic orange
];

const theme: AgChartTheme = {
  palette: {
    fills: colors,
    strokes: colors,
  },
};

const lineSeriesOptions: AgLineSeriesOptions = {
  type: 'line',
  xKey: 'date',
  yKey: 'usdc_supply',
  yName: 'Bridged USDC',
  tooltip: {
    renderer: ({ datum, yName }) => ({
      title: `<b>${yName}</b> <small>(${datum.date})</small>`,
      content: datum.usdc_supply.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }),
    }),
  },
};

interface Props {
  data: MarketStat[] | undefined;
  type: ChartType;
}

const Chart: FC<Props> = ({ data, type }) => {
  const selectedCoin = useCoinStore((state) => state.selectedCoin);

  if (!data)
    return <Skeleton className='h-96 w-80 md:h-[35rem] md:w-[70rem]' />;

  const current = data[data.length - 1];

  const subtitleValue =
    type === 'marketCap' ? current.market_cap_total : current.volume_total;
  const subtitle = `Current total ${type === 'marketCap' ? 'market cap' : 'daily volume'}: ${subtitleValue.toLocaleString(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    },
  )}`;

  return (
    <AgCharts
      options={{
        theme,
        background: { fill: '#0f1a1f' },
        title: {
          text: type === 'marketCap' ? 'Spot market size' : 'Spot volume',
          color: 'white',
        },
        height: 700,
        subtitle: {
          text: subtitle,
          color: '#9ca3af',
          spacing: 40,
        },
        padding: {
          top: 40,
          right: 25,
          bottom: 40,
          left: 25,
        },
        data,
        series: [
          ...generateCoinSeries(current.sorted_token_names, type, selectedCoin),
          ...(type === 'marketCap' ? [lineSeriesOptions] : []),
        ],
        axes: axesConfig(current.sorted_token_names, type),
        legend: {
          position: 'bottom',
          item: {
            label: {
              color: '#9ca3af',
            },
          },
        },
      }}
    />
  );
};

export default Chart;
