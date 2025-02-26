"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Info, X } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import styles from "./new-stock-recommendations.module.css"

interface StockData {
  id: string
  name: string
  reasoning: string
  price: number
  quantity: number
  suggestedQuantity: number
  lowerLimit: number
  upperLimit: number
  ranking: number
  isLocked: boolean
}

const mockStockData: StockData[] = [
  {
    id: "stock1",
    name: "Stock X",
    reasoning:
      "Stock X strengthens your portfolio by helping you further hedge against market volatility while further diversifying your portfolio.",
    price: 1500,
    quantity: 0,
    suggestedQuantity: 1,
    lowerLimit: 0,
    upperLimit: 10,
    ranking: 1,
    isLocked: false,
  },
  {
    id: "stock2",
    name: "Stock X",
    reasoning:
      "Stock X strengthens your portfolio by helping you further hedge against market volatility while further diversifying your portfolio.",
    price: 1500,
    quantity: 0,
    suggestedQuantity: 1,
    lowerLimit: 0,
    upperLimit: 10,
    ranking: 2,
    isLocked: false,
  },
  {
    id: "stock3",
    name: "Stock X",
    reasoning:
      "Stock X strengthens your portfolio by helping you further hedge against market volatility while further diversifying your portfolio.",
    price: 1500,
    quantity: 0,
    suggestedQuantity: 1,
    lowerLimit: 0,
    upperLimit: 10,
    ranking: 3,
    isLocked: false,
  },
]

