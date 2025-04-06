"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import styles from "./chart.module.css"

interface StockPosition {
  symbol: string
  currentValue: number
  projectedValue: number
}

interface StockChartProps {
  data: StockPosition[]
}

export function StockChart({ data }: StockChartProps) {
  const chartData = data.map((item) => {
    const suggestedChange = item.projectedValue
    const adjustedPortfolio =
      suggestedChange < 0
        ? item.currentValue - Math.abs(suggestedChange)
        : item.currentValue

    return {
      symbol: item.symbol,
      adjustedPortfolio,
      suggestedChange: Math.abs(suggestedChange),
      isPositive: suggestedChange >= 0,
      originalSuggestedChange: suggestedChange,
      originalCurrentValue: item.currentValue,
    }
  })

  const maxY = Math.max(
    ...chartData.map((item) => item.adjustedPortfolio + item.suggestedChange),
  )

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="symbol"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666", fontSize: 12 }}
            domain={[0, maxY]}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.1)" }}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              padding: "8px",
            }}
            formatter={(value, name, props) => {
              if (name === "suggestedChange") {
                return [
                  `${props.payload.originalSuggestedChange.toFixed(2)}% (${props.payload.isPositive ? "Buy" : "Sell"})`,
                  "Suggested Change",
                ]
              }
              if (name === "adjustedPortfolio") {
                return [`${props.payload.originalCurrentValue.toFixed(2)}%`, "Adjusted Portfolio"]
              }
              return value
            }}
          />

          {/* Grey Bar: Adjusted Portfolio */}
          <Bar
            dataKey="adjustedPortfolio"
            fill="grey"
            barSize={15}
            radius={[2, 2, 0, 0]}
            stackId="overlay"
          />

          {/* Overlay Bar: Suggested Change */}
          <Bar
            dataKey="suggestedChange"
            barSize={15}
            radius={[2, 2, 0, 0]}
            stackId="overlay"
            shape={(props) => {
              const { x, y, width, height, payload } = props
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={payload.isPositive ? "green" : "red"}
                  rx={2}
                  ry={2}
                />
              )
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
