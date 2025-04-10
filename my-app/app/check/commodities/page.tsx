import { PortfolioSummary } from "@/components/wealth-check/portfolio-summary"
import { MultiAssetOverview } from "@/components/wealth-treatment/multi-asset-overview"


export default function WealthCheckPage() {
  // Mock data for portfolio summary
  const portfolioSummary = {
    profileImage: "/placeholder.svg?height=64&width=64",
    portfolioName: "Your Portfolio",
    holdingsCount: 22,
    portfolioScore: 77,
    maxScore: 100,
    message:
      "Your Portfolio is generally well balanced. However, you could maximise your cash by increasing your stocks. Lets understand better below.",
  }

  // Mock data for asset allocation cards
  const totalValue = 75000

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
  ]


  return (
    <div className="container mx-auto px-4 py-8">
      <PortfolioSummary {...portfolioSummary} />
      <MultiAssetOverview totalValue={totalValue} assets={mockAssets} avatarUrl="/placeholder.svg" treatment={false} />
    </div>
  )
}

