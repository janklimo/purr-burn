import {
  AgAreaSeriesOptions,
  AgCartesianAxisOptions,
  AgSeriesTooltipRendererParams,
} from 'ag-charts-community';

import { MarketStat } from '@/types/responses';

export type ChartType = 'marketCap' | 'volume';

const tooltipContentMarketCap = (
  params: AgSeriesTooltipRendererParams<MarketStat>,
  coin: string,
): string => {
  const mc = params.datum[`market_cap_${coin}`];
  const marketCap = mc.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  const marketShare = (mc / params.datum.market_cap_total).toLocaleString(
    'en-US',
    {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );

  return `<div><b>Market cap</b>: ${marketCap}</div>
          <div><b>Share</b>: ${marketShare}</div>`;
};

const tooltipContentVolume = (
  params: AgSeriesTooltipRendererParams<MarketStat>,
  coin: string,
): string => {
  const vol = params.datum[`volume_${coin}`];
  const volume = vol.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  const volumeShare = (vol / params.datum.volume_total).toLocaleString(
    'en-US',
    {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );

  return `<div><b>Daily volume</b>: ${volume}</div>
          <div><b>Share</b>: ${volumeShare}</div>`;
};

const isSeriesVisible = (coin: string, selectedCoin: string): boolean => {
  switch (selectedCoin) {
    case 'All':
      return true;
    case 'Strict':
      return [
        'CATBAL',
        'HFUN',
        'JEFF',
        'OMNIX',
        'POINTS',
        'PURR',
        'RAGE',
        'SCHIZO',
      ].includes(coin.toUpperCase());
    default:
      return coin.toUpperCase() === selectedCoin.toUpperCase();
  }
};

export const generateCoinSeries = (
  coins: string[],
  type: ChartType,
  selectedCoin: string,
): AgAreaSeriesOptions[] => {
  return coins.map((coin) => ({
    type: 'area',
    stacked: true,
    xKey: 'date',
    yKey: type === 'marketCap' ? `market_cap_${coin}` : `volume_${coin}`,
    yName: coin.toUpperCase(),
    visible: isSeriesVisible(coin, selectedCoin),
    connectMissingData: true,
    tooltip: {
      renderer: (params) => ({
        title: `<b>${params.yName}</b> <small>(${params.datum.date})</small>`,
        content:
          type === 'marketCap'
            ? tooltipContentMarketCap(params, coin)
            : tooltipContentVolume(params, coin),
      }),
    },
  }));
};

export const axesConfig = (
  coins: string[],
  type: ChartType,
): AgCartesianAxisOptions[] => {
  const keys = coins.map((coin) =>
    type === 'marketCap' ? `market_cap_${coin}` : `volume_${coin}`,
  );

  const axes: AgCartesianAxisOptions[] = [
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
      keys,
      title: {
        text: type === 'marketCap' ? 'Market cap' : 'Daily volume',
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
        formatter: (params) =>
          `${(params.value / 1_000_000).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          })}M`,
      },
    },
  ];

  const bridgedUsdcAxis: AgCartesianAxisOptions = {
    type: 'number',
    position: 'right',
    keys: ['usdc_supply'],
    title: {
      text: 'Bridged USDC',
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
      formatter: (params) =>
        `${(params.value / 1_000_000).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        })}M`,
    },
  };

  return [...axes, ...(type === 'marketCap' ? [bridgedUsdcAxis] : [])];
};
