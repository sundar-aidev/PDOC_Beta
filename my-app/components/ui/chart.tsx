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
  const chartData = data.map((item) => ({
    symbol: item.symbol,
    current: item.currentValue,
    projected: item.projectedValue,
  }))

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="symbol" axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 12 }} />
          <Tooltip
            cursor={false}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              padding: "8px",
            }}
          />
          <Bar dataKey="current" stackId="a" fill="#03bffd" radius={[0, 0, 0, 0]} />
          <Bar dataKey="projected" stackId="a" fill="#ffd4d4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}