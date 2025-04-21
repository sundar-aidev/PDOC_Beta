import { useState } from "react";
import ProfilingLayout from "@/components/layout/profilingLayout";

interface Props {
  onSelect: (value: string) => void;
  onBack: () => void;
}

export default function Step4_InvestmentStyle({ onSelect, onBack }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    "I want to maximise long-term growth and I’m comfortable with large short-term swings in value.",
    "I’d like steady growth with only moderate ups and downs—even if that means giving up some upside.",
    "My main goal is a reliable stream of income from dividends or interest; capital growth is secondary.",
    "Preserving my capital and keeping it easy to access is most important, even if returns stay low.",
  ];

  return (
    <ProfilingLayout
      questionNumber="4/10"
      title="Which statement is the most applicable to you?"
      subtitle="To recommend the right fit for your goals."
    >
      <div className="space-y-4">
        {options.map((opt, index) => (
          <label key={index} className="flex items-start space-x-2">
            <input
              type="radio"
              name="investmentStyle"
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
