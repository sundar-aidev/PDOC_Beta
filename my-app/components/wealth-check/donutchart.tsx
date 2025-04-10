"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useState, useRef } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

interface AssetChartData {
  stockName: string;
  value: number;
  percentage: number;
  color: string;
}

interface DonutChartProps {
  dataInput: AssetChartData[];
}

const DonutChart: React.FC<DonutChartProps> = ({ dataInput }) => {
  const [centerText, setCenterText] = useState(() => {
    if (!dataInput || dataInput.length === 0) {
      return "No data available.";
    }
    const totalValue = dataInput.reduce((acc, item) => acc + item.value, 0);
    return `Total Asset Value:<br/>${totalValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })}`;
  });

  const [lastClickedSlice, setLastClickedSlice] = useState<number | null>(null);
  const chartRef = useRef<ChartJS<"doughnut">>(null);

  const labels = dataInput.map((item) => item.stockName);
  const datasetValues = dataInput.map((item) => item.value);
  const backgroundColors = dataInput.map((item) => item.color);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Asset Allocation",
        data: datasetValues,
        backgroundColor: backgroundColors,
        borderColor: "#ffffff",
        borderWidth: 1,
        hoverOffset: 20,
        cutout: "60%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 20 },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (tooltipItem: any) => tooltipItem.label },
      },
      datalabels: {
        color: "white",
        font: { weight: "bold", size: 14 },
        formatter: (value: number, context: any) => {
          const total = context.dataset.data.reduce((acc: number, val: number) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        anchor: "end",
        backgroundColor: (context: any) => context.dataset.backgroundColor[context.dataIndex],
        borderRadius: 50,
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        display: "auto",
      },
    },
    onClick: (event: any) => {
      const chart = chartRef.current;
      if (!chart) return;

      const slice = chart.getElementsAtEventForMode(event, "nearest", { intersect: true }, true);
      if (slice.length > 0) {
        const elementIndex = slice[0].index;
        const label = labels[elementIndex];

        if (lastClickedSlice === elementIndex) {
          const totalValue = dataInput.reduce((acc, item) => acc + item.value, 0);
          setCenterText(
            `Total Asset Value:<br/>${totalValue.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}`
          );
          setLastClickedSlice(null);
        } else {
          const selectedItem = dataInput[elementIndex];
          setCenterText(
            `${label}:<br/>${selectedItem.value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}`
          );
          setLastClickedSlice(elementIndex);
        }
      }
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Doughnut data={chartData} options={options} ref={chartRef} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <p
          style={{ fontSize: "18px", fontWeight: "bold", color: "white" }}
          dangerouslySetInnerHTML={{ __html: centerText }}
        />
      </div>
    </div>
  );
};

export default DonutChart;
