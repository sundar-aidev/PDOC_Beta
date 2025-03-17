"use client"

import { Info } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import styles from "./asset-allocation-cards.module.css"

interface AssetCard {
  title: string
  value: string
  percentage?: number
  tooltipText: string
  indicator?: "up" | "down" | "neutral"
}

interface AssetAllocationCardsProps {
  cards: AssetCard[]
}

export function AssetAllocationCards({ cards }: AssetAllocationCardsProps) {
  return (
    <div className={styles.container}>
      {cards.map((card, index) => (
        <Card key={index} className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className={styles.infoButton}>
                    <Info size={16} className={styles.infoIcon} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{card.tooltipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.valueContainer}>
              <span className={styles.value}>{card.value}</span>
              {card.indicator && (
                <span className={`${styles.indicator} ${styles[card.indicator]}`}>
                  {card.indicator === "up" ? "▲" : card.indicator === "down" ? "▼" : "■"}
                </span>
              )}
            </div>
            {card.percentage !== undefined && (
              <div className={styles.progressContainer}>
                <Progress value={card.percentage} className={styles.progress} />
                <div className={styles.percentageLabels}>
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}

