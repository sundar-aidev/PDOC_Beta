"use client";

import { Info } from "lucide-react";
import StackedBarChart from "@/components/ui/stackedbarchart";
import HorizBarChart from "@/components/ui/horizBarChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import styles from "./stock-distribution.module.css";

interface CurrentPositions {
  symbol: string;
  currentValue: number;
  projectedValue: number;
}

interface Recommendation {
  symbol: string;
  percentage: number;
}

interface StockDistributionProps {
  currentPositions: CurrentPositions[];
  recommendations: Recommendation[];
}

export const regionData = [ 
  { RegionName: "North America", currentValue: 50, projectedValue: 20 },
  { RegionName: "Europe", currentValue: 30, projectedValue: 40 },
  { RegionName: "Asia", currentValue: 20, projectedValue: 30 },
 ];
export const industryData = [ 
  { GICS_Industry_Name: "Technology", currentValue: 40, projectedValue: 30 },
  { GICS_Industry_Name: "Healthcare", currentValue: 30, projectedValue: 20 },
  { GICS_Industry_Name: "Finance", currentValue: 20, projectedValue: 50 },
];
export const styleData = [ 
  { CategoryName: "Growth", currentValue: 60, projectedValue: 40 },
  { CategoryName: "Value", currentValue: 30, projectedValue: 20 },
  { CategoryName: "Blend", currentValue: 10, projectedValue: 40 },
 ];

export function StockDistribution({
  currentPositions,
  recommendations,
}: Partial<StockDistributionProps>) {
  const recommendationChartData = recommendations?.map((item) => ({
    stockName: item.symbol,
    currentValue: item.percentage,
  })) || [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Wealth Distribution Overview</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className={styles.infoIcon} />
              </TooltipTrigger>
              <TooltipContent>
                View your current and advidsed stock distribution across various categories like 
                industry, region, and investment style. The charts provide a clear overview of your
                portfolio's diversification and help identify areas for potential growth or adjustment.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.chartSection}>
          <Tabs defaultValue="others" className={styles.tabs}>
            <TabsList className={styles.tabsList}>
              <TabsTrigger value="others">Industry, Region, Investment Style</TabsTrigger>
              <TabsTrigger value="positions">Stocks</TabsTrigger>
            </TabsList>

            <TabsContent value="positions" className={styles.tabContent}>
              <div className={styles.currentStocksPortfolioSection}>
                <h4 className={styles.subtitle}>Current Positions</h4>
                <StackedBarChart data={currentPositions} />
              </div>

              <div className={styles.recommendationsSection}>
                <div className={styles.subtitleWrapper}>
                  <h4 className={styles.subtitle}>New Recommendations</h4>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className={styles.infoIcon} />
                      </TooltipTrigger>
                      <TooltipContent>
                        Recommendation scores are indicated as percentages.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <HorizBarChart data={recommendationChartData} />
              </div>
            </TabsContent>

            <TabsContent value="others" className={styles.tabContent}>
              <div>
                <HorizBarChart data={industryData} overlay />
              </div>
              <div>
                <HorizBarChart data={regionData} overlay />
              </div>
              <div>
                <HorizBarChart data={styleData} overlay />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
