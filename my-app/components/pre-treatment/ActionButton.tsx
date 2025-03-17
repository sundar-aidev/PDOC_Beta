import Link from "next/link"
import styles from "./ActionButton.module.css"

interface ActionButtonProps {
  text: string
  href: string
  isVisible?: boolean
}

export function ActionButton({ text, href, isVisible = true }: ActionButtonProps) {
  if (!isVisible) return null

  return (
    <Link href={href} className={styles.button}>
      {text} &gt;
    </Link>
  )
}

