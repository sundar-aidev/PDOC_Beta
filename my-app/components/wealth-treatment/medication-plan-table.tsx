"use client";

import styles from "./medication-plan-table.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface MedicationPlanRow {
  priority: number;
  asset: string;
  action: "Buy" | "Sell";
  quantity: number;
  priceRange: string;
  bid: number;
  ask: number;
  spread: string;
}

interface MedicationPlanTableProps {
  data: MedicationPlanRow[];
}

export function MedicationPlanTable({ data }: MedicationPlanTableProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Medication Plan</h3>
      </div>
      <div className={styles.tableWrapper}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Priority</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price Range</TableHead>
              <TableHead colSpan={3} className={styles.spreadHeader}>Spread Calculator</TableHead>
            </TableRow>
            <TableRow>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead>Bid</TableHead>
              <TableHead>Ask</TableHead>
              <TableHead>Spread</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.priority}.</TableCell>
                <TableCell>{row.asset}</TableCell>
                <TableCell style={{ color: row.action === "Buy" ? "#22c55e" : "#f87171", fontWeight: 600 }}>{row.action}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.priceRange}</TableCell>
                <TableCell>{row.bid.toFixed(2)}</TableCell>
                <TableCell>{row.ask.toFixed(2)}</TableCell>
                <TableCell>{row.spread}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
