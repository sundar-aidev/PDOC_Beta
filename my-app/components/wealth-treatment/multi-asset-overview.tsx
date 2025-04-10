"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import styles from "./multi-asset-overview.module.css";

interface Asset {
  type: string;
  value: number;
  formattedValue: string;
  toleranceStart: number;
  toleranceEnd: number;
  idealAmount: number;
  currency: string;
}

interface MultiAssetOverviewProps {
  totalValue: number;
  assets: Asset[];
  avatarUrl: string;
  treatment: boolean;
}

export function MultiAssetOverview({
  totalValue,
  assets,
  avatarUrl,
  treatment = true,
}: MultiAssetOverviewProps) {
  const router = useRouter();
  const pathname = usePathname();

  const activeAsset = useMemo(() => {
    if (!pathname) return "Stocks";
    if (pathname.includes("commodities")) return "Commodities";
    if (pathname.includes("pre-treatment") || pathname.includes("cash")) 
      return "Cash to Invest";
    if (pathname.includes("bonds")) return "Bonds";
    if (pathname.includes("stocks") || pathname.includes("treatment"))
      return "Stocks";
    return "Stocks";
  }, [pathname]);

  const formatCurrency = (value: number | undefined): string => {
    if (typeof value !== "number") return "-";
    return value.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    });
  };

  const handleAssetClick = (assetType: string) => {
    const baseRoute = treatment ? "/treatment" : "/check";

    switch (assetType) {
      case "Stocks":
        router.push(`${baseRoute}/stocks`);
        break;
      case "Cash to Invest":
        router.push(treatment ? "/pre-treatment" : "/check/cash");
        break;
      case "Bonds":
        router.push(`${baseRoute}/bonds`);
        break;
      case "Commodities":
        router.push(`${baseRoute}/commodities`);
        break;
      default:
        break;
    }
  };

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

        <div className={styles.portfolioHeader}>
          <div className={styles.portfolioInfo}>
            <Avatar src={avatarUrl} alt="Portfolio Avatar" />
            <div>
              <span className={styles.portfolioLabel}>Your Portfolio</span>
              <span className={styles.portfolioValue}>
                {formatCurrency(totalValue)}
              </span>
            </div>
          </div>

          <div className={styles.grid}>
            {assets.map((asset) => {
              const isActive = activeAsset === asset.type;

              return (
                <Card
                  key={asset.type}
                  className={`${styles.card} ${
                    isActive ? styles.activeCard : styles.inactiveCard
                  }`}
                >
                  <div
                    onClick={() => handleAssetClick(asset.type)}
                    style={{ cursor: "pointer" }}
                  >
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
                        <span className={styles.value}>
                          {isActive
                            ? formatCurrency(asset.value)
                            : asset.formattedValue}
                        </span>
                      </div>

                      <div className={styles.progressContainer}>
                        <div className={styles.progressTrack}>
                          <div
                            className={styles.progressBar}
                            style={{
                              left: `${asset.toleranceStart}%`,
                              width: `${
                                asset.toleranceEnd - asset.toleranceStart
                              }%`,
                            }}
                          />
                          <div
                            className={styles.idealMarker}
                            style={{
                              left: `${(asset.value / totalValue) * 100}%`,
                            }}
                          />
                        </div>
                        {isActive && (
                          <div className={styles.percentageScale}>
                            <span>0%</span>
                            <span>100%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
