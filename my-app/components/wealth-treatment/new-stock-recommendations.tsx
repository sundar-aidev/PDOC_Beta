"use client"

import type React from "react"

import { useState } from "react"
import { Info, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"
import styles from "./new-stock-recommendations.module.css"

interface NewStock {
  id: string
  name: string
  reasoning: string
  defaultQuantity: number
  minAdjustment: number
  maxAdjustment: number
  value: number
  weightage: number
}

const mockNewStocks: NewStock[] = [
  {
    id: "stock-1",
    name: "Stock X",
    reasoning:
      "Stock X strengthens your portfolio by helping you further hedge against market volatility while further diversifying your portfolio.",
    defaultQuantity: 0,
    minAdjustment: 0,
    maxAdjustment: 5,
    value: 1500.0,
    weightage: 3.0,
  },
  {
    id: "stock-2",
    name: "Stock X",
    reasoning:
      "Stock X strengthens your portfolio by helping you further hedge against market volatility while further diversifying your portfolio.",
    defaultQuantity: 0,
    minAdjustment: 0,
    maxAdjustment: 5,
    value: 1500.0,
    weightage: 3.0,
  },
  {
    id: "stock-3",
    name: "Stock X",
    reasoning:
      "Stock X strengthens your portfolio by helping you further hedge against market volatility while further diversifying your portfolio.",
    defaultQuantity: 0,
    minAdjustment: 0,
    maxAdjustment: 5,
    value: 1500.0,
    weightage: 3.0,
  },
  {
    id: "stock-4",
    name: "Stock X",
    reasoning:
      "Stock X strengthens your portfolio by helping you further hedge against market volatility while further diversifying your portfolio.",
    defaultQuantity: 0,
    minAdjustment: 0,
    maxAdjustment: 5,
    value: 1500.0,
    weightage: 3.0,
  },
  {
    id: "stock-5",
    name: "Stock X",
    reasoning:
      "Stock X strengthens your portfolio by helping you further hedge against market volatility while further diversifying your portfolio.",
    defaultQuantity: 0,
    minAdjustment: 0,
    maxAdjustment: 5,
    value: 1500.0,
    weightage: 3.0,
  },
  {
    id: "stock-6",
    name: "Stock X",
    reasoning:
      "Stock X strengthens your portfolio by helping you further hedge against market volatility while further diversifying your portfolio.",
    defaultQuantity: 0,
    minAdjustment: 0,
    maxAdjustment: 5,
    value: 1500.0,
    weightage: 3.0,
  },
]

export function NewStockRecommendations() {
  const [balance, setBalance] = useState(10000)
  const [isAllLocked, setIsAllLocked] = useState(false)
  const [lockedStates, setLockedStates] = useState<{ [key: string]: boolean }>(
    mockNewStocks.reduce((acc, stock) => ({ ...acc, [stock.id]: false }), {}),
  )
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    mockNewStocks.reduce((acc, stock) => ({ ...acc, [stock.id]: stock.defaultQuantity }), {}),
  )

  const toggleAllLocked = () => {
    const newState = !isAllLocked
    setIsAllLocked(newState)
    setLockedStates(Object.keys(lockedStates).reduce((acc, key) => ({ ...acc, [key]: newState }), {}))
  }

  const handleBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(event.target.value)
    if (!isNaN(value)) {
      setBalance(value)
    }
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <div className={styles.balanceWrapper}>
          <span>With a balance of </span>
          <div className={styles.balanceInput}>
            <Input type="number" value={balance} onChange={handleBalanceChange} className={styles.input} />
          </div>
          <span>, these are the new stocks we recommend you add.</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className={styles.infoIcon} />
              </TooltipTrigger>
              <TooltipContent>Adjust the balance to see different stock recommendations</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={styles.actions}>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAllLocked}
            className={`${styles.lockButton} ${isAllLocked ? styles.locked : ""}`}
          >
            Lock all
          </Button>
          <Button variant="destructive" size="sm">
            Refuse All
          </Button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Reasoning</TableHead>
              <TableHead>Adjust New Quantities</TableHead>
              <TableHead>New Value</TableHead>
              <TableHead>New Weightage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockNewStocks.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell className={styles.assetCell}>{stock.name}</TableCell>
                <TableCell className={styles.reasoningCell}>{stock.reasoning}</TableCell>
                <TableCell>
                  <div className={styles.sliderContainer}>
                    <span className={styles.value}>{quantities[stock.id]}</span>
                    <div className={styles.sliderWrapper}>
                      <input
                        type="range"
                        min={stock.minAdjustment}
                        max={stock.maxAdjustment}
                        value={quantities[stock.id]}
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value)
                          setQuantities((prev) => ({ ...prev, [stock.id]: value }))
                        }}
                        disabled={lockedStates[stock.id]}
                        className={styles.slider}
                      />
                      <div className={styles.sliderMarks}>
                        <span>0</span>
                        <span>+5</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatCurrency(stock.value)}</TableCell>
                <TableCell>{stock.weightage.toFixed(2)}%</TableCell>
                <TableCell>
                  <div className={styles.tableCellActions}>
                    <Switch
                      checked={lockedStates[stock.id]}
                      onCheckedChange={(checked) => {
                        setLockedStates((prev) => ({ ...prev, [stock.id]: checked }))
                      }}
                    />
                    <Button variant="default" size="sm" className={styles.replaceButton}>
                      Replace
                    </Button>
                    <Button variant="ghost" size="icon" className={styles.deleteButton}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}