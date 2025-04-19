import { MultiAssetOverview } from "@/components/wealth-treatment/multi-asset-overview";
import {SummaryOfChanges} from "@/components/wealth-treatment/summary-of-changes"

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
    formattedValue: "€40.5K",
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

export default function Page() {
    return (
      <div className="container mx-auto p-4 space-y-6">
        {/* Top Section - Metric Cards etc. */}
        <MultiAssetOverview totalValue={75456.78} assets={mockAssets} avatarUrl="/placeholder.svg" />
  
        {/* Notification line below metrics */}
        <div
            style={{
                color: "#dc2626",
                fontSize: "0.875rem",
                fontWeight: 500,
                textAlign: "center",
                marginTop: "0.5rem",
            }}
            >
            This Medication Plan is valid for a period of <span style={{ fontWeight: 600 }}>2 weeks</span>. Accuracy may vary depending on timing.
        </div>

        {/* Summary of Changes - Before&After: Tabs Portfolio Structure & Individual Positions */}
        <SummaryOfChanges />
        {/* Medication Plan Table - Priority, Asset, Quantity, Price Range, and Spread */}
      </div>
    )
  }
  

