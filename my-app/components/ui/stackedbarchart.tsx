"use client";

import styles from './stackedbarchart.module.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface StockPosition {
  symbol: string;
  currentValue: number;
  projectedValue: number;
}

interface StackedBarChartProps {
  data: StockPosition[];
}

const StackedBarChart = ({ data }: StackedBarChartProps) => {
  const labels = data.map(stock => stock.symbol);
  const currentValues = data.map(stock => stock.currentValue);
  const projectedValues = data.map(stock => stock.projectedValue);

  const greyBarData = currentValues.map((value, index) => ({
    x: labels[index],
    y: [0, value],
  }));

  const overlayBarData = projectedValues.map((value, index) => {
    const currValue = currentValues[index];
    return {
      x: labels[index],
      y: [currValue, value],
    };
  });

  const chartData = {
    labels,
    datasets: [
      {
        data: overlayBarData,
        backgroundColor: projectedValues.map((value, index) => (value >= currentValues[index] ? 'rgba(53, 253, 3, 0.75)' : '#FF9C9C')),
        barThickness: 20,
        borderRadius: 2,
      },
      {
        data: greyBarData,
        backgroundColor: '#03bffd',
        barThickness: 20,
        borderRadius: 2,
        xAxisID: 'x2',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            const datasetIndex = context.datasetIndex;
            const index = context.dataIndex;

            if (datasetIndex === 0) {
              const projValue = projectedValues[index];
              const currValue = currentValues[index];
              const difference = (projValue - currValue).toFixed(4);
              return `Suggested Change: ${difference}`;
            } else if (datasetIndex === 1) {
              const currValue = currentValues[index];
              return `Current Value: ${currValue.toFixed(4)}`;
            }
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      x2: {
        display: false,
      },
      y: {
        stacked: false,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.container}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StackedBarChart;