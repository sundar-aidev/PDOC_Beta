import ProfilingLayout from "@/components/layout/profilingLayout";

interface Props {
  onSelect: (value: string) => void;
  onNext: () => void;
}

export default function Step0_AgeRange({ onSelect, onNext }: Props) {
  const handleSelect = (value: string) => {
    onSelect(value);
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <ProfilingLayout
        questionNumber="1/10"
        title="Your Age Range"
        subtitle="To accurately determine your life stage, to give you the best recommendations."
        showWelcome
      >
        <div className="grid grid-cols-3 gap-4">
          {["18 - 39", "40 - 59", "60 and Above"].map((age) => (
            <button key={age} className="card-option" onClick={() => handleSelect(age)}>
              <img
                src={`/images/age-${age.replaceAll(" ", "").replaceAll("-", "_")}.png`}
                alt={age}
                className="h-24 mx-auto"
              />
              <p>{age}</p>
            </button>
          ))}
        </div>
      </ProfilingLayout>
    </div>
  );
}
