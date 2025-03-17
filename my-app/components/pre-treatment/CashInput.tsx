"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import styles from "./CashInput.module.css"

interface CashInputProps {
  initialValue: number
  onSubmit: (value: number) => void
}

export function CashInput({ initialValue, onSubmit }: CashInputProps) {
  const [value, setValue] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus the input when it mounts
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters and commas
    const numericValue = e.target.value.replace(/[^0-9]/g, "")
    setValue(numericValue ? Number.parseInt(numericValue) : 0)
  }

  const handleBlur = () => {
    onSubmit(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <span className={styles.currencySymbol}>€</span>
        <input
          ref={inputRef}
          type="text"
          value={value.toLocaleString()}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={styles.input}
          aria-label="Enter amount to invest"
        />
      </div>
      <span className={styles.helperText}>is how much I want to invest.</span>
    </div>
  )
}

