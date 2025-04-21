import { useState } from "react";
import ProfilingLayout from "@/components/layout/profilingLayout";

interface Props {
  onSelect: (value: string) => void;
  onBack: () => void;
}

export default function Step6_StockComfort({ onSelect, onBack }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    "10 - 20 stocks (concentration)",
    "20 - 30 stocks (moderate diversification)",
    "30 - 40 stocks (highly diversified)",
  ];

  return (
    <ProfilingLayout
      questionNumber="6/10"
      title="How many individual stocks do you feel comfortable monitoring in your portfolio?"
      subtitle="We want to understand how many stocks we should recommend."
    >
      <div className="space-y-4">
        {options.map((opt, index) => (
          <label key={index} className="flex items-start space-x-2">
            <input
              type="radio"
              name="stockComfort"
              value={opt}
              checked={selected === opt}
              onChange={() => setSelected(opt)}
              className="mt-1"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button className="btn-secondary" onClick={onBack}>Back</button>
        <button
          className="btn-primary"
          disabled={!selected}
          onClick={() => onSelect(selected!)}
        >
          Next
        </button>
      </div>
    </ProfilingLayout>
  );
}
