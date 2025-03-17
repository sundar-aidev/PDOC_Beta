"use client"

import { useState } from "react"
import { Info } from "lucide-react"
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
          <div className={styles.categoriesList}>
            {categories.style.map((category, index) => (
              <CategoryBar key={index} category={category} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="region" className={styles.tabsContent}>
          <div className={styles.categoriesList}>
            {categories.region.map((category, index) => (
              <CategoryBar key={index} category={category} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="industry" className={styles.tabsContent}>
          <div className={styles.categoriesList}>
            {categories.industry.map((category, index) => (
              <CategoryBar key={index} category={category} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className={styles.percentageScale}>
        <div className={styles.scaleLabels}>
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
        <div className={styles.scaleLines}>
          <div className={styles.scaleLine} />
          <div className={styles.scaleLine} />
          <div className={styles.scaleLine} />
          <div className={styles.scaleLine} />
          <div className={styles.scaleLine} />
        </div>
      </div>
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

