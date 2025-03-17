"use client"

import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import styles from "./AssetAllocationCard.module.css"

interface AssetAllocationCardProps {
  title: string
  value: string
  percentage: number
  tooltipText?: string
  showIndicator?: boolean
  indicatorDirection?: "up" | "down" | "neutral"
  isAdjustable?: boolean
  onAdjust?: (value: number) => void
}

export function AssetAllocationCard({
  title,
  value,
  percentage,
  tooltipText,
  showIndicator = false,
  indicatorDirection = "neutral",
  isAdjustable = false,
  onAdjust,
}: AssetAllocationCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {tooltipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className={styles.infoButton}>
                  <Info size={16} className={styles.infoIcon} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className={styles.valueContainer}>
        <span className={styles.value}>{value}</span>
        {showIndicator && (
          <span className={`${styles.indicator} ${styles[indicatorDirection]}`}>
            {indicatorDirection === "up" ? "▲" : indicatorDirection === "down" ? "▼" : "■"}
          </span>
        )}
      </div>

      <div className={styles.progressContainer}>
        {isAdjustable ? (
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="0"
              max="100"
              value={percentage}
              onChange={(e) => onAdjust && onAdjust(Number.parseInt(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.percentageLabels}>
              <span>0%</span>
              <span>100%</span>
            </div>
            {percentage > 0 && (
              <div className={styles.percentageMarker} style={{ left: `${percentage}%` }}>
                {percentage}%
              </div>
            )}
          </div>
        ) : (
          <>
            <Progress value={percentage} className={styles.progress} />
            <div className={styles.percentageLabels}>
              <span>0%</span>
              <span>100%</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

