import type React from "react"
import styles from "./progress-bar.module.css"

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100, className }) => {
  const percentage = (value / max) * 100

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

