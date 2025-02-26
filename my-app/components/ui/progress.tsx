import styles from "./progress.module.css"

interface ProgressProps {
  value: number
  max?: number
  className?: string
}

export const Progress = ({ value, max = 100, className = "" }: ProgressProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={`${styles.container} ${className}`}>
      <div
        className={styles.bar}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  )
}