export function NewStockRecommendations() {
  // ... State and logic remain unchanged ...
  const [balance] = useState(15000)
  const [stockData, setStockData] = useState<StockData[]>(mockStockData)
  const [totalAmount, setTotalAmount] = useState(0)
  const [initialTotalAmount, setInitialTotalAmount] = useState(0)
  const [amountToSave, setAmountToSave] = useState(0)
  const [allLocked, setAllLocked] = useState(false)
  const [adjustmentPercentage, setAdjustmentPercentage] = useState(100)

  // ... All callback functions and effects remain unchanged ...
  const calculateTotalAmount = useCallback((data: StockData[]) => {
    return data.reduce((total, stock) => total + stock.price * stock.quantity, 0)
  }, [])

  useEffect(() => {
    const newTotalAmount = calculateTotalAmount(stockData)
    setTotalAmount(newTotalAmount)
    setInitialTotalAmount(newTotalAmount)
  }, [stockData, calculateTotalAmount])

  const redistributeExcess = useCallback(
    (updatedData: StockData[], changedStockId: string, amount: number, actionType: "buy" | "sell") => {
      const unlockedStocks = updatedData
        .filter((stock) => !stock.isLocked && stock.id !== changedStockId)
        .sort((a, b) => (actionType === "sell" ? a.ranking - b.ranking : b.ranking - a.ranking))

      let remainingAmount = amount
      const result = [...updatedData]

      for (const stock of unlockedStocks) {
        if (remainingAmount <= 0) break

        const stockIndex = result.findIndex((s) => s.id === stock.id)
        if (stockIndex === -1) continue

        const currentStock = result[stockIndex]
        const adjustment = Math.floor(remainingAmount / currentStock.price) * (actionType === "sell" ? -1 : 1)

        const newQuantity = Math.max(
          currentStock.lowerLimit,
          Math.min(currentStock.upperLimit, currentStock.quantity + adjustment),
        )

        const actualAdjustment = newQuantity - currentStock.quantity
        const adjustmentValue = actualAdjustment * currentStock.price

        result[stockIndex] = { ...currentStock, quantity: newQuantity }
        remainingAmount -= Math.abs(adjustmentValue)
      }

      return result
    },
    [],
  )

  const handleQuantityChange = useCallback(
    (id: string, newQuantity: number) => {
      setStockData((prevData) => {
        const stockIndex = prevData.findIndex((stock) => stock.id === id)
        if (stockIndex === -1) return prevData

        const updatedData = [...prevData]
        updatedData[stockIndex] = { ...updatedData[stockIndex], quantity: newQuantity }

        const newTotalAmount = calculateTotalAmount(updatedData)
        const difference = newTotalAmount - totalAmount

        if (difference !== 0) {
          return redistributeExcess(updatedData, id, Math.abs(difference), difference > 0 ? "sell" : "buy")
        }

        return updatedData
      })
    },
    [totalAmount, calculateTotalAmount, redistributeExcess],
  )

  const handleAmountToSaveChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToSave(Number(e.target.value))
  }, [])

  const applyAmountSaved = useCallback(() => {
    if (amountToSave > totalAmount) {
      alert("Cannot save more than the total amount!")
      return
    }

    setStockData((prevData) => {
      let remainingAmountToSave = amountToSave
      const updatedData = [...prevData].sort((a, b) => b.ranking - a.ranking)

      for (const stock of updatedData) {
        if (remainingAmountToSave <= 0) break
        if (stock.isLocked) continue

        const maxReduction = stock.quantity - stock.lowerLimit
        const maxReductionAmount = maxReduction * stock.price

        if (maxReductionAmount >= remainingAmountToSave) {
          const quantityReduction = Math.floor(remainingAmountToSave / stock.price)
          stock.quantity -= quantityReduction
          remainingAmountToSave = 0
        } else {
          stock.quantity = stock.lowerLimit
          remainingAmountToSave -= maxReductionAmount
        }
      }

      return updatedData
    })
  }, [amountToSave, totalAmount])

  const handlePercentageChange = useCallback((newPercentage: number) => {
    const percentage = Math.min(Math.max(newPercentage, 0), 100)
    setAdjustmentPercentage(percentage)

    setStockData((prevData) => {
      return prevData.map((stock) => {
        const scaledQuantity = Math.floor((stock.suggestedQuantity * percentage) / 100)
        const newQuantity = Math.max(stock.lowerLimit, Math.min(stock.upperLimit, scaledQuantity))
        return { ...stock, quantity: newQuantity }
      })
    })
  }, [])

  const toggleLock = useCallback((id: string) => {
    setStockData((prevData) =>
      prevData.map((stock) => (stock.id === id ? { ...stock, isLocked: !stock.isLocked } : stock)),
    )
  }, [])

  const toggleLockAll = useCallback(() => {
    setAllLocked((prev) => !prev)
    setStockData((prevData) => prevData.map((stock) => ({ ...stock, isLocked: !allLocked })))
  }, [allLocked])

  const handleRemoveStock = useCallback((id: string) => {
    setStockData((prevData) => prevData.filter((stock) => stock.id !== id))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.balanceInfo}>
          <span>With a balance of </span>
          <span className={styles.balanceAmount}>€{balance.toLocaleString()}</span>
          <span>, these are the new stocks we recommend you add.</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className={styles.infoIcon} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Adjust quantities using the sliders</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={styles.actions}>
          <Button variant="default" onClick={toggleLockAll} className={styles.actionButton}>
            Lock all
          </Button>
          <Button variant="default" className={styles.actionButton}>
            Refuse All
          </Button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={styles.columnHeader}>Asset</TableHead>
              <TableHead className={styles.columnHeader}>Reasoning</TableHead>
              <TableHead className={styles.columnHeader}>Adjust New Quantities</TableHead>
              <TableHead className={styles.columnHeader}>New Value</TableHead>
              <TableHead className={styles.columnHeader}>New Weightage</TableHead>
              <TableHead className={styles.actionsColumn}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockData.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell className={styles.assetCell}>{stock.name}</TableCell>
                <TableCell className={styles.reasoningCell}>{stock.reasoning}</TableCell>
                <TableCell>
                  <div className={styles.sliderContainer}>
                    <span className={styles.sliderValue}>{stock.lowerLimit}</span>
                    <Slider
                      value={[stock.quantity]}
                      min={stock.lowerLimit}
                      max={stock.upperLimit}
                      step={1}
                      onValueChange={([value]) => handleQuantityChange(stock.id, value)}
                      disabled={stock.isLocked}
                      className={styles.slider}
                    />
                    <span className={styles.sliderValue}>+{stock.upperLimit}</span>
                  </div>
                </TableCell>
                <TableCell>€{(stock.price * stock.quantity).toLocaleString()}</TableCell>
                <TableCell>{(((stock.price * stock.quantity) / totalAmount) * 100 || 0).toFixed(1)}%</TableCell>
                <TableCell>
                  <div className={styles.stockActions}>
                    <Switch checked={stock.isLocked} onCheckedChange={() => toggleLock(stock.id)} />
                    <Button variant="default" className={styles.replaceButton}>
                      Replace
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveStock(stock.id)}
                      className={styles.removeButton}
                    >
                      <X className="h-4 w-4" />
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