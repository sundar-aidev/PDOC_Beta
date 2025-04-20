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
  overlay?: boolean;
  isBefore?: boolean;
  barColor?: string;
}

const StackedBarChart = ({ data, overlay = false, isBefore = false, barColor }: StackedBarChartProps) => {
  const labels = data.map(stock => stock.symbol);
  const currentValues = data.map(stock => stock.currentValue);
  const projectedValues = data.map(stock => stock.projectedValue);

  const finalColor = barColor || (isBefore ? '#b0b0b0' : '#03a9f4');

  const chartData = {
    labels,
    datasets: overlay
      ? [
          {
            data: projectedValues.map((value, index) => ({
              x: labels[index],
              y: [currentValues[index], value],
            })),
            backgroundColor: projectedValues.map((value, index) =>
              value >= currentValues[index] ? 'rgba(53, 253, 3, 0.75)' : '#FF9C9C'
            ),
            barThickness: 20,
            borderRadius: 2,
          },
          {
            data: currentValues.map((value, index) => ({
              x: labels[index],
              y: [0, value],
            })),
            backgroundColor: finalColor,
            barThickness: 20,
            borderRadius: 2,
            xAxisID: 'x2',
          },
        ]
      : [
          {
            label: 'Current Value',
            data: currentValues,
            backgroundColor: finalColor,
            barThickness: 20,
            borderRadius: 2,
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
            const index = context.dataIndex;
            const currValue = currentValues[index];
            const projValue = projectedValues[index];
            const diff = (projValue - currValue).toFixed(2);

            if (overlay && context.datasetIndex === 0) {
              return `Suggested Change: ${diff}`;
            }
            return `Current Value: ${currValue.toFixed(2)}`;
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
      <Bar data={chartData as any} options={options} />
    </div>
  );
};

export default StackedBarChart;
