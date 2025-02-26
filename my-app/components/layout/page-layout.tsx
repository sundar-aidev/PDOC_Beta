import type React from "react"
import styles from "./page-layout.module.css"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>{children}</main>
    </div>
  )
}

