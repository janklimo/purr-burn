import { useWindowSize } from '@uidotdev/usehooks';
import {
  AgChartOptions,
  AgChartTheme,
  AgDonutSeriesOptions,
} from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';
import { FC } from 'react';

const theme: AgChartTheme = {
  palette: {
    fills: ['#98FCE4', '#f69318', '#163832'],
    strokes: ['#163832'],
  },
};

interface Props {
  supply: number;
}

const Chart: FC<Props> = ({ supply }) => {
  const { width } = useWindowSize();

  const data = [
    { asset: 'Circulating Supply', amount: supply, radius: 1 },
    {
      asset: 'Burn From Trading Fees',
      amount: 600_000_000 - supply,
      radius: 1.5,
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
    innerLabels: [
      {
        text: 'Circulating Supply',
        fontWeight: 'bold',
        color: '#bcc4c2',
        margin: 10,
      },
      {
        text: supply.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        margin: 4,
        fontSize: Number(width) > 768 ? 24 : 18,
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        color: '#98FCE4',
      },
      {
        text: 'PURR',
        margin: 8,
        fontSize: Number(width) > 768 ? 22 : 16,
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        color: '#98FCE4',
      },
    ],
  };

  const chartOptions: AgChartOptions = {
    data,
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

  return <AgChartsReact options={chartOptions} />;
};

export default Chart;
