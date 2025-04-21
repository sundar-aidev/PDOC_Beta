import { useState } from "react";
import ProfilingLayout from "@/components/layout/profilingLayout"; 

interface Props {
  onSubmit: (selected: string[]) => void;
  onBack: () => void;
}

export default function Step8_InvestmentPriorities({ onSubmit, onBack }: Props) {
  const options = [
    "I want to invest in Emerging Markets like China, India, Brazil, etc.",
    "I want to exclude companies that are violating sustainability criteria",
  ];

  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (opt: string) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  return (
    <ProfilingLayout
      questionNumber="8/10"
      title="Select these statements if they're important to you"
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
          Submit
        </button>
      </div>
    </ProfilingLayout>
  );
}
