"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { MultiAssetOverview } from "@/components/wealth-treatment/multi-asset-overview";
import { ChatMessage } from "@/components/pre-treatment/ChatMessage"
import { PortfolioSummary } from "@/components/pre-treatment/PortfolioSummary"
import { AssetAllocationCards } from "@/components/pre-treatment/AssetAllocationCards"
import { CashInput } from "@/components/pre-treatment/CashInput"
import { AssetAllocationGrid } from "@/components/pre-treatment/AssetAllocationGrid"
import { ActionButton } from "@/components/pre-treatment/ActionButton"
import styles from "./page.module.css"

// Define the stages of the conversation
enum ConversationStage {
  GREETING = 0,
  PORTFOLIO_SUMMARY = 1,
  PORTFOLIO_ANALYSIS = 2,
  CASH_QUESTION = 3,
  CASH_INPUT = 4,
  ALLOCATION_QUESTION = 5,
  ALLOCATION_SLIDERS = 6,
  ACTION_BUTTON = 7,
}

// Asset allocation interface
interface AssetAllocation {
  id: string
  title: string
  value: number
  formattedValue: string
  percentage: number
  recommendedPercentage: number
  tooltipText?: string
}

export default function PreTreatmentPage() {

  const mockAssets = [
    { type: "Cash to Invest", value: 35000, formattedValue: "35.0K", toleranceStart: 30, toleranceEnd: 50, idealAmount: 40000, currency: "EUR" },
    { type: "Stocks", value: 40456.78, formattedValue: "€40.5K", toleranceStart: 60, toleranceEnd: 80, idealAmount: 45000, currency: "EUR" },
    { type: "Bonds", value: 4000, formattedValue: "4.0K", toleranceStart: 20, toleranceEnd: 40, idealAmount: 5000, currency: "EUR" },
    { type: "Commodities", value: 1000, formattedValue: "1.0K", toleranceStart: 70, toleranceEnd: 90, idealAmount: 1500, currency: "EUR" },
  ];

  // State for tracking the conversation stage
  const [stage, setStage] = useState<ConversationStage>(ConversationStage.GREETING)

  // Initial asset values
  const [cashToInvest, setCashToInvest] = useState(30000)
  const [stocks, setStocks] = useState(40500)
  const [bonds, setBonds] = useState(4000)
  const [commodities, setCommodities] = useState(1000)

  // Total portfolio value
  const [totalPortfolio, setTotalPortfolio] = useState(75500) // Sum of initial values

  // Recommended percentages
  const recommendedPercentages = {
    cash: 20,
    stocks: 80,
    bonds: 0,
    commodities: 0,
  } 

  // Use a ref to track whether we're updating from the slider
  const updatingFromSliderRef = useRef(false)

  // Memoize the current allocations to avoid unnecessary recalculations
  const currentAllocations = useCallback(
    () => [
      {
        title: "Cash to Invest",
        value: formatCurrencyDisplay(cashToInvest),
        percentage: Math.round((cashToInvest / totalPortfolio) * 100),
        tooltipText: "Your available cash to invest",
      },
      {
        title: "Stocks",
        value: formatCurrencyDisplay(stocks),
        percentage: Math.round((stocks / totalPortfolio) * 100),
        tooltipText: "Your stock allocation",
      },
      {
        title: "Bonds",
        value: formatCurrencyDisplay(bonds),
        percentage: Math.round((bonds / totalPortfolio) * 100),
        tooltipText: "Your bond allocation",
      },
      {
        title: "Commodities",
        value: formatCurrencyDisplay(commodities),
        percentage: Math.round((commodities / totalPortfolio) * 100),
        tooltipText: "Your commodities allocation",
      },
    ],
    [cashToInvest, stocks, bonds, commodities, totalPortfolio],
  )

  // Memoize the asset allocations for the sliders
  const assetAllocations = useCallback(
    () => [
      {
        id: "cash",
        title: "Cash to Invest",
        value: cashToInvest,
        formattedValue: formatCurrency(cashToInvest),
        percentage: Math.round((cashToInvest / totalPortfolio) * 100),
        recommendedPercentage: recommendedPercentages.cash,
        tooltipText: "Recommended cash allocation",
      },
      {
        id: "stocks",
        title: "Stocks",
        value: stocks,
        formattedValue: formatCurrency(stocks),
        percentage: Math.round((stocks / totalPortfolio) * 100),
        recommendedPercentage: recommendedPercentages.stocks,
        tooltipText: "Recommended stock allocation",
      },
      {
        id: "bonds",
        title: "Bonds",
        value: bonds,
        formattedValue: formatCurrency(bonds),
        percentage: Math.round((bonds / totalPortfolio) * 100),
        recommendedPercentage: recommendedPercentages.bonds,
        tooltipText: "Recommended bond allocation",
      },
      {
        id: "commodities",
        title: "Commodities",
        value: commodities,
        formattedValue: formatCurrency(commodities),
        percentage: Math.round((commodities / totalPortfolio) * 100),
        recommendedPercentage: recommendedPercentages.commodities,
        tooltipText: "Recommended commodities allocation",
      },
    ],
    [cashToInvest, stocks, bonds, commodities, totalPortfolio, recommendedPercentages],
  )

  // Progress the conversation automatically for the first few stages
  useEffect(() => {
    if (stage === ConversationStage.GREETING) {
      const timer = setTimeout(() => {
        setStage(ConversationStage.PORTFOLIO_SUMMARY)
      }, 1000)
      return () => clearTimeout(timer)
    }

    if (stage === ConversationStage.PORTFOLIO_SUMMARY) {
      const timer = setTimeout(() => {
        setStage(ConversationStage.PORTFOLIO_ANALYSIS)
      }, 1000)
      return () => clearTimeout(timer)
    }

    if (stage === ConversationStage.PORTFOLIO_ANALYSIS) {
      const timer = setTimeout(() => {
        setStage(ConversationStage.CASH_QUESTION)
      }, 1000)
      return () => clearTimeout(timer)
    }

    if (stage === ConversationStage.CASH_QUESTION) {
      const timer = setTimeout(() => {
        setStage(ConversationStage.CASH_INPUT)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [stage])

  // Handle cash input submission
  const handleCashSubmit = useCallback(
    (newCashValue: number) => {
      // Calculate the change in cash
      const deltaCash = newCashValue - cashToInvest

      // Update total portfolio
      const newTotalPortfolio = totalPortfolio + deltaCash

      // Calculate remaining amount to allocate
      const remainingAmount = newTotalPortfolio - newCashValue

      // Calculate new asset values based on recommended percentages
      const totalNonCashPercentage =
        recommendedPercentages.stocks + recommendedPercentages.bonds + recommendedPercentages.commodities

      let newStocks = 0
      let newBonds = 0
      let newCommodities = 0

      if (totalNonCashPercentage > 0) {
        newStocks = remainingAmount * (recommendedPercentages.stocks / totalNonCashPercentage)
        newBonds = remainingAmount * (recommendedPercentages.bonds / totalNonCashPercentage)
        newCommodities = remainingAmount * (recommendedPercentages.commodities / totalNonCashPercentage)
      } else {
        // If all recommended percentages are 0, allocate everything to stocks
        newStocks = remainingAmount
      }

      // Update state
      setCashToInvest(newCashValue)
      setTotalPortfolio(newTotalPortfolio)
      setStocks(newStocks)
      setBonds(newBonds)
      setCommodities(newCommodities)

      // Progress to the next stage
      setStage(ConversationStage.ALLOCATION_QUESTION)
    },
    [cashToInvest, totalPortfolio, recommendedPercentages],
  )

  // Handle allocation question response
  const handleAllocationQuestion = useCallback(() => {
    setStage(ConversationStage.ALLOCATION_SLIDERS)

    // Show the action button after a short delay
    setTimeout(() => {
      setStage(ConversationStage.ACTION_BUTTON)
    }, 1000)
  }, [])

  // Format currency for display (e.g., "30.0K")
  function formatCurrencyDisplay(value: number): string {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toFixed(2)
  }

  // Format currency values (e.g., "30.000,00 €")
  function formatCurrency(value: number): string {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Handle asset allocation changes from sliders
  const handleAllocationChange = useCallback(
    (newAllocations: AssetAllocation[]) => {
      // Set ref to indicate we're updating from the slider
      updatingFromSliderRef.current = true

      try {
        // Extract values from new allocations
        const newCashValue = newAllocations.find((a) => a.id === "cash")?.value || cashToInvest
        const newStocksValue = newAllocations.find((a) => a.id === "stocks")?.value || stocks
        const newBondsValue = newAllocations.find((a) => a.id === "bonds")?.value || bonds
        const newCommoditiesValue = newAllocations.find((a) => a.id === "commodities")?.value || commodities

        // Update asset values in a single batch to prevent multiple re-renders
        setCashToInvest(newCashValue)
        setStocks(newStocksValue)
        setBonds(newBondsValue)
        setCommodities(newCommoditiesValue)
      } finally {
        // Reset the ref after the update
        updatingFromSliderRef.current = false
      }
    },
    [cashToInvest, stocks, bonds, commodities],
  )

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        {/* Welcome message */}
        <h1 className={styles.welcomeHeading}>
          Hi Jane, ready for your Treatment? Let&apos;s double check some information before we begin.
        </h1>

        {/* Portfolio summary */}
        <MultiAssetOverview totalValue={75456.78} assets={mockAssets} avatarUrl="/placeholder.svg" />

        {/* Portfolio analysis */}
        <ChatMessage sender="system" isVisible={stage >= ConversationStage.PORTFOLIO_ANALYSIS}>
          <p className={styles.analysisText}>
            Your portfolio is underweight in stocks, missing a crucial growth driver. Stocks are essential for building
            wealth over the long term, offering both growth potential and opportunities to capitalize on market trends.
            Increasing your allocation to stocks aligns with the recommended balance, ensuring a stronger foundation for
            growth while maintaining diversification.
          </p>
        </ChatMessage>

        {/* Cash question */}
        <ChatMessage sender="assistant" isVisible={stage >= ConversationStage.CASH_QUESTION}>
          <p className={styles.questionText}>
            Has there been any changes to the cash you&apos;re willing to invest?
            <br />
            Currently you have <span className={styles.highlightedText}>€{cashToInvest.toLocaleString()}</span>.
          </p>
        </ChatMessage>

        {/* Cash input */}
        <div className={styles.userInputContainer}>
          <ChatMessage
            sender="user"
            avatar="/placeholder.svg?height=40&width=40"
            isVisible={stage >= ConversationStage.CASH_INPUT}
          >
            <CashInput initialValue={cashToInvest} onSubmit={handleCashSubmit} />
          </ChatMessage>
        </div>

        {/* Allocation question */}
        <ChatMessage sender="assistant" isVisible={stage >= ConversationStage.ALLOCATION_QUESTION}>
          <p className={styles.questionText}>
            Do you want to manually change your asset allocation or fully take our diagnosis?
          </p>

        </ChatMessage>

        {/* Asset allocation sliders */}
        <ChatMessage
          sender="system"
          isVisible={stage >= ConversationStage.ALLOCATION_SLIDERS}
          className={styles.recommendationMessage}
        >
          <AssetAllocationGrid
            allocations={assetAllocations()}
            totalPortfolioValue={totalPortfolio}
            onAllocationChange={handleAllocationChange}
            updatingFromParent={updatingFromSliderRef.current}
          />
        </ChatMessage>

        {/* Action button */}
        <div className={styles.actionButtonContainer}>
          <ActionButton
            text="Begin Treatment"
            href="/treatment"
            isVisible={stage >= ConversationStage.ACTION_BUTTON}
          />
        </div>
      </div>
    </div>
  )
}

