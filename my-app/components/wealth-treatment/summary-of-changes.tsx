"use client";

import { Info } from "lucide-react";
import HorizBarChart from "@/components/ui/horizBarChart";
import StackedBarChart from "@/components/ui/stackedbarchart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpeechBubble from "@/components/ui/speech-bubble";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import styles from "./summary-of-changes.module.css";

interface DataItem {
  RegionName?: string;
  GICS_Industry_Name?: string;
  CategoryName?: string;
  stockName?: string;
  currentValue: number;
  projectedValue: number;
}

interface StockPosition {
  symbol: string;
  currentValue: number;
  projectedValue: number;
}

interface SummaryOfChangesProps {
  industryData: DataItem[];
  styleData: DataItem[];
  regionData: DataItem[];
  stockPositions: StockPosition[];
}

export function SummaryOfChanges({ industryData, styleData, regionData, stockPositions }: SummaryOfChangesProps) {
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
              <HorizBarChart data={regionData} isBefore={true} />
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
          <div className={`${styles.sectionWrapper} ${styles.beforeSection}`}>
            <div className={styles.sectionHeaderRow}>
              <div className={styles.sectionHeader}>Before</div>
              <SpeechBubble side="right">
                Your Portfolio is generally well balanced. However, you could maximise your cash by increasing your stocks. Let's understand better below.
              </SpeechBubble>
            </div>
            <div className={styles.chartRow}>
              <StackedBarChart data={stockPositions} isBefore={true} />
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
              <StackedBarChart data={stockPositions} isBefore={false} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
