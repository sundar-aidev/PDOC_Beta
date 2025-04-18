"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import HorizBarChart from "@/components/ui/horizBarChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import styles from "./investment-style.module.css"

interface StyleCategory {
  name: string
  percentage: number
  tooltipText?: string
}

interface InvestmentStyleProps {
  categories: {
    style: StyleCategory[]
    region: StyleCategory[]
    industry: StyleCategory[]
  }
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


export function InvestmentStyle({ categories }: InvestmentStyleProps) {
  const [activeTab, setActiveTab] = useState("style")

  const getActiveCategories = () => {
    switch (activeTab) {
      case "style":
        return categories.style
      case "region":
        return categories.region
      case "industry":
        return categories.industry
      default:
        return categories.style
    }
  }

  return (
    <div className={styles.container}>
      <Tabs defaultValue="style" onValueChange={setActiveTab}>
        <TabsList className={styles.tabsList}>
          <TabsTrigger value="style" className={styles.tabsTrigger}>
            Investment Style
          </TabsTrigger>
          <TabsTrigger value="region" className={styles.tabsTrigger}>
            Region
          </TabsTrigger>
          <TabsTrigger value="industry" className={styles.tabsTrigger}>
            Industry
          </TabsTrigger>
        </TabsList>

        <TabsContent value="style" className={styles.tabsContent}>
          <div>
            <HorizBarChart data={styleData} overlay />
          </div>
        </TabsContent>

        <TabsContent value="region" className={styles.tabsContent}>
          <div>
            <HorizBarChart data={regionData} overlay />
          </div>
        </TabsContent>

        <TabsContent value="industry" className={styles.tabsContent}>
          <div>
            <HorizBarChart data={styleData} overlay />
          </div>
        </TabsContent>
      </Tabs>

    </div>
  )
}

function CategoryBar({ category }: { category: StyleCategory }) {
  return (
    <div className={styles.categoryItem}>
      <div className={styles.categoryName}>{category.name}</div>
      <div className={styles.categoryBarContainer}>
        <div className={styles.categoryBar} style={{ width: `${category.percentage}%` }} />
      </div>
      {category.tooltipText && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className={styles.infoButton}>
                <Info size={16} className={styles.infoIcon} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{category.tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}

