import type React from "react"
import { forwardRef } from "react"
import styles from "./input.module.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, ...props }, ref) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={`${styles.input} ${error ? styles.error : ""} ${className}`} ref={ref} {...props} />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
})

Input.displayName = "Input"

