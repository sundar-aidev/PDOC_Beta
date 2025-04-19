"use client";

import React from "react";
import styles from "./speech-bubble.module.css";
import Image from "next/image";

interface SpeechBubbleProps {
  side: "left" | "right";
  children: React.ReactNode;
  logoSrc?: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  side = "right",
  children,
  logoSrc = "/placeholder.svg",
}) => {
  return (
    <div className={`${styles.wrapper} ${styles[side]}`}>
      {side === "left" && (
        <div className={styles.logoWrapper}>
          <Image src={logoSrc} alt="Logo" width={32} height={32} className={styles.logo} />
        </div>
      )}

      <div className={`${styles.bubbleWrapper} ${styles[`${side}Align`]}`}>
        <div className={styles.bubble}>
          {children}
          <div className={`${styles.tail} ${side === "right" ? styles.rightTail : styles.leftTail}`} />
        </div>
      </div>

      {side === "right" && (
        <div className={styles.logoWrapper}>
          <Image src={logoSrc} alt="Logo" width={32} height={32} className={styles.logo} />
        </div>
      )}
    </div>
  );
};

export default SpeechBubble;
