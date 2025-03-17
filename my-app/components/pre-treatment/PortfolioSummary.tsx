import Image from "next/image"
import styles from "./PortfolioSummary.module.css"

interface PortfolioSummaryProps {
  portfolioName: string
  totalValue: string
  avatarSrc: string
}

export function PortfolioSummary({ portfolioName, totalValue, avatarSrc }: PortfolioSummaryProps) {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Image
          src={avatarSrc || "/placeholder.svg?height=64&width=64"}
          alt="Portfolio avatar"
          width={64}
          height={64}
          className={styles.avatar}
        />
      </div>
      <div className={styles.infoContainer}>
        <h3 className={styles.portfolioName}>{portfolioName}</h3>
        <p className={styles.portfolioValue}>{totalValue}</p>
      </div>
    </div>
  )
}

