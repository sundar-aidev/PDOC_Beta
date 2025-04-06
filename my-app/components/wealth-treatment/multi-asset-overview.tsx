"use client"

import { Info } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar } from "@/components/ui/avatar"
import styles from "./multi-asset-overview.module.css"

interface Asset {
  type: string
  value: number
  formattedValue: string
  toleranceStart: number
  toleranceEnd: number
  idealAmount: number
  currency: string
}

interface MultiAssetOverviewProps {
  totalValue: number
  assets: Asset[]
  avatarUrl: string
}

export function MultiAssetOverview({ totalValue, assets, avatarUrl }: MultiAssetOverviewProps) {
  const formatCurrency = (value: number | undefined): string => {
    if (typeof value !== "number") {
      return "-"
    }
    return value.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    })
  }

  return (
    <section className={styles.container}>
      <div className={styles.overview}>
        <h2 className={styles.title}>
          <span>Multi Asset Overview</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className={styles.infoIcon} />
              </TooltipTrigger>
              <TooltipContent>Overview of your portfolio assets</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h2>

        {/* Main row container for portfolio info and asset cards */}
        <div className={styles.portfolioHeader}>
          <div className={styles.portfolioInfo}>
            <Avatar src={avatarUrl} alt="Portfolio Avatar" />
            <div>
              <span className={styles.portfolioLabel}>Your Portfolio</span>
              <span className={styles.portfolioValue}>{formatCurrency(totalValue)}</span>
            </div>
          </div>
          <div className={styles.grid}>
            {assets.map((asset) => (
              <Card key={asset.type} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.assetType}>{asset.type}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className={styles.infoIcon} />
                      </TooltipTrigger>
                      <TooltipContent>
                        Details about {asset.type.toLowerCase()}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.valueContainer}>
                    <span className={styles.value}>{asset.formattedValue}</span>
                  </div>
                  <div className={styles.progressContainer}>
                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressBar}
                        style={{
                          left: `${asset.toleranceStart}%`,
                          width: `${asset.toleranceEnd - asset.toleranceStart}%`,
                        }}
                      />
                      <div
                        className={styles.idealMarker}
                        style={{
                          left: `${(asset.idealAmount / totalValue) * 100}%`,
                        }}
                      />
                    </div>
                    <div className={styles.percentageScale}>
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
