"use client"

import { Slider } from "@/components/ui/slider"
import styles from "./quantity-adjuster.module.css"

interface QuantityAdjusterProps {
  min?: number
  max?: number
  defaultValue?: number
  step?: number
  onChange?: (value: number) => void
}

export function QuantityAdjuster({ min = -10, max = 10, defaultValue = 0, step = 1, onChange }: QuantityAdjusterProps) {
  return (
    <div className={styles.container}>
      <span className={styles.minValue}>{min}</span>
      <Slider
        defaultValue={[defaultValue]}
        min={min}
        max={max}
        step={step}
        className={styles.slider}
        onValueChange={([value]) => onChange?.(value)}
      />
      <span className={styles.maxValue}>+{max}</span>
    </div>
  )
}

