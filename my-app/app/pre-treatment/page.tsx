"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { MultiAssetOverview } from "@/components/wealth-treatment/multi-asset-overview";
import { ChatMessage } from "@/components/pre-treatment/ChatMessage";
import { CashInput } from "@/components/pre-treatment/CashInput";
import { AssetAllocationGrid } from "@/components/pre-treatment/AssetAllocationGrid";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import styles from "./page.module.css";

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

interface AssetAllocation {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  percentage: number;
  recommendedPercentage: number;
  tooltipText?: string;
}

export default function PreTreatmentPage() {
  const router = useRouter();

  const mockAssets = [
    { type: "Cash to Invest", value: 35000, formattedValue: "35.0K", toleranceStart: 30, toleranceEnd: 50, idealAmount: 40000, currency: "EUR" },
    { type: "Stocks", value: 40456.78, formattedValue: "€40.5K", toleranceStart: 60, toleranceEnd: 80, idealAmount: 45000, currency: "EUR" },
    { type: "Bonds", value: 4000, formattedValue: "4.0K", toleranceStart: 20, toleranceEnd: 40, idealAmount: 5000, currency: "EUR" },
    { type: "Commodities", value: 1000, formattedValue: "1.0K", toleranceStart: 70, toleranceEnd: 90, idealAmount: 1500, currency: "EUR" },
  ];

  const [stage, setStage] = useState<ConversationStage>(ConversationStage.GREETING);
  const [cashToInvest, setCashToInvest] = useState(30000);
  const [stocks, setStocks] = useState(40500);
  const [bonds, setBonds] = useState(4000);
  const [commodities, setCommodities] = useState(1000);
  const [totalPortfolio, setTotalPortfolio] = useState(75500);
  const [isLoading, setIsLoading] = useState(false);

  const recommendedPercentages = {
    cash: 20,
    stocks: 80,
    bonds: 0,
    commodities: 0,
  };

  const updatingFromSliderRef = useRef(false);

  const formatCurrencyDisplay = (value: number): string => {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toFixed(2);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const assetAllocations = useCallback(() => [
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
  ], [cashToInvest, stocks, bonds, commodities, totalPortfolio]);

  useEffect(() => {
    const transitionDelays = {
      [ConversationStage.GREETING]: 800,
      [ConversationStage.PORTFOLIO_SUMMARY]: 800,
      [ConversationStage.PORTFOLIO_ANALYSIS]: 800,
      [ConversationStage.CASH_QUESTION]: 800,
    };

    if (transitionDelays.hasOwnProperty(stage)) {
      const timer = setTimeout(() => setStage(stage + 1), transitionDelays[stage as keyof typeof transitionDelays]);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleCashSubmit = useCallback((newCashValue: number) => {
    const deltaCash = newCashValue - cashToInvest;
    const newTotalPortfolio = totalPortfolio + deltaCash;
    const remainingAmount = newTotalPortfolio - newCashValue;

    const totalNonCashPercentage =
      recommendedPercentages.stocks +
      recommendedPercentages.bonds +
      recommendedPercentages.commodities;

    let newStocks = 0, newBonds = 0, newCommodities = 0;

    if (totalNonCashPercentage > 0) {
      newStocks = remainingAmount * (recommendedPercentages.stocks / totalNonCashPercentage);
      newBonds = remainingAmount * (recommendedPercentages.bonds / totalNonCashPercentage);
      newCommodities = remainingAmount * (recommendedPercentages.commodities / totalNonCashPercentage);
    } else {
      newStocks = remainingAmount;
    }

    setCashToInvest(newCashValue);
    setTotalPortfolio(newTotalPortfolio);
    setStocks(newStocks);
    setBonds(newBonds);
    setCommodities(newCommodities);

    setStage(ConversationStage.ALLOCATION_QUESTION);
    setTimeout(() => {
      setStage(ConversationStage.ALLOCATION_SLIDERS);
      setTimeout(() => {
        setStage(ConversationStage.ACTION_BUTTON);
      }, 600);
    }, 600);
  }, [cashToInvest, totalPortfolio, recommendedPercentages]);

  const handleAllocationChange = useCallback((newAllocations: AssetAllocation[]) => {
    updatingFromSliderRef.current = true;
    try {
      setCashToInvest(newAllocations.find(a => a.id === "cash")?.value || cashToInvest);
      setStocks(newAllocations.find(a => a.id === "stocks")?.value || stocks);
      setBonds(newAllocations.find(a => a.id === "bonds")?.value || bonds);
      setCommodities(newAllocations.find(a => a.id === "commodities")?.value || commodities);
    } finally {
      updatingFromSliderRef.current = false;
    }
  }, [cashToInvest, stocks, bonds, commodities]);

  const handleBeginTreatment = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/treatment");
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>

        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <h1 className={styles.welcomeHeading}>
              Hi Jane, ready for your Treatment? Let&apos;s double check some information before we begin.
            </h1>
            <MultiAssetOverview totalValue={75456.78} assets={mockAssets} avatarUrl="/placeholder.svg" />

            <ChatMessage sender="system" isVisible={stage >= ConversationStage.PORTFOLIO_ANALYSIS}>
              <p className={styles.analysisText}>
                Your portfolio is underweight in stocks. Increasing your allocation to stocks aligns with the recommended
                balance, ensuring a stronger foundation for growth while maintaining diversification.
              </p>
            </ChatMessage>

            <ChatMessage sender="assistant" isVisible={stage >= ConversationStage.CASH_QUESTION}>
              <p className={styles.questionText}>
                Has there been any changes to the cash you&apos;re willing to invest?
                <br />
                Currently you have <span className={styles.highlightedText}>€{cashToInvest.toLocaleString()}</span>.
              </p>
            </ChatMessage>

            <div className={styles.userInputContainer}>
              <ChatMessage
                sender="user"
                avatar="/placeholder.svg?height=40&width=40"
                isVisible={stage >= ConversationStage.CASH_INPUT}
              >
                <CashInput initialValue={cashToInvest} onSubmit={handleCashSubmit} />
              </ChatMessage>
            </div>

            <ChatMessage sender="assistant" isVisible={stage >= ConversationStage.ALLOCATION_QUESTION}>
              <p className={styles.questionText}>
                Do you want to manually change your asset allocation or fully take our diagnosis?
              </p>
            </ChatMessage>

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

            <div className={styles.actionButtonContainer}>
              {stage >= ConversationStage.ACTION_BUTTON && (
                <button className={styles.beginTreatmentButton} onClick={handleBeginTreatment}>
                  Begin Treatment
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
