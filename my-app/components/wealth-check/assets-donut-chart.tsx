"use client"

import { useState, useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import styles from "./assets-donut-chart.module.css"

interface GenericData {
  [key: string]: any
}

interface AssetsDonutChartProps {
  data: GenericData[]
  title: string
  selectedAsset?: string
}

export function AssetsDonutChart({ data, title, selectedAsset }: AssetsDonutChartProps) {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  // Dynamically determine label and value keys
  const labelKey = useMemo(() => {
    if (data.every(item => "assetCategory" in item)) return "assetCategory"
    if (data.every(item => "StockName" in item)) return "StockName"
    if (data.every(item => "stockName" in item)) return "stockName"
    if (data.every(item => "RegionName" in item)) return "RegionName"
    return "name"
  }, [data])

  const valueKey = useMemo(() => {
    if (data.every(item => "value" in item)) return "value"
    if (data.every(item => "current_amount" in item)) return "current_amount"
    if (data.every(item => "adj_Portfolio_Ratio" in item)) return "adj_Portfolio_Ratio"
    return "value"
  }, [data])

  const [activeAsset, setActiveAsset] = useState<string | null>(selectedAsset || null)
  const [lastClicked, setLastClicked] = useState<number | null>(null)

  const processedData = useMemo(() => {
    return data
      .filter((item: any) =>
        !(labelKey === "assetCategory" && item.assetCategory === "Total_AssetValue")
      )
      .map((item: any, index: number) => ({
        name: item[labelKey],
        value: item[valueKey] || 0,
        percentage: item.percentage || item.adj_Portfolio_Ratio || 0,
        color: item.color || getDefaultColor(index),
      }))
  }, [data, labelKey, valueKey])

  const getDefaultColor = (index: number) => {
    const defaultColors = [
      "#01579B", "#0277BD", "#0288D1", "#039BE5", "#03A9F4",
      "#29B6F6", "#4FC3F7", "#2D4E5F", "#062433", "#011F2D",
    ]
    return defaultColors[index % defaultColors.length]
  }

  const selectedAssetData = processedData.find((item) => item.name === activeAsset)

  const handlePieClick = (_: any, index: number) => {
    if (lastClicked === index) {
      setActiveAsset(null)
      setLastClicked(null)
    } else {
      setActiveAsset(processedData[index].name)
      setLastClicked(index)
    }
  }

  const getCenterText = () => {
    if (!activeAsset || !selectedAssetData) {
      const total = processedData.reduce((acc, item) => acc + item.value, 0)
      return `<strong>Total Value</strong><br />${currencyFormatter.format(total)}`
    }

    return `<strong>${selectedAssetData.name}</strong><br />${currencyFormatter.format(selectedAssetData.value)}`
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm text-blue-600">
            {currencyFormatter.format(payload[0].value)} ({payload[0].payload.percentage}%)
          </p>
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
              data={processedData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
              onClick={handlePieClick}
              startAngle={90}
              endAngle={-270}
              isAnimationActive={true}
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="white" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div
          className={styles.centerContent}
          dangerouslySetInnerHTML={{ __html: getCenterText() }}
        />

        <div className={styles.legend}>
          {processedData.map((item, index) => (
            <div
              key={index}
              className={`${styles.legendItem} ${
                activeAsset === item.name ? styles.active : ""
              }`}
              onClick={() => {
                setActiveAsset(item.name)
                setLastClicked(index)
              }}
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
