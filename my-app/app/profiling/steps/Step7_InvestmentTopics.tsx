import { useState } from "react";
import ProfilingLayout from "@/components/layout/profilingLayout";

interface Props {
  onSubmit: (selected: string[]) => void;
  onBack: () => void;
}

export default function Step7_InvestmentTopics({ onSubmit, onBack }: Props) {
  const options = [
    "No. I prefer to invest in a broad and diversified range of opportunities.",
    "I am particularly interested in technology companies.",
    "I would like my portfolio to include well-known and established brands.",
    "I would like to focus on biotech and healthcare sectors.",
  ];

  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (opt: string) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  return (
    <ProfilingLayout
      questionNumber="7/10"
      title="Do you have any preferred investment topics?"
      subtitle="To ensure we get you the right recommendations that truly fit you."
    >
      <div className="space-y-4">
        {options.map((opt) => (
          <label key={opt} className="flex items-start space-x-2">
            <input
              type="checkbox"
              value={opt}
              checked={selected.includes(opt)}
              onChange={() => toggleOption(opt)}
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
          disabled={selected.length === 0}
          onClick={() => onSubmit(selected)}
        >
          Next
        </button>
      </div>
    </ProfilingLayout>
  );
}
