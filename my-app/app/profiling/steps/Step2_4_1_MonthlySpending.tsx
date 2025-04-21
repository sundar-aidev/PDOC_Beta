import { useState } from "react";
import ProfilingLayout from "@/components/layout/profilingLayout";

interface Props {
  onSubmit: (value: number) => void;
  onBack: () => void;
}

export default function Step2_4_1_MonthlySpending({ onSubmit, onBack }: Props) {
  const [input, setInput] = useState("");

  return (
    <ProfilingLayout
      questionNumber="2/10"
      title="Your Employment Status"
      subtitle="How much do you spend in a month?"
    >
      <input
        type="number"
        value={input}
        min="0"
        onChange={(e) => setInput(e.target.value)}
        className="input-field"
        placeholder="Enter amount"
      />
      <div className="flex justify-between mt-4">
        <button className="btn-secondary" onClick={onBack}>Back</button>
        <button
          className="btn-primary"
          disabled={!input}
          onClick={() => onSubmit(Number(input))}
        >
          Next
        </button>
      </div>
    </ProfilingLayout>
  );
}
