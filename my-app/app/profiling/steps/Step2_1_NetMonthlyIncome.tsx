import { useState } from "react";
import ProfilingLayout from "@/components/layout/profilingLayout";

interface Props {
  onSubmit: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2_1_NetMonthlyIncome({ onSubmit, onNext, onBack }: Props) {
  const [input, setInput] = useState("");

  return (
    <ProfilingLayout
      questionNumber="2/10"
      title="Your Employment Status"
      subtitle="What is your average Net Monthly Income?"
    >
      <input
        type="number"
        value={input}
        min="0"
        onChange={(e) => setInput(e.target.value)}
        className="input-field"
      />
      <div className="flex justify-between mt-4">
        <button className="btn-secondary" onClick={onBack}>Back</button>
        <button
          className="btn-primary"
          disabled={!input}
          onClick={() => {
            onSubmit(Number(input));
            onNext();
          }}
        >
          Next
        </button>
      </div>
    </ProfilingLayout>
  );
}
