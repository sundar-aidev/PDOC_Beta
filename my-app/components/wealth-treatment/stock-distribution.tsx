"use client"

import { Info } from "lucide-react"
import { StockChart } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import styles from "./stock-distribution.module.css"

const mockStockPositions = [
  { symbol: "AAPL", currentValue: 75, projectedValue: 25 },
  { symbol: "NVDA", currentValue: 60, projectedValue: 20 },
  { symbol: "MSFT", currentValue: 55, projectedValue: 15 },
  { symbol: "TSLA", currentValue: 45, projectedValue: 15 },
  { symbol: "GOOGL", currentValue: 35, projectedValue: 10 },
  { symbol: "AMZN", currentValue: 30, projectedValue: 10 },
]

const mockRecommendations = [
  { symbol: "APP", percentage: 65 },
  { symbol: "PLTR", percentage: 45 },
  { symbol: "HOOD", percentage: 35 },
  { symbol: "BYRN", percentage: 25 },
  { symbol: "CDXC", percentage: 15 },
]

export function StockDistribution() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Stock Distribution</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className={styles.infoIcon} />
              </TooltipTrigger>
              <TooltipContent>View your current stock distribution and recommendations</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.chartSection}>
          <Tabs defaultValue="positions" className={styles.tabs}>
            <TabsList className={styles.tabsList}>
              <TabsTrigger value="positions">Positions</TabsTrigger>
              <TabsTrigger value="others">Others</TabsTrigger>
            </TabsList>
            <TabsContent value="positions" className={styles.tabContent}>
              <div className={styles.positionsHeader}>Current Positions</div>
              <StockChart data={mockStockPositions} />
            </TabsContent>
            <TabsContent value="others" className={styles.tabContent}>
              <div className={styles.emptyState}>No other positions</div>
            </TabsContent>
          </Tabs>
        </div>

        <div className={styles.recommendationsSection}>
          <h4 className={styles.subtitle}>New Recommendations</h4>
          <div className={styles.recommendationsList}>
            <div className={styles.recommendations}>
              {mockRecommendations.map((stock) => (
                <div key={stock.symbol} className={styles.recommendationItem}>
                  <span className={styles.symbol}>{stock.symbol}</span>
                  <div className={styles.barWrapper}>
                    <div className={styles.barContainer}>
                      <div className={styles.bar} style={{ width: `${stock.percentage}%` }} />
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className={styles.infoIcon} />
                        </TooltipTrigger>
                        <TooltipContent>Recommendation score: {stock.percentage}%</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.chartGrid}>
              {[0, 25, 50, 75, 100].map((value) => (
                <div key={value} className={styles.gridLine}>
                  <div className={styles.gridLineTrack} />
                  <span className={styles.gridValue}>{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}