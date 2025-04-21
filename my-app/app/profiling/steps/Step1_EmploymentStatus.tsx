"use client";

import ProfilingLayout from "@/components/layout/profilingLayout";

interface Props {
  onSelect: (status: string) => void;
  onBack: () => void;
}

export default function Step1_EmploymentStatus({ onSelect, onBack }: Props) {
  const options = ["Employed", "Self-Employed", "Freelance", "Unemployed", "Retired"];

  return (
    <ProfilingLayout
      questionNumber="2/10"
      title="Your Employment Status"
      subtitle="To better understand your cashflow to recommend the right fit for your lifestyle."
    >
      <div className="grid grid-cols-5 gap-4 mb-8">
        {options.map((opt) => (
          <button key={opt} className="card-option" onClick={() => onSelect(opt)}>
            <img src={`/images/employment-${opt.toLowerCase()}.png`} alt={opt} className="h-24 mx-auto" />
            <p>{opt}</p>
          </button>
        ))}
      </div>

      {/* Back Button */}
      <div className="flex justify-start">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
      </div>
    </ProfilingLayout>
  );
}
