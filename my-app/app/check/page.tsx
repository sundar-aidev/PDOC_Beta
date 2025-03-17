import { PortfolioSummary } from "@/components/wealth-check/portfolio-summary"
import { AssetAllocationCards } from "@/components/wealth-check/asset-allocation-cards"
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
  const assetCards = [
    {
      title: "Total Portfolio",
      value: "75,456.78€",
      tooltipText: "Your total portfolio value",
    },
    {
      title: "Stocks",
      value: "40,456.78€",
      percentage: 53,
      tooltipText: "Your stock allocation",
      indicator: "up" as const,
    },
    {
      title: "Bonds",
      value: "4.0K",
      percentage: 5,
      tooltipText: "Your bond allocation",
      indicator: "down" as const,
    },
    {
      title: "Commodities",
      value: "1.0K",
      percentage: 1,
      tooltipText: "Your commodities allocation",
      indicator: "down" as const,
    },
    {
      title: "Cash to Invest",
      value: "30.0K",
      percentage: 40,
      tooltipText: "Your available cash",
      indicator: "neutral" as const,
    },
  ]

  // Mock data for assets donut chart with colors matching Figma
  const assetChartData = [
    { name: "Apple Inc", value: 8100.78, percentage: 18, color: "#011f2d" },
    { name: "Nvidia", value: 4500.5, percentage: 10, color: "#01579b" },
    { name: "Tesla", value: 2700.3, percentage: 6, color: "#0277bd" },
    { name: "Microsoft", value: 2200.2, percentage: 5, color: "#0288d1" },
    { name: "Others", value: 22955.0, percentage: 61, color: "#03a9f4" },
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
    actionLink: "/wealth-treatment",
    actionText: "Let's do a treatment to see what exactly you need to change",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PortfolioSummary {...portfolioSummary} />

      <AssetAllocationCards cards={assetCards} />

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

