"use client"

import Link from "next/link"
import styles from "./recommendation-box.module.css"

interface RecommendationBoxProps {
  title: string
  description: string
  actionLink: string
  actionText: string
}

export function RecommendationBox({ title, description, actionLink, actionText }: RecommendationBoxProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.action}>
        <Link href={actionLink} className={styles.actionLink}>
          {actionText} <span className={styles.actionIcon}>✓</span>
        </Link>
      </div>
    </div>
  )
}

