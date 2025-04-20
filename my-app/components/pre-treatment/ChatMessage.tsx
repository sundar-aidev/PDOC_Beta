"use client";

import React from "react";
import Image from "next/image";
import styles from "./ChatMessage.module.css";

export type MessageSender = "system" | "user" | "assistant";

interface ChatMessageProps {
  children: React.ReactNode;
  sender: MessageSender;
  avatar?: string;
  className?: string;
  isVisible?: boolean;
}

export function ChatMessage({
  children,
  sender,
  avatar = "/placeholder.svg",
  className = "",
  isVisible = true,
}: ChatMessageProps) {
  if (!isVisible) return null;

  const side = sender === "user" ? "right" : "left";

  return (
    <div className={`${styles.wrapper} ${styles[side]} ${className}`}>
      {side === "left" && (
        <div className={styles.logoWrapper}>
          <Image
            src={avatar}
            alt={`${sender} avatar`}
            width={40}
            height={40}
            className={styles.logo}
          />
        </div>
      )}

      <div className={`${styles.bubbleWrapper} ${styles[`${side}Align`]}`}>
        <div className={`${styles.bubble} ${styles[sender]}`}>
          {children}
          <div className={`${styles.tail} ${side === "right" ? styles.rightTail : styles.leftTail}`} />
        </div>
      </div>

      {side === "right" && (
        <div className={styles.logoWrapper}>
          <Image
            src={avatar}
            alt={`${sender} avatar`}
            width={40}
            height={40}
            className={styles.logo}
          />
        </div>
      )}
    </div>
  );
}
