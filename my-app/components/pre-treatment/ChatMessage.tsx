import type React from "react"
import Image from "next/image"
import styles from "./ChatMessage.module.css"

export type MessageSender = "system" | "user" | "assistant"

interface ChatMessageProps {
  children: React.ReactNode
  sender: MessageSender
  avatar?: string
  className?: string
  isVisible?: boolean
}

export function ChatMessage({ children, sender, avatar, className = "", isVisible = true }: ChatMessageProps) {
  if (!isVisible) return null

  return (
    <div className={`${styles.messageContainer} ${styles[sender]} ${className}`}>
      {sender === "assistant" && (
        <div className={styles.avatarContainer}>
          <div className={styles.assistantAvatar}>
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Assistant"
              width={40}
              height={40}
              className={styles.avatar}
            />
          </div>
        </div>
      )}

      {sender === "user" && (
        <div className={styles.avatarContainer}>
          <Image
            src={avatar || "/placeholder.svg?height=40&width=40"}
            alt="User avatar"
            width={40}
            height={40}
            className={styles.avatar}
          />
        </div>
      )}

      <div className={styles.messageContent}>{children}</div>
    </div>
  )
}

