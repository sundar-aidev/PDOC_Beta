import styles from "./AssetAllocationCards.module.css"

interface AssetAllocation {
  title: string
  value: string
  percentage: number
  tooltipText?: string
}

interface AssetAllocationCardsProps {
  allocations: AssetAllocation[]
}

export function AssetAllocationCards({ allocations }: AssetAllocationCardsProps) {
  return (
    <div className={styles.grid}>
      {allocations.map((allocation, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.header}>
            <span className={styles.title}>{allocation.title}</span>
            <span className={styles.infoIcon}>ⓘ</span>
          </div>
          <div className={styles.value}>{allocation.value}</div>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${allocation.percentage}%` }}></div>
            </div>
            <div className={styles.percentageLabels}>
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

