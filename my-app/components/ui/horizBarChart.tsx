// HorizBarChart.tsx (Modified)
"use client";

import styles from "./horizBarChart.module.css";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { MdDashboard, MdBusiness, MdPublic } from "react-icons/md";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface DataItem {
  RegionName?: string;
  GICS_Industry_Name?: string;
  CategoryName?: string;
  stockName?: string;
  currentValue: number;
  projectedValue?: number;
}

interface HorizBarChartProps {
  data: DataItem[];
  overlay?: boolean;
  barColor?: string; // <- new prop
  isBefore?: boolean; // <- optional fallback logic
}

const HorizBarChart: React.FC<HorizBarChartProps> = ({ data, overlay = false, barColor, isBefore }) => {
  const getLabels = () =>
    data.map(
      (item) =>
        item.RegionName ||
        item.GICS_Industry_Name ||
        item.CategoryName ||
        item.stockName ||
        ""
    );

  const getTitleIcon = () => {
    const first = data[0];
    if (first?.RegionName)
      return (
        <>
          <MdPublic className={styles.icon} />
          <span>Region</span>
        </>
      );
    if (first?.GICS_Industry_Name)
      return (
        <>
          <MdBusiness className={styles.icon} />
          <span>Industry</span>
        </>
      );
    if (first?.CategoryName)
      return (
        <>
          <MdDashboard className={styles.icon} />
          <span>Investment Style</span>
        </>
      );
    if (first?.stockName) return <span></span>;
    return <span>Distribution</span>;
  };

  const finalColor = barColor || (isBefore ? "#b0b0b0" : "#03a9f4");

  const chartData = {
    labels: getLabels(),
    datasets: overlay
      ? [
          {
            data: data.map((item) => ({
              x: [item.currentValue, item.projectedValue ?? item.currentValue],
              y:
                item.RegionName ||
                item.GICS_Industry_Name ||
                item.CategoryName ||
                item.stockName ||
                "",
            })),
            backgroundColor: (ctx: any) => {
              const index = ctx.dataIndex;
              const base = data[index].currentValue;
              const newVal = data[index].projectedValue ?? base;
              return newVal >= base ? "rgba(53, 253, 3, 0.75)" : "rgba(255, 156, 156, 1)";
            },
            barThickness: 20,
            borderRadius: {
              topLeft: 0,
              bottomLeft: 0,
              topRight: 2,
              bottomRight: 2,
            },
            borderSkipped: false,
          },
          {
            data: data.map((item) => ({
              x: [0, item.currentValue],
              y:
                item.RegionName ||
                item.GICS_Industry_Name ||
                item.CategoryName ||
                item.stockName ||
                "",
            })),
            backgroundColor: finalColor,
            barThickness: 20,
            borderRadius: {
              topLeft: 0,
              bottomLeft: 0,
              topRight: 2,
              bottomRight: 2,
            },
            borderSkipped: false,
            yAxisID: "y2",
          },
        ]
      : [
          {
            label: "Current Value",
            data: data.map((item) => item.currentValue),
            backgroundColor: finalColor,
            barThickness: 20,
            borderRadius: {
              topLeft: 0,
              bottomLeft: 0,
              topRight: 2,
              bottomRight: 2,
            },
            borderSkipped: false,
          },
        ],
  };

  const chartOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const index = context.dataIndex;
            const base = data[index].currentValue;
            const newVal = data[index].projectedValue ?? base;
            const change = (newVal - base).toFixed(2);
            if (overlay && context.datasetIndex === 0) {
              return `Suggested Change: ${change}`;
            }
            return `Current Value: ${base.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        beginAtZero: true,
      },
      y: {
        stacked: false,
      },
      y2: {
        display: false,
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>{getTitleIcon()}</h1>
      </div>
      <div className={styles.chart}>
        <Bar data={chartData as any} options={chartOptions} />
      </div>
    </div>
  );
};

export default HorizBarChart;
