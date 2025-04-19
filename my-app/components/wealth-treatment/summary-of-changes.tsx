"use client";

import { Info } from "lucide-react";
import HorizBarChart from "@/components/ui/horizBarChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpeechBubble from "@/components/ui/speech-bubble";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import styles from "./summary-of-changes.module.css";

export const regionData = [
  { RegionName: "Small Caps", currentValue: 30, projectedValue: 40 },
  { RegionName: "Large Caps", currentValue: 20, projectedValue: 25 },
  { RegionName: "Blue Chip", currentValue: 10, projectedValue: 20 },
  { RegionName: "Emerging Markets", currentValue: 30, projectedValue: 10 },
  { RegionName: "Dividends", currentValue: 10, projectedValue: 5 },
];

export const industryData = [
  { GICS_Industry_Name: "Small Caps", currentValue: 30, projectedValue: 40 },
  { GICS_Industry_Name: "Large Caps", currentValue: 20, projectedValue: 25 },
  { GICS_Industry_Name: "Blue Chip", currentValue: 10, projectedValue: 20 },
  { GICS_Industry_Name: "Emerging Markets", currentValue: 30, projectedValue: 10 },
  { GICS_Industry_Name: "Dividends", currentValue: 10, projectedValue: 5 },
];

export const styleData = [
  { CategoryName: "Small Caps", currentValue: 30, projectedValue: 40 },
  { CategoryName: "Large Caps", currentValue: 20, projectedValue: 25 },
  { CategoryName: "Blue Chip", currentValue: 10, projectedValue: 20 },
  { CategoryName: "Emerging Markets", currentValue: 30, projectedValue: 10 },
  { CategoryName: "Dividends", currentValue: 10, projectedValue: 5 },
];

export function SummaryOfChanges() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Summary of Changes</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Click on the tabs below to see the changes in your portfolio.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Tabs defaultValue="structure" className={styles.tabs}>
        <TabsList className={styles.tabList}>
          <TabsTrigger value="structure">Portfolio Structure</TabsTrigger>
          <TabsTrigger value="positions">Individual Positions</TabsTrigger>
        </TabsList>

        <TabsContent value="structure">
          <div className={`${styles.sectionWrapper} ${styles.beforeSection}`}>
            <div className={styles.sectionHeaderRow}>
              <div className={styles.sectionHeader}>Before</div>
              <SpeechBubble side="right">
                Your Portfolio is generally well balanced. However, you could maximise your cash by increasing your stocks. Let's understand better below.
              </SpeechBubble>
            </div>
            <div className={styles.chartRow}>
              <HorizBarChart data={industryData} isBefore={true} />
              <HorizBarChart data={styleData} isBefore={true} />
              <HorizBarChart data={regionData}  isBefore={true} />
            </div>
          </div>

          <div className={`${styles.sectionWrapper} ${styles.afterSection}`}>
            <div className={styles.sectionHeaderRow}>
              <div className={styles.sectionHeader}>After</div>
              <SpeechBubble side="left">
                Your Portfolio is generally well balanced. However, you could maximise your cash by increasing your stocks. Let's understand better below.
              </SpeechBubble>
            </div>
            <div className={styles.chartRow}>
              <HorizBarChart data={industryData} isBefore={false} />
              <HorizBarChart data={styleData} isBefore={false} />
              <HorizBarChart data={regionData} isBefore={false} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="positions">
          <div className={styles.placeholder}>Individual Positions content goes here.</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
