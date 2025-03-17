import styles from "./TotalPortfolio.module.css"

interface TotalPortfolioProps {
  value: string
}

export function TotalPortfolio({ value }: TotalPortfolioProps) {
  return (
    <div className={styles.container}>
      <div className={styles.label}>Total Portfolio</div>
      <div className={styles.value}>{value}</div>
    </div>
  )
}

