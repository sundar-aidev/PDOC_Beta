import { useState } from "react";
import ProfilingLayout from "@/components/layout/profilingLayout";

interface Props {
  onSelect: (value: string) => void;
  onBack: () => void;
}

export default function Step5_DrawdownReaction({ onSelect, onBack }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    "Sell everything to avoid any further loss",
    "Sell part of the portfolio and switch that amount into safer assets",
    "Do nothing—stay fully invested and wait for markets to recover",
    "Invest more money because prices are lower and long-term prospects are unchanged",
  ];

  return (
    <ProfilingLayout
      questionNumber="5/10"
      title="How would you react if your portfolio suddenly dropped by 15%?"
      subtitle="We want to understand how you handle volatility to understand your risk appetite."
    >
      <div className="space-y-4">
        {options.map((opt, index) => (
          <label key={index} className="flex items-start space-x-2">
            <input
              type="radio"
              name="drawdownReaction"
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
