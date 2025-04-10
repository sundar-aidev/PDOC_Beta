import { PortfolioSummary } from "@/components/wealth-check/portfolio-summary"
import { MultiAssetOverview } from "@/components/wealth-treatment/multi-asset-overview"
import { AssetsDonutChart } from "@/components/wealth-check/assets-donut-chart"
import { HoldingsList } from "@/components/wealth-check/holdings-list"
import { PortfolioAnalysis } from "@/components/wealth-check/portfolio-analysis"
import { InvestmentStyle } from "@/components/wealth-check/investment-style"
import { RecommendationBox } from "@/components/wealth-check/recommendation-box"

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

  // Mock data for assets donut chart with colors matching Figma
  const assetChartData = [
    { stockName: "Apple Inc", value: 8100.78, percentage: 18, color: "#011f2d" },
    { stockName: "Nvidia", value: 4500.5, percentage: 10, color: "#01579b" },
    { stockName: "Tesla", value: 2700.3, percentage: 6, color: "#0277bd" },
    { stockName: "Microsoft", value: 2200.2, percentage: 5, color: "#0288d1" },
    { stockName: "Others", value: 22955.0, percentage: 61, color: "#03a9f4" },
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

  // Mock data for holdings list
  const holdings = [
    {
      logo: "/placeholder.svg?height=24&width=24",
      name: "Apple Inc",
      percentage: 18,
      isOverweight: true,
      tooltipText: "This holding is overweight in your portfolio",
    },
    {
      logo: "/placeholder.svg?height=24&width=24",
      name: "Nvidia",
      percentage: 10,
      isOverweight: true,
      tooltipText: "This holding is overweight in your portfolio",
    },
    {
      logo: "/placeholder.svg?height=24&width=24",
      name: "Tesla",
      percentage: 6,
    },
    {
      logo: "/placeholder.svg?height=24&width=24",
      name: "Microsoft",
      percentage: 5,
    },
    {
      logo: "/placeholder.svg?height=24&width=24",
      name: "SAP",
      percentage: 5,
    },
    {
      logo: "/placeholder.svg?height=24&width=24",
      name: "LVMH",
      percentage: 5,
    },
    {
      logo: "/placeholder.svg?height=24&width=24",
      name: "Nestle",
      percentage: 5,
    },
  ]

  // Mock data for portfolio analysis
  const analysisText =
    "Your portfolio leans heavily on Apple, Tesla, and Nvidia, creating concentration risk. While these stocks are strong, relying too much on a few positions can expose you to sector-specific risks. Diversifying into underweighted stocks like Google, Amazon, and Microsoft strengthens growth potential. Smaller positions like IBM, Oracle, and Spotify lack meaningful impact – consider consolidating or expanding them. Rebalancing improves stability and positions your portfolio for long-term success. Let's continue to break it down even further below!"

  // Mock data for investment style with more accurate colors
  const investmentStyleCategories = {
    style: [
      { name: "Small Caps", percentage: 25, tooltipText: "Companies with small market capitalization" },
      { name: "Large Caps", percentage: 15, tooltipText: "Companies with large market capitalization" },
      { name: "Blue Chip", percentage: 10, tooltipText: "Well-established, financially sound companies" },
      { name: "Emerging Markets", percentage: 30, tooltipText: "Companies in developing economies" },
      { name: "Dividends", percentage: 20, tooltipText: "Companies that pay regular dividends" },
    ],
    region: [
      { name: "North America", percentage: 45 },
      { name: "Europe", percentage: 30 },
      { name: "Asia", percentage: 15 },
      { name: "Emerging Markets", percentage: 10 },
    ],
    industry: [
      { name: "Technology", percentage: 40 },
      { name: "Healthcare", percentage: 20 },
      { name: "Finance", percentage: 15 },
      { name: "Consumer Goods", percentage: 15 },
      { name: "Energy", percentage: 10 },
    ],
  }

  // Mock data for recommendation box
  const recommendationData = {
    title: "Your portfolio is underweight in stocks, missing a crucial growth driver.",
    description:
      "Stocks are essential for building wealth over the long term, offering both growth potential and opportunities to capitalize on market trends. Increasing your allocation to stocks aligns with the recommended balance, ensuring a stronger foundation for growth while maintaining diversification. Let's adjust your asset mix to take full advantage of equities' ability to drive performance and achieve your financial goals.",
    actionLink: "/pre-treatment",
    actionText: "Let's do a treatment to see what exactly you need to change",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PortfolioSummary {...portfolioSummary} />
      <MultiAssetOverview totalValue={totalValue} assets={mockAssets} avatarUrl="/placeholder.svg" treatment={false} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AssetsDonutChart data={assetChartData} title="Assets" />
        <HoldingsList holdings={holdings} title="10" />
      </div>

      <PortfolioAnalysis analysisText={analysisText} iconSrc="/placeholder.svg?height=32&width=32" />

      <InvestmentStyle categories={investmentStyleCategories} />

      <RecommendationBox {...recommendationData} />
    </div>
  )
}

