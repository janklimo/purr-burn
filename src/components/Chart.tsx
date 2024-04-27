import {
  AgChartOptions,
  AgChartTheme,
  AgDonutSeriesOptions,
} from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';

const theme: AgChartTheme = {
  palette: {
    fills: ['#98FCE4', '#f69318', '#163832'],
    strokes: ['#163832'],
  },
};

function getData() {
  return [
    { asset: 'Circulating Supply', amount: 599584511, radius: 1 },
    { asset: 'Burn From Trading Fees', amount: 3015488, radius: 1.5 },
    { asset: 'Initial Burn', amount: 400000000, radius: 1 },
  ];
}

const Chart = () => {
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
        text: '599,584,508.24',
        margin: 4,
        fontSize: 26,
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        color: '#98FCE4',
      },
      {
        text: 'PURR',
        margin: 8,
        fontSize: 22,
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        color: '#98FCE4',
      },
    ],
  };

  const chartOptions: AgChartOptions = {
    data: getData(),
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
