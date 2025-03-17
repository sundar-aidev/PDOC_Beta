"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, ChevronDown } from "lucide-react"
import { Bar } from "@/components/ui/chart"

interface AssetAllocation {
  type: string
  value: string
  amount: number
  percentage: number
}

interface StockPosition {
  name: string
  quantity: number
  weightage: number
  value: number
  recommendation: "Increase" | "Decrease"
  newValue: number
  newWeightage: number
}

export default function WealthTreatment() {
  const [allocations] = useState<AssetAllocation[]>([
    { type: "Cash to Invest", value: "35.0K", amount: 35000, percentage: 30 },
    { type: "Stocks", value: "€40,456.78", amount: 40456.78, percentage: 70 },
    { type: "Bonds", value: "4.0K", amount: 4000, percentage: 20 },
    { type: "Commodities", value: "1.0K", amount: 1000, percentage: 10 },
  ])

  const [positions] = useState<StockPosition[]>([
    {
      name: "Apple Inc",
      quantity: 10,
      weightage: 10.0,
      value: 7500.78,
      recommendation: "Decrease",
      newValue: 5000.78,
      newWeightage: 7.0,
    },
    {
      name: "Nvidia",
      quantity: 10,
      weightage: 7.0,
      value: 3500.78,
      recommendation: "Increase",
      newValue: 5500.78,
      newWeightage: 10.0,
    },
    // Add more positions as needed
  ])

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Multi Asset Overview</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>Overview of your portfolio allocation</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {allocations.map((allocation) => (
            <Card key={allocation.type} className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">{allocation.type}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>Details about {allocation.type.toLowerCase()}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-semibold">{allocation.value}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <Progress value={allocation.percentage} className="h-1" />
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Stock Distribution</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>Distribution of your stock holdings</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Bar
                data={[
                  { name: "AAPL", value: 25 },
                  { name: "NVDA", value: 20 },
                  { name: "MSFT", value: 18 },
                  { name: "TSLA", value: 15 },
                  { name: "GOOGL", value: 12 },
                  { name: "AMZN", value: 10 },
                ]}
                yAxisWidth={48}
                height={300}
              />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">New Recommendations</h4>
              {["APP", "PLTR", "HOOD", "BYRN", "CDXC"].map((stock) => (
                <div key={stock} className="flex items-center gap-4 mb-4">
                  <span className="w-16 text-sm">{stock}</span>
                  <Progress value={Math.random() * 100} className="flex-1 h-2" />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>Recommendation details for {stock}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Stock Recommendations and Adjustments</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>Recommended adjustments to your portfolio</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Current Quantity</TableHead>
                <TableHead>Current Weightage</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead>Adjust New Quantities</TableHead>
                <TableHead>New Value</TableHead>
                <TableHead>New Weightage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.map((position) => (
                <TableRow key={position.name}>
                  <TableCell>{position.name}</TableCell>
                  <TableCell>{position.quantity}</TableCell>
                  <TableCell>{position.weightage}%</TableCell>
                  <TableCell>€{position.value.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={position.recommendation === "Increase" ? "text-green-500" : "text-red-500"}>
                      {position.recommendation}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <span>-10</span>
                      <Slider defaultValue={[50]} max={100} step={1} className="w-[100px]" />
                      <span>+12</span>
                    </div>
                  </TableCell>
                  <TableCell>€{position.newValue.toFixed(2)}</TableCell>
                  <TableCell>{position.newWeightage}%</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Switch />
                      <Button variant="default" size="sm">
                        Replace
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </div>
  )
}

