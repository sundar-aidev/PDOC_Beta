"use client";

import React, { useEffect, useState } from "react";
import styles from "./SkeletonLoader.module.css";

export const SkeletonLoader = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Portfolio Doc";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.skeletonCard}>
      <p className={styles.typingText}>{displayText}</p>
    </div>
  );
};
