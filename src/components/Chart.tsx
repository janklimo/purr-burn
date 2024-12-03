import { useWindowSize } from '@uidotdev/usehooks';
import {
  AgChartOptions,
  AgChartTheme,
  AgDonutSeriesOptions,
} from 'ag-charts-community';
import { AgCharts } from 'ag-charts-react';
import { FC } from 'react';

import Skeleton from '@/components/Skeleton';

import useWebSocketData from '@/app/hooks/use-websocket-data';

const theme: AgChartTheme = {
  palette: {
    fills: ['#98FCE4', '#f69318', '#163832'],
    strokes: ['#98FCE4', '#f69318', '#163832'],
  },
};

interface Props {
  data: ReturnType<typeof useWebSocketData>;
}

const Chart: FC<Props> = ({ data }) => {
  const { width } = useWindowSize();

  if (!data)
    return <Skeleton className='h-96 w-80 md:h-[35rem] md:w-[70rem]' />;

  const circulatingSupply = parseFloat(data.circulatingSupply);

  const series = [
    { asset: 'Circulating Supply', amount: circulatingSupply, radius: 1 },
    {
      asset: 'Burn From Trading Fees',
      amount: 600_000_000 - circulatingSupply,
      radius: 1.4,
    },
    { asset: 'Initial Burn', amount: 400_000_000, radius: 1 },
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
      renderer: (params) => ({
        title: params.datum.asset,
        content: `${params.datum.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PURR`,
      }),
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
