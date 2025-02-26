import type React from "react"
import { forwardRef } from "react"
import styles from "./button.module.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", className, ...props }, ref) => {
    return (
      <button className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`} ref={ref} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

