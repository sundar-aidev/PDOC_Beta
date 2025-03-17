"use client"

import Image from "next/image"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import styles from "./holdings-list.module.css"

interface Holding {
  logo: string
  name: string
  percentage: number
  isOverweight?: boolean
  tooltipText?: string
}

interface HoldingsListProps {
  holdings: Holding[]
  title: string
}

export function HoldingsList({ holdings, title }: HoldingsListProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title} Holdings</h2>
      <div className={styles.holdingsList}>
        {holdings.map((holding, index) => (
          <div key={index} className={styles.holdingItem}>
            <div className={styles.holdingInfo}>
              <div className={styles.logoContainer}>
                <Image
                  src={holding.logo || "/placeholder.svg"}
                  alt={holding.name}
                  width={24}
                  height={24}
                  className={styles.logo}
                />
              </div>
              <div className={styles.holdingName}>{holding.name}</div>
            </div>

            <div className={styles.holdingDetails}>
              <div className={styles.percentageContainer}>
                <span className={styles.percentage}>{holding.percentage}%</span>
                {holding.isOverweight && <span className={styles.overweightTag}>Oversized</span>}
              </div>

              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div
                    className={`${styles.progress} ${holding.isOverweight ? styles.overweight : ""}`}
                    style={{ width: `${Math.min(holding.percentage * 5, 100)}%` }}
                  />
                </div>
              </div>

              {holding.tooltipText && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className={styles.infoButton}>
                        <Info size={16} className={styles.infoIcon} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{holding.tooltipText}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

