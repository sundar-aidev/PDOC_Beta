"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MultiAssetOverview } from "@/components/wealth-treatment/multi-asset-overview";
import { SummaryOfChanges } from "@/components/wealth-treatment/summary-of-changes";
import { MedicationPlanTable, MedicationPlanItem } from "@/components/wealth-treatment/medication-plan-table";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";

const mockAssets = [
  { type: "Cash to Invest", value: 35000, formattedValue: "35.0K", toleranceStart: 30, toleranceEnd: 50, idealAmount: 40000, currency: "EUR" },
  { type: "Stocks", value: 40456.78, formattedValue: "€40.5K", toleranceStart: 60, toleranceEnd: 80, idealAmount: 45000, currency: "EUR" },
  { type: "Bonds", value: 4000, formattedValue: "4.0K", toleranceStart: 20, toleranceEnd: 40, idealAmount: 5000, currency: "EUR" },
  { type: "Commodities", value: 1000, formattedValue: "1.0K", toleranceStart: 70, toleranceEnd: 90, idealAmount: 1500, currency: "EUR" },
];

const industryData = [
  { GICS_Industry_Name: "Small Caps", currentValue: 30, projectedValue: 40 },
  { GICS_Industry_Name: "Large Caps", currentValue: 20, projectedValue: 25 },
  { GICS_Industry_Name: "Blue Chip", currentValue: 10, projectedValue: 20 },
  { GICS_Industry_Name: "Emerging Markets", currentValue: 30, projectedValue: 10 },
  { GICS_Industry_Name: "Dividends", currentValue: 10, projectedValue: 5 },
];

const styleData = [
  { CategoryName: "Small Caps", currentValue: 30, projectedValue: 40 },
  { CategoryName: "Large Caps", currentValue: 20, projectedValue: 25 },
  { CategoryName: "Blue Chip", currentValue: 10, projectedValue: 20 },
  { CategoryName: "Emerging Markets", currentValue: 30, projectedValue: 10 },
  { CategoryName: "Dividends", currentValue: 10, projectedValue: 5 },
];

const regionData = [
  { RegionName: "Small Caps", currentValue: 30, projectedValue: 40 },
  { RegionName: "Large Caps", currentValue: 20, projectedValue: 25 },
  { RegionName: "Blue Chip", currentValue: 10, projectedValue: 20 },
  { RegionName: "Emerging Markets", currentValue: 30, projectedValue: 10 },
  { RegionName: "Dividends", currentValue: 10, projectedValue: 5 },
];

const mockStockPositions = [
  { symbol: "AAPL", currentValue: 75, projectedValue: 25 },
  { symbol: "NVDA", currentValue: 60, projectedValue: 20 },
  { symbol: "MSFT", currentValue: 55, projectedValue: 15 },
  { symbol: "TSLA", currentValue: 45, projectedValue: 15 },
  { symbol: "GOOGL", currentValue: 35, projectedValue: 50 },
  { symbol: "AMZN", currentValue: 30, projectedValue: 60 },
];

const mockMedicationPlan: MedicationPlanRow[] = [
  {
    priority: 1,
    asset: "Apple inc",
    action: "Sell",
    quantity: 3,
    priceRange: "196.94 - 197.50",
    bid: 196.93,
    ask: 196.95,
    spread: "0.01%",
  },
  {
    priority: 2,
    asset: "Nvidia",
    action: "Buy",
    quantity: 8,
    priceRange: "101.00 - 101.50",
    bid: 101.42,
    ask: 101.44,
    spread: "0.02%",
  },
  {
    priority: 3,
    asset: "Microsoft",
    action: "Buy",
    quantity: 2,
    priceRange: "367.00 - 368.78",
    bid: 367.76,
    ask: 367.80,
    spread: "0.01%",
  },
  {
    priority: 4,
    asset: "Tesla",
    action: "Sell",
    quantity: 1,
    priceRange: "241.38 - 242.00",
    bid: 241.35,
    ask: 241.41,
    spread: "0.02%",
  },
  {
    priority: 5,
    asset: "Alphabet",
    action: "Buy",
    quantity: 2,
    priceRange: "153.00 - 153.40",
    bid: 153.35,
    ask: 153.37,
    spread: "0.01%",
  },
  {
    priority: 6,
    asset: "Amazon",
    action: "Sell",
    quantity: 1,
    priceRange: "172.63 - 173.00",
    bid: 172.62,
    ask: 172.64,
    spread: "0.01%",
  },
];


export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 space-y-6">
      <MultiAssetOverview totalValue={75456.78} assets={mockAssets} avatarUrl="/placeholder.svg" />

      <div
        style={{
          color: "#dc2626",
          fontSize: "0.875rem",
          fontWeight: 500,
          textAlign: "center",
          marginTop: "0.5rem",
        }}
      >
        This Medication Plan is valid for a period of{" "}
        <span style={{ fontWeight: 600 }}>2 weeks</span>. Accuracy may vary depending on timing.
      </div>

      <SummaryOfChanges
        industryData={industryData}
        styleData={styleData}
        regionData={regionData}
        stockPositions={mockStockPositions}
      />

      <MedicationPlanTable data={mockMedicationPlan} />

      <div className="flex justify-between items-center mt-4">
        <Button variant="secondary" size="md" onClick={() => router.push("/treatment")}>
          Back
        </Button>
        <Button variant="secondary" size="md" onClick={() => setIsModalOpen(true)}>
          Submit
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Portfolio Health"
        valueChange={{ from: 77, to: 89 }}
        confirmText="Confirm & Proceed"
        onConfirm={() => router.push("/check")}
      >
        <p className="text-sm text-gray-700 leading-relaxed">
          Your portfolio is now more well balanced... bla blah bla blah bla blah.
          Let’s keep up the <strong>good work!</strong>
        </p>
      </Modal>
    </div>
  );
}
