"use client"

import Image from "next/image"
import styles from "./portfolio-analysis.module.css"

interface PortfolioAnalysisProps {
  analysisText: string
  iconSrc?: string
}

export function PortfolioAnalysis({ analysisText, iconSrc }: PortfolioAnalysisProps) {
  return (
    <div className={styles.container}>
      {iconSrc && (
        <div className={styles.iconContainer}>
          <Image src={iconSrc || "/placeholder.svg"} alt="" width={32} height={32} />
        </div>
      )}
      <p className={styles.analysisText}>{analysisText}</p>
    </div>
  )
}

