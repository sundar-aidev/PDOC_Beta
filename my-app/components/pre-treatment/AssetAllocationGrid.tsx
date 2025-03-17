"use client"

import { useState, useEffect, useRef } from "react"
import { TotalPortfolio } from "./TotalPortfolio"
import styles from "./AssetAllocationGrid.module.css"

interface AssetAllocation {
  id: string
  title: string
  value: number
  formattedValue: string
  percentage: number
  recommendedPercentage: number
  tooltipText?: string
}

interface AssetAllocationGridProps {
  allocations: AssetAllocation[]
  totalPortfolioValue: number
  onAllocationChange?: (allocations: AssetAllocation[]) => void
  updatingFromParent?: boolean
}

export function AssetAllocationGrid({
  allocations: initialAllocations,
  totalPortfolioValue,
  onAllocationChange,
  updatingFromParent = false,
}: AssetAllocationGridProps) {
  const [allocations, setAllocations] = useState<AssetAllocation[]>(initialAllocations)
  const isInternalUpdate = useRef(false)
  const prevAllocationsRef = useRef<AssetAllocation[]>(initialAllocations)

  // Update allocations when props change, but only if it's not an internal update
  useEffect(() => {
    // Skip if this is an internal update
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false
      return
    }

    // Check if allocations have actually changed to avoid unnecessary updates
    const hasChanged = JSON.stringify(initialAllocations) !== JSON.stringify(prevAllocationsRef.current)

    if (hasChanged) {
      prevAllocationsRef.current = initialAllocations
      setAllocations(initialAllocations)
    }
  }, [initialAllocations])

  // Handle slider change for an allocation
  const handleAllocationChange = (id: string, newPercentage: number) => {
    // Set flag to indicate this is an internal update
    isInternalUpdate.current = true

    setAllocations((prevAllocations) => {
      // Find the allocation that was changed
      const changedAllocation = prevAllocations.find((a) => a.id === id)
      if (!changedAllocation) return prevAllocations

      // Calculate the difference between the old and new percentage
      const percentageDiff = newPercentage - changedAllocation.percentage

      // If there's no change, return the previous allocations
      if (percentageDiff === 0) return prevAllocations

      // Get all other allocations that can be adjusted
      const otherAllocations = prevAllocations.filter((a) => a.id !== id)

      // Calculate the total percentage of other allocations
      const totalOtherPercentage = otherAllocations.reduce((sum, a) => sum + a.percentage, 0)

      // If there are no other allocations or their total is 0, we can't adjust
      if (otherAllocations.length === 0 || totalOtherPercentage === 0) {
        return prevAllocations
      }

      // Calculate the new allocations with proportional adjustment
      const newAllocations = prevAllocations.map((allocation) => {
        if (allocation.id === id) {
          // Update the changed allocation
          const newValue = (totalPortfolioValue * newPercentage) / 100
          return {
            ...allocation,
            percentage: newPercentage,
            value: newValue,
            formattedValue: formatCurrency(newValue),
          }
        } else {
          // Adjust other allocations proportionally
          const weight = allocation.percentage / totalOtherPercentage
          const adjustedPercentage = Math.max(0, allocation.percentage - percentageDiff * weight)
          const newValue = (totalPortfolioValue * adjustedPercentage) / 100

          return {
            ...allocation,
            percentage: adjustedPercentage,
            value: newValue,
            formattedValue: formatCurrency(newValue),
          }
        }
      })

      // Ensure the total is exactly 100%
      const totalPercentage = newAllocations.reduce((sum, a) => sum + a.percentage, 0)
      if (Math.abs(totalPercentage - 100) > 0.01) {
        // Find the allocation with the highest percentage (excluding the one just changed)
        const highestAllocation = newAllocations
          .filter((a) => a.id !== id)
          .sort((a, b) => b.percentage - a.percentage)[0]

        if (highestAllocation) {
          // Adjust the highest allocation to make the total exactly 100%
          const adjustedPercentage = highestAllocation.percentage + (100 - totalPercentage)
          const index = newAllocations.findIndex((a) => a.id === highestAllocation.id)

          if (index !== -1 && adjustedPercentage >= 0) {
            const newValue = (totalPortfolioValue * adjustedPercentage) / 100
            newAllocations[index] = {
              ...newAllocations[index],
              percentage: adjustedPercentage,
              value: newValue,
              formattedValue: formatCurrency(newValue),
            }
          }
        }
      }

      // Store the new allocations for reference
      prevAllocationsRef.current = newAllocations

      // Notify parent component of the change
      if (onAllocationChange && !updatingFromParent) {
        onAllocationChange(newAllocations)
      }

      return newAllocations
    })
  }

  // Format currency values
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.description}>
          <p>
            The <span className={styles.blueText}>blue area</span> is our recommendation. Please adjust the sliders to
            your <span className={styles.boldText}>Ideal post-treatment</span> asset allocation.
          </p>
        </div>
        <div className={styles.totalPortfolio}>
          <TotalPortfolio value={formatCurrency(totalPortfolioValue)} />
        </div>
      </div>

      <div className={styles.grid}>
        {allocations.map((allocation) => (
          <div key={allocation.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>{allocation.title}</span>
              <span className={styles.infoIcon}>ⓘ</span>
            </div>

            <div className={styles.valueContainer}>
              <span className={styles.value}>{allocation.formattedValue}</span>
            </div>

            <div className={styles.sliderContainer}>
              <div className={styles.sliderTrack}>
                {/* Blue recommendation area */}
                <div
                  className={styles.recommendationArea}
                  style={{
                    left: `${allocation.recommendedPercentage - 5}%`,
                    width: `10%`,
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(allocation.percentage)}
                  onChange={(e) => handleAllocationChange(allocation.id, Number.parseInt(e.target.value))}
                  className={`${styles.slider} ${
                    Math.abs(allocation.percentage - allocation.recommendedPercentage) <= 5
                      ? styles.withinTolerance
                      : ""
                  }`}
                  aria-label={`Adjust ${allocation.title} allocation`}
                />
              </div>

              <div className={styles.percentageLabels}>
                <span>0%</span>
                <span className={styles.currentPercentage}>{Math.round(allocation.percentage)}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

