"use client"

import Image from "next/image"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import styles from "./holdings-list.module.css"

interface Holding {
  logo: string
  name: string
  percentage: number
  isOverweight: boolean
  isUnderweight: boolean
  tooltipText: string
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
        {holdings.map((holding, index) => {
          const isBalanced = !holding.isOverweight && !holding.isUnderweight

          const tagText = holding.isOverweight
            ? "Oversized"
            : holding.isUnderweight
            ? "Undersized"
            : "Balanced"

          const bubbleClass = !isBalanced
            ? styles.holdingBubbleFlagged
            : styles.holdingBubbleNeutral

          const tagClass = holding.isOverweight
            ? styles.overweightTag
            : holding.isUnderweight
            ? styles.underweightTag
            : styles.balancedTag

          return (
            <div key={index} className={styles.holdingWrapper}>
              <div className={`${styles.holdingBubble} ${bubbleClass}`}>
                <div className={styles.holdingRow}>
                  <div className={styles.logoContainer}>
                    <Image
                      src={holding.logo || "/placeholder.svg"}
                      alt={holding.name}
                      width={24}
                      height={24}
                      className={styles.logo}
                    />
                  </div>

                  <div className={styles.middleSection}>
                    <div className={styles.topRow}>
                      <span className={styles.holdingName}>{holding.name}</span>
                      <span className={styles.percentageText}>{holding.percentage}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div
                        className={`${styles.progress} ${
                          holding.isOverweight
                            ? styles.overweight
                            : holding.isUnderweight
                            ? styles.underweight
                            : ""
                        }`}
                        style={{ width: `${Math.min(holding.percentage * 5, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className={styles.statusBlock}>
                    {/* Info icon on the LEFT if balanced, otherwise on the RIGHT */}
                    {isBalanced && (
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

                    <span className={`${styles.tag} ${tagClass}`}>{tagText}</span>

                    {!isBalanced && (
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
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
