import ProfilingLayout from "@/components/layout/profilingLayout";

interface Props {
  onSelect: (value: string) => void;
  onBack: () => void;
}

export default function Step2_2_IncomeSource_Unemployed({ onSelect, onBack }: Props) {
  return (
    <ProfilingLayout
      questionNumber="2/10"
      title="Your Employment Status"
      subtitle="What is your primary source of income?"
    >
      <div className="grid grid-cols-2 gap-4">
        {["Assets and Investments", "Savings"].map((opt) => (
          <button key={opt} className="card-option" onClick={() => onSelect(opt)}>
            <img src={`/images/income-${opt.toLowerCase().replace(/ /g, "-")}.png`} className="h-24 mx-auto" />
            <p>{opt}</p>
          </button>
        ))}
      </div>
      <button className="btn-secondary mt-4" onClick={onBack}>Back</button>
    </ProfilingLayout>
  );
}
