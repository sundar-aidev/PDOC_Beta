import { MultiAssetOverview } from "@/components/wealth-treatment/multi-asset-overview"
import { StockDistribution } from "@/components/wealth-treatment/stock-distribution"
import { StockRecommendations } from "@/components/wealth-treatment/stock-recommendations"
import { NewStockRecommendations } from "@/components/wealth-treatment/new-stock-recommendations"

const mockAssets = [
  {
    type: "Cash to Invest",
    value: 35000,
    formattedValue: "35.0K",
    toleranceStart: 30,
    toleranceEnd: 50,
    idealAmount: 40000,
    currency: "EUR",
  },
  {
    type: "Stocks",
    value: 40456.78,
    formattedValue: "€40,456.78",
    toleranceStart: 60,
    toleranceEnd: 80,
    idealAmount: 45000,
    currency: "EUR",
  },
  {
    type: "Bonds",
    value: 4000,
    formattedValue: "4.0K",
    toleranceStart: 20,
    toleranceEnd: 40,
    idealAmount: 5000,
    currency: "EUR",
  },
  {
    type: "Commodities",
    value: 1000,
    formattedValue: "1.0K",
    toleranceStart: 70,
    toleranceEnd: 90,
    idealAmount: 1500,
    currency: "EUR",
  },
]

const mockPositions = [
  { label: "AAPL", value: 25, color: "#03bffd" },
  { label: "NVDA", value: 20, color: "#03bffd" },
  { label: "MSFT", value: 18, color: "#03bffd" },
  { label: "TSLA", value: 15, color: "#03bffd" },
  { label: "GOOGL", value: 12, color: "#03bffd" },
  { label: "AMZN", value: 10, color: "#03bffd" },
]

const mockRecommendations = [
  { symbol: "APP", percentage: 65 },
  { symbol: "PLTR", percentage: 45 },
  { symbol: "HOOD", percentage: 35 },
  { symbol: "BYRN", percentage: 25 },
  { symbol: "CDXC", percentage: 15 },
]

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
]

export default function Page() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <MultiAssetOverview totalValue={75456.78} assets={mockAssets} avatarUrl="/placeholder.svg" />
      <StockDistribution currentPositions={mockPositions} recommendations={mockRecommendations} />
      <StockRecommendations positions={mockStockPositions} />
      <NewStockRecommendations />
    </div>
  )
}

