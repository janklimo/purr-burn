import { useWindowSize } from '@uidotdev/usehooks';
import {
  AgChartOptions,
  AgChartTheme,
  AgDonutSeriesOptions,
  AgSeriesTooltipRendererParams,
} from 'ag-charts-community';
import { AgCharts } from 'ag-charts-react';
import { FC } from 'react';

import Skeleton from '@/components/Skeleton';

import useWebSocketData from '@/app/hooks/use-websocket-data';

const SERIES_NAMES = {
  CIRCULATING_OTHER: 'Circulating Supply: Other',
  CIRCULATING_ASSISTANCE_FUND: 'Circulating Supply: Assistance Fund',
  BURN_TRADING_FEES: 'Burn From Trading Fees',
  INITIAL_BURN: 'Initial Burn',
} as const;

type SeriesName = (typeof SERIES_NAMES)[keyof typeof SERIES_NAMES];

const colors = ['#98FCE4', '#9afdff', '#f69318', '#2a4d46', '#163832'];

const theme: AgChartTheme = {
  palette: {
    fills: colors,
    strokes: colors,
  },
};

interface Props {
  data: ReturnType<typeof useWebSocketData>;
  assistanceFundBalance: number;
}

interface Segment {
  asset: SeriesName;
  amount: number;
  displayAmount: number;
  radius: number;
  circulatingSupply?: number;
}

const tooltipContent = (
  params: AgSeriesTooltipRendererParams<Segment>,
): { title: string; content: string } => {
  const value = params.datum.displayAmount;
  const amount = `${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} PURR`;

  // Determine title color based on segment
  const isDarkTitle = (asset: SeriesName): boolean =>
    asset === SERIES_NAMES.CIRCULATING_OTHER ||
    asset === SERIES_NAMES.CIRCULATING_ASSISTANCE_FUND;

  const titleStyle = isDarkTitle(params.datum.asset) ? 'color: #03251F;' : '';

  const shareOfTotal = `${(value / 1_000_000_000).toLocaleString('en-US', {
    style: 'percent',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })}`;

  let content = `<div><b>Amount</b>: ${amount}</div>`;

  // Add Share of Circulating for Assistance Fund
  if (
    params.datum.asset === SERIES_NAMES.CIRCULATING_ASSISTANCE_FUND &&
    params.datum.circulatingSupply
  ) {
    const shareOfCirculating = `${(
      value / params.datum.circulatingSupply
    ).toLocaleString('en-US', {
      style: 'percent',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    })}`;
    content += `<div><b>Share of Circulating</b>: ${shareOfCirculating}</div>`;
  }

  content += `<div><b>Share of Total</b>: ${shareOfTotal}</div>`;

  return {
    title: `<b style="${titleStyle}">${params.datum.asset}</b>`,
    content,
  };
};

const Chart: FC<Props> = ({ data, assistanceFundBalance }) => {
  const { width } = useWindowSize();

  if (!data)
    return <Skeleton className='h-96 w-80 md:h-[35rem] md:w-[70rem]' />;

  const circulatingSupply = parseFloat(data.circulatingSupply);

  // Calculate minimum segment size for better visibility
  const minVisiblePercentage = 0.3;
  const burntAmount = 600_000_000 - circulatingSupply;
  const minSegmentSize = (1_000_000_000 * minVisiblePercentage) / 100;

  const otherCirculatingSupply = circulatingSupply - assistanceFundBalance;

  const series = [
    {
      asset: SERIES_NAMES.CIRCULATING_OTHER,
      amount: otherCirculatingSupply,
      displayAmount: otherCirculatingSupply,
      radius: 1,
    },
    {
      asset: SERIES_NAMES.CIRCULATING_ASSISTANCE_FUND,
      amount: assistanceFundBalance,
      displayAmount: assistanceFundBalance,
      radius: 1,
      circulatingSupply,
    },
    {
      asset: SERIES_NAMES.BURN_TRADING_FEES,
      amount: Math.max(burntAmount, minSegmentSize),
      displayAmount: burntAmount,
      radius: 1,
    },
    {
      asset: SERIES_NAMES.INITIAL_BURN,
      amount: 400_000_000,
      displayAmount: 400_000_000,
      radius: 1,
    },
  ];

  const seriesOptions: AgDonutSeriesOptions = {
    type: 'donut',
    calloutLabelKey: 'asset',
    angleKey: 'amount',
    innerRadiusRatio: 0.7,
    calloutLabel: {
      enabled: false,
    },
    radiusKey: 'radius',
    tooltip: {
      renderer: tooltipContent,
    },
    listeners: {
      nodeClick: (event) => {
        if (event.datum.asset === SERIES_NAMES.CIRCULATING_ASSISTANCE_FUND) {
          window.open(
            'https://hypurrscan.io/address/0xccd69f432ce1d8c9cdc31bd535dd11b37cbea4ea',
            '_blank',
          );
        }
      },
    },
  };

  const chartOptions: AgChartOptions = {
    data: series,
    width: Number(width) > 768 ? 1120 : 320,
    height: Number(width) > 768 ? 560 : 384,
    theme,
    background: {
      fill: '#03251F',
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    series: [seriesOptions],
    legend: {
      spacing: 10,
      maxWidth: 350,
      item: {
        paddingX: 32,
        paddingY: 8,
        label: {
          color: '#bcc4c2',
        },
      },
    },
  };

  return <AgCharts options={chartOptions} />;
};

export default Chart;
