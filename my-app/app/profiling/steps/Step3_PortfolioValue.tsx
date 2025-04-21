import { useState } from "react";
import ProfilingLayout from "@/components/layout/profilingLayout";

interface Props {
  onSubmit: (value: number) => void;
  onBack: () => void;
}

export default function Step3_PortfolioValue({ onSubmit, onBack }: Props) {
  const [input, setInput] = useState("");

  return (
    <ProfilingLayout
      questionNumber="3/10"
      title="What is the monetary value of all your assets, less your investment portfolio?"
      subtitle="To better understand your financial position to recommend the right fit for your lifestyle."
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
