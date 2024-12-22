'use client';

import { AgChartTheme } from '@ag-grid-community/core';
import {
  AgAreaSeriesOptions,
  AgCartesianSeriesTooltipRendererParams,
} from 'ag-charts-community';
import { AgCharts } from 'ag-charts-react';
import { FC } from 'react';

import Skeleton from '@/components/Skeleton';
import { colors } from '@/components/stats/Chart';

import { MarketStat } from '@/types/responses';

const theme: AgChartTheme = {
  palette: {
    fills: colors,
    strokes: colors,
  },
};

interface TransformedData {
  date: string;
  market_cap_hype: number;
  market_cap_purr: number;
  market_cap_hfun: number;
  market_cap_other: number;
  [key: `market_cap_${string}`]: number;
}

const transformData = (data: MarketStat[]): TransformedData[] => {
  return data
    .filter((stat) => stat.market_cap_hype > 0)
    .map((stat) => {
      const marketCapKeys = Object.keys(stat).filter((key) =>
        key.startsWith('market_cap_'),
      );

      // Calculate sum of other market caps
      const otherMarketCap = marketCapKeys
        .filter(
          (key) =>
            ![
              'market_cap_hype',
              'market_cap_purr',
              'market_cap_hfun',
              'market_cap_total',
            ].includes(key),
        )
        .reduce(
          (sum, key) => sum + (stat[key as keyof MarketStat] as number),
          0,
        );

      return {
        date: stat.date,
        market_cap_hype: stat.market_cap_hype,
        market_cap_purr: stat.market_cap_purr,
        market_cap_hfun: stat.market_cap_hfun,
        market_cap_other: otherMarketCap,
      };
    });
};

const tooltipRenderer = (params: AgCartesianSeriesTooltipRendererParams) => {
  const value = params.datum[params.yKey] as number;
  const total = Object.keys(params.datum)
    .filter((key) => key.startsWith('market_cap_'))
    .reduce((sum, key) => sum + (params.datum[key] as number), 0);
  const percentage = (value / total) * 100;
  return {
    title: `<b>${params.yName}</b> <small>(${params.datum.date})</small>`,
    content: `${percentage.toFixed(2)}%`,
  };
};

const series: AgAreaSeriesOptions[] = [
  {
    type: 'area' as const,
    xKey: 'date',
    yKey: 'market_cap_hype',
    yName: 'HYPE',
    normalizedTo: 100,
    stacked: true,
    tooltip: { renderer: tooltipRenderer },
  },
  {
    type: 'area' as const,
    xKey: 'date',
    yKey: 'market_cap_purr',
    yName: 'PURR',
    normalizedTo: 100,
    stacked: true,
    tooltip: { renderer: tooltipRenderer },
  },
  {
    type: 'area' as const,
    xKey: 'date',
    yKey: 'market_cap_hfun',
    yName: 'HFUN',
    normalizedTo: 100,
    stacked: true,
    tooltip: { renderer: tooltipRenderer },
  },
  {
    type: 'area' as const,
    xKey: 'date',
    yKey: 'market_cap_other',
    yName: 'Other',
    normalizedTo: 100,
    stacked: true,
    tooltip: { renderer: tooltipRenderer },
  },
];

interface Props {
  data: MarketStat[] | undefined;
}

const DominanceChart: FC<Props> = ({ data }) => {
  if (!data)
    return <Skeleton className='h-96 w-80 md:h-[35rem] md:w-[70rem]' />;

  const transformedData = transformData(data);

  return (
    <AgCharts
      options={{
        theme,
        background: { fill: '#0f1a1f' },
        title: {
          text: 'HYPE Dominance',
          color: 'white',
        },
        height: 700,
        padding: {
          top: 40,
          right: 25,
          bottom: 40,
          left: 25,
        },
        data: transformedData,
        series,
        axes: [
          {
            type: 'category',
            position: 'bottom',
            label: {
              color: '#9ca3af',
            },
          },
          {
            type: 'number',
            position: 'left',
            keys: [
              'market_cap_hype',
              'market_cap_purr',
              'market_cap_hfun',
              'market_cap_other',
            ],
            title: {
              text: 'Share',
              color: '#9ca3af',
            },
            gridLine: {
              style: [
                {
                  stroke: 'rgba(255, 255, 255, 0.2)',
                  lineDash: [4, 2],
                },
              ],
            },
            label: {
              color: '#9ca3af',
              format: '#{.0f}%',
            },
          },
        ],
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

export default DominanceChart;
