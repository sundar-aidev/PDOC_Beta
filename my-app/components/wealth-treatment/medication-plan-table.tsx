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
  priority: string;
  asset: string;
  quantity: number;
  priceRange: string;
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
              <TableHead>Quantity</TableHead>
              <TableHead>Price Range</TableHead>
              <TableHead>Spread</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.priority}</TableCell>
                <TableCell>{row.asset}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.priceRange}</TableCell>
                <TableCell>{row.spread}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Example usage:
// import { MedicationPlanTable, MedicationPlanRow } from "./medication-plan-table";
// const mockPlan: MedicationPlanRow[] = [
//   { priority: "High", asset: "Insulin", quantity: 2, priceRange: "$20 - $30", spread: "Wide" },
//   { priority: "Medium", asset: "Vitamin D", quantity: 1, priceRange: "$10 - $15", spread: "Narrow" },
// ];
// <MedicationPlanTable data={mockPlan} />