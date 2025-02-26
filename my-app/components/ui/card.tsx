import type React from "react"
import styles from "./card.module.css"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card = ({ children, className = "" }: CardProps) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>
}

export const CardHeader = ({ children, className = "" }: CardProps) => {
  return <div className={`${styles.header} ${className}`}>{children}</div>
}

export const CardContent = ({ children, className = "" }: CardProps) => {
  return <div className={`${styles.content} ${className}`}>{children}</div>
}

