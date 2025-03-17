"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import styles from "./AssetAllocationSlider.module.css"

interface AssetAllocationSliderProps {
  title: string
  value: number
  formattedValue: string
  percentage: number
  recommendedPercentage: number
  tooltipText?: string
  onChange: (value: number) => void
  isAdjustable?: boolean
  toleranceRange?: [number, number]
}

export function AssetAllocationSlider({
  title,
  value,
  formattedValue,
  percentage,
  recommendedPercentage,
  tooltipText,
  onChange,
  isAdjustable = true,
  toleranceRange = [recommendedPercentage - 5, recommendedPercentage + 5],
}: AssetAllocationSliderProps) {
  const [isWithinTolerance, setIsWithinTolerance] = useState(
    percentage >= toleranceRange[0] && percentage <= toleranceRange[1],
  )

  useEffect(() => {
    setIsWithinTolerance(percentage >= toleranceRange[0] && percentage <= toleranceRange[1])
  }, [percentage, toleranceRange])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value)
    onChange(newValue)
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {tooltipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className={styles.infoButton} aria-label={`Info about ${title}`}>
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
        <span className={styles.value}>{formattedValue}</span>
      </div>

      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrack}>
          {/* Blue recommendation area */}
          <div
            className={styles.recommendationArea}
            style={{
              left: `${toleranceRange[0]}%`,
              width: `${toleranceRange[1] - toleranceRange[0]}%`,
            }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={handleChange}
            disabled={!isAdjustable}
            className={`${styles.slider} ${isWithinTolerance ? styles.withinTolerance : ""}`}
            aria-label={`Adjust ${title} allocation`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percentage}
          />
        </div>

        <div className={styles.percentageLabels}>
          <span>0%</span>
          <span className={styles.currentPercentage}>{percentage}%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  )
}

