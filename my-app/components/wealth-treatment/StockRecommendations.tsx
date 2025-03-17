"use client"

import React from "react"
import { Info } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import styles from "./stock-recommendations.module.css"

interface StockPosition {
  name: string
  quantity: number
  weightage: number
  value: number
  recommendation: "Increase" | "Decrease"
  newValue: number
  newWeightage: number
}

interface StockRecommendationsProps {
  positions: StockPosition[]
}

export function StockRecommendations({ positions }: StockRecommendationsProps) {
  const [isAllLocked, setIsAllLocked] = React.useState(false)
  const [lockedStates, setLockedStates] = React.useState<{ [key: string]: boolean }>(
    positions.reduce((acc, position) => ({ ...acc, [position.name]: false }), {}),
  )
  const [adjustments, setAdjustments] = React.useState<{ [key: string]: number }>(
    positions.reduce((acc, position) => ({ ...acc, [position.name]: 0 }), {}),
  )

  const toggleAllLocked = () => {
    const newState = !isAllLocked
    setIsAllLocked(newState)
    setLockedStates(Object.keys(lockedStates).reduce((acc, key) => ({ ...acc, [key]: newState }), {}))
  }

  const handleAdjustmentChange = (stock: string, value: number[]) => {
    setAdjustments((prev) => ({ ...prev, [stock]: value[0] }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Stock Recommendations and Adjustments</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className={styles.infoIcon} />
              </TooltipTrigger>
              <TooltipContent>Manage your stock portfolio adjustments</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={styles.actions}>
          <Button variant="outline" size="sm" onClick={toggleAllLocked}>
            Lock all
          </Button>
          <Button variant="default" size="sm">
            Add new
          </Button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Current Quantity</TableHead>
              <TableHead>Current Weightage</TableHead>
              <TableHead>Current Value</TableHead>
              <TableHead>Recommendation</TableHead>
              <TableHead className={styles.adjustmentColumn}>Adjust New Quantities</TableHead>
              <TableHead>New Value</TableHead>
              <TableHead>New Weightage</TableHead>
              <TableHead className={styles.actionsColumn}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position) => (
              <TableRow key={position.name}>
                <TableCell className={styles.assetCell}>{position.name}</TableCell>
                <TableCell>{position.quantity}</TableCell>
                <TableCell>{position.weightage}%</TableCell>
                <TableCell>€{position.value.toFixed(2)}</TableCell>
                <TableCell>
                  <div className={styles.recommendationCell}>
                    <span className={position.recommendation === "Increase" ? styles.increase : styles.decrease}>
                      {position.recommendation}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className={styles.infoIcon} />
                        </TooltipTrigger>
                        <TooltipContent>
                          Explanation for {position.recommendation.toLowerCase()} recommendation
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={styles.sliderContainer}>
                    <span className={styles.minValue}>-10</span>
                    <div className={styles.sliderWrapper}>
                      <Slider
                        min={-10}
                        max={10}
                        step={1}
                        value={[adjustments[position.name]]}
                        onValueChange={(value) => handleAdjustmentChange(position.name, value)}
                        disabled={lockedStates[position.name]}
                        className={styles.slider}
                      />
                    </div>
                    <span className={styles.maxValue}>+10</span>
                  </div>
                </TableCell>
                <TableCell>€{position.newValue.toFixed(2)}</TableCell>
                <TableCell>{position.newWeightage}%</TableCell>
                <TableCell>
                  <div className={styles.tableCellActions}>
                    <Switch
                      checked={lockedStates[position.name]}
                      onCheckedChange={(checked) => {
                        setLockedStates((prev) => ({ ...prev, [position.name]: checked }))
                      }}
                    />
                    <Button variant="default" size="sm" className={styles.replaceButton}>
                      Replace
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

