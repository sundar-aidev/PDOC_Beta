"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import styles from "./assets-donut-chart.module.css"

interface AssetData {
  name: string
  value: number
  percentage: number
  color: string
}

interface AssetsDonutChartProps {
  data: AssetData[]
  title: string
  selectedAsset?: string
}

export function AssetsDonutChart({ data, title, selectedAsset }: AssetsDonutChartProps) {
  const [activeAsset, setActiveAsset] = useState(selectedAsset || data[0]?.name)

  const selectedAssetData = data.find((item) => item.name === activeAsset)

  const handlePieClick = (data: any, index: number) => {
    setActiveAsset(data.payload.name)
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm text-blue-600">{`${payload[0].value.toLocaleString()}€ (${payload[0].payload.percentage}%)`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
              onClick={handlePieClick}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className={styles.centerContent}>
          {selectedAssetData && (
            <>
              <div className={styles.assetName}>{selectedAssetData.name}</div>
              <div className={styles.assetValue}>{selectedAssetData.value.toLocaleString()}€</div>
            </>
          )}
        </div>

        <div className={styles.legend}>
          {data.map((item, index) => (
            <div
              key={index}
              className={`${styles.legendItem} ${activeAsset === item.name ? styles.active : ""}`}
              onClick={() => setActiveAsset(item.name)}
            >
              <div className={styles.legendColor} style={{ backgroundColor: item.color }} />
              <div className={styles.legendPercentage}>{item.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

