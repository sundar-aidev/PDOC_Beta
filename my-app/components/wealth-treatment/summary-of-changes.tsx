"use client";

import { Info } from "lucide-react";
import HorizBarChart from "@/components/ui/horizBarChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
              <div className={styles.speechBubbleWrapperRight}>
                <div className={styles.speechBubble}>
                  Your Portfolio is generally well balanced. However, you could maximise your cash by increasing your stocks. Lets understand better below.
                  <div className={styles.speechTail} />
                </div>
                <div className={styles.icon}></div>
              </div>
            </div>
            <div className={styles.chartRow}>
              <HorizBarChart data={industryData} labelKey="GICS_Industry_Name" isBefore={true} />
              <HorizBarChart data={styleData} labelKey="CategoryName" isBefore={true} />
              <HorizBarChart data={regionData} labelKey="RegionName" isBefore={true} />
            </div>
          </div>

          <div className={`${styles.sectionWrapper} ${styles.afterSection}`}>
            <div className={styles.sectionHeaderRow}>
              <div className={styles.sectionHeader}>After</div>
              <div className={styles.speechBubbleWrapperRight}>
                <div className={styles.speechBubble}>
                  Your Portfolio is generally well balanced. However, you could maximise your cash by increasing your stocks. Lets understand better below.
                  <div className={styles.speechTail} />
                </div>
                <div className={styles.icon}></div>
              </div>
            </div>
            <div className={styles.chartRow}>
              <HorizBarChart data={industryData} labelKey="GICS_Industry_Name" isBefore={false} />
              <HorizBarChart data={styleData} labelKey="CategoryName" isBefore={false} />
              <HorizBarChart data={regionData} labelKey="RegionName" isBefore={false} />
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