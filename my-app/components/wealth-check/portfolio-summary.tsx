"use client"

import Image from "next/image"
import styles from "./portfolio-summary.module.css"

interface PortfolioSummaryProps {
  profileImage: string
  portfolioName: string
  holdingsCount: number
  portfolioScore: number
  maxScore: number
  message: string
}

export function PortfolioSummary({
  profileImage,
  portfolioName,
  holdingsCount,
  portfolioScore,
  maxScore,
  message,
}: PortfolioSummaryProps) {
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.profileImageContainer}>
          <Image
            src={profileImage || "/placeholder.svg"}
            alt="Profile"
            width={64}
            height={64}
            className={styles.profileImage}
          />
        </div>
        <div className={styles.portfolioInfo}>
          <h1 className={styles.portfolioName}>{portfolioName}</h1>
          <p className={styles.holdingsCount}>{holdingsCount} Holdings</p>
        </div>
      </div>

      <div className={styles.scoreSection}>
        <div className={styles.scoreLabel}>Portfolio Score</div>
        <div className={styles.scoreValue}>
          <span className={styles.score}>{portfolioScore}</span>
          <span className={styles.maxScore}>/{maxScore}</span>
        </div>
      </div>

      <div className={styles.messageSection}>
        <div className={styles.messageIcon}>
          <Image src="/icons/portfolio-icon.svg" alt="" width={24} height={24} />
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  )
}

