"use client";

import { useRouter } from "next/navigation";
import { MultiAssetOverview } from "@/components/wealth-treatment/multi-asset-overview";
import { StockDistribution } from "@/components/wealth-treatment/stock-distribution";
import { StockRecommendations } from "@/components/wealth-treatment/stock-recommendations";
import { NewStockRecommendations } from "@/components/wealth-treatment/new-stock-recommendations";
import { Button } from "@/components/ui/button"; // ✅ Import Button

const totalValue = 75000;

const mockAssets = [
  {
    type: "Cash to Invest",
    value: 35000,
    formattedValue: "35.0K",
    toleranceStart: 20,
    toleranceEnd: 50,
    idealAmount: 40000,
    currency: "EUR",
  },
  {
    type: "Stocks",
    value: 40000,
    formattedValue: "€40.5K",
    toleranceStart: 50,
    toleranceEnd: 80,
    idealAmount: 45000,
    currency: "EUR",
  },
  {
    type: "Bonds",
    value: 0,
    formattedValue: "4.0K",
    toleranceStart: 0,
    toleranceEnd: 30,
    idealAmount: 5000,
    currency: "EUR",
  },
  {
    type: "Commodities",
    value: 0,
    formattedValue: "1.0K",
    toleranceStart: 0,
    toleranceEnd: 10,
    idealAmount: 1500,
    currency: "EUR",
  },
];

const mockPositions = [
  { symbol: "AAPL", currentValue: 75, projectedValue: 25 },
  { symbol: "NVDA", currentValue: 60, projectedValue: 20 },
  { symbol: "MSFT", currentValue: 55, projectedValue: 15 },
  { symbol: "TSLA", currentValue: 45, projectedValue: 15 },
  { symbol: "GOOGL", currentValue: 35, projectedValue: 50 },
  { symbol: "AMZN", currentValue: 30, projectedValue: 60 },
];

const mockRecommendations = [
  { symbol: "APP", percentage: 65 },
  { symbol: "PLTR", percentage: 45 },
  { symbol: "HOOD", percentage: 35 },
  { symbol: "BYRN", percentage: 25 },
  { symbol: "CDXC", percentage: 15 },
];

const mockStockPositions = [
  {
    name: "Apple Inc",
    quantity: 10,
    weightage: 10.0,
    value: 7500.78,
    recommendation: "Decrease" as const,
    newValue: 5000.78,
    newWeightage: 7.0,
  },
  {
    name: "Nvidia",
    quantity: 10,
    weightage: 7.0,
    value: 3500.78,
    recommendation: "Increase" as const,
    newValue: 5500.78,
    newWeightage: 10.0,
  },
];

export default function Page() {
  const router = useRouter(); // ✅ Add router

  return (
    <div className="container mx-auto p-4 space-y-6">
      <MultiAssetOverview totalValue={totalValue} assets={mockAssets} avatarUrl="/placeholder.svg" />
      <StockDistribution currentPositions={mockPositions} recommendations={mockRecommendations} />
      <StockRecommendations positions={mockStockPositions} />
      <NewStockRecommendations />

      {/* ✅ Proceed Button */}
      <div className="flex justify-end mt-6">
        <Button variant="secondary" size="md" onClick={() => router.push("/medication-plan")}>
          Proceed to Medication Plan
        </Button>
      </div>
    </div>
  );
}
