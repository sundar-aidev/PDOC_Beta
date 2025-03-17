"use client"

interface Asset {
  type: string
  value: number
  formattedValue: string
  percentage: number
  idealAmount: number
  currency: string
}

interface MultiAssetOverviewProps {
  totalValue: number
  assets: Asset[]
  avatarUrl: string
}

export function MultiAssetOverview({ totalValue, assets, avatarUrl }: MultiAssetOverviewProps) {
  // ... rest of the component code ...
}

