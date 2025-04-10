"use client"

import { Info } from "lucide-react"
import StackedBarChart from "@/components/ui/stackedbarchart"
import HorizBarChart from "@/components/ui/horizBarChart"
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

export const regionData = [
  {
    RegionName: "North America",
    currentValue: 0.35,
    projectedValue: 0.45,
  },
  {
    RegionName: "Europe",
    currentValue: 0.25,
    projectedValue: 0.2,
  },
  {
    RegionName: "Asia-Pacific",
    currentValue: 0.15,
    projectedValue: 0.2,
  },
  {
    RegionName: "Latin America",
    currentValue: 0.1,
    projectedValue: 0.08,
  },
  {
    RegionName: "Middle East & Africa",
    currentValue: 0.15,
    projectedValue: 0.07,
  },
];

export const industryData = [
  {
    GICS_Industry_Name: "Information Technology",
    currentValue: 0.4,
    projectedValue: 0.35,
  },
  {
    GICS_Industry_Name: "Healthcare",
    currentValue: 0.2,
    projectedValue: 0.25,
  },
  {
    GICS_Industry_Name: "Financials",
    currentValue: 0.15,
    projectedValue: 0.18,
  },
  {
    GICS_Industry_Name: "Consumer Discretionary",
    currentValue: 0.1,
    projectedValue: 0.12,
  },
  {
    GICS_Industry_Name: "Energy",
    currentValue: 0.15,
    projectedValue: 0.1,
  },
];

export const styleData = [
  {
    CategoryName: "Blue Chip",
    currentValue: 0.3,
    projectedValue: 0.25,
  },
  {
    CategoryName: "Large Cap",
    currentValue: 0.25,
    projectedValue: 0.3,
  },
  {
    CategoryName: "Mid Cap",
    currentValue: 0.2,
    projectedValue: 0.2,
  },
  {
    CategoryName: "Small Cap",
    currentValue: 0.15,
    projectedValue: 0.2,
  },
  {
    CategoryName: "Emerging Market",
    currentValue: 0.1,
    projectedValue: 0.05,
  },
];


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
              <div>
                <HorizBarChart data={industryData} overlay />
                <HorizBarChart data={regionData} overlay={false} />
                <HorizBarChart data={styleData} overlay />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
