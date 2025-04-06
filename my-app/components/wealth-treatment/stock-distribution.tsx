"use client"

import { Info } from "lucide-react"
import StackedBarChart from "@/components/ui/stackedbarchart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import styles from "./stock-distribution.module.css"

interface currentPositions {
  symbol: string
  currentValue: number
  projectedValue: number
}

interface recommendations {
  symbol: string
  percentage: number
}

interface StockDistributionProps {
  currentPositions: currentPositions[]
  recommendations: recommendations[]
}

export function StockDistribution({currentPositions, recommendations}: Partial<StockDistributionProps>) {
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
              <TooltipContent>
                View your current stock distribution and recommendations
              </TooltipContent>
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

              {/* Stacked Bar Chart - Existing Stock Portfolio ###################################################### */}
              <div className={styles.currentStocksPortfolioSection}>
                <h4 className={styles.subtitle}>Current Positions</h4>
                <StackedBarChart data={currentPositions} />
              </div>

              {/* Horizontal Bar Chart - New stock recommendations ###################################################### */}
              <div className={styles.recommendationsSection}>
                <h4 className={styles.subtitle}>New Recommendations</h4>
                <div className={styles.recommendationsList}>
                  <div className={styles.recommendations}>
                    {recommendations.map((stock) => (
                      <div key={stock.symbol} className={styles.recommendationItem}>
                        <span className={styles.symbol}>{stock.symbol}</span>
                        <div className={styles.barWrapper}>
                          <div className={styles.barContainer}>
                            <div
                              className={styles.bar}
                              style={{ width: `${stock.percentage}%` }}
                            />
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className={styles.infoIcon} />
                              </TooltipTrigger>
                              <TooltipContent>
                                Recommendation score: {stock.percentage}%
                              </TooltipContent>
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
            </TabsContent>
            
            <TabsContent value="others" className={styles.tabContent}>
              <div className={styles.emptyState}>No other positions</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
