"use client";

import { useState } from "react";
import ProfilingLayout from "@/components/layout/profilingLayout";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { UserProfileAnswers } from "../types";

interface Props {
  answers: UserProfileAnswers;
  onConfirm: () => void;
  onBack: () => void;
}

export default function Step9_Confirmation({ answers, onConfirm, onBack }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const formatList = (arr?: string[]) =>
    arr?.length ? arr.map((item) => <li key={item}>{item}</li>) : null;

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      onConfirm();
    }, 1500); // ⏱ Adjust delay as needed
  };

  return (
    <ProfilingLayout
      questionNumber="9/10"
      title="Confirm Your Profiling Answers"
      subtitle="Here is the information you’ve provided. Click Confirm if everything looks good."
    >
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <div className="space-y-4 text-sm text-gray-700">
            {answers.ageRange && <p><strong>Age Range:</strong> {answers.ageRange}</p>}
            {answers.employmentStatus && <p><strong>Employment Status:</strong> {answers.employmentStatus}</p>}
            {answers.netMonthlyIncome !== undefined && <p><strong>Net Monthly Income:</strong> {answers.netMonthlyIncome}</p>}
            {answers.incomeSource && <p><strong>Income Source:</strong> {answers.incomeSource}</p>}
            {answers.monthlySpending !== undefined && <p><strong>Monthly Spending:</strong> {answers.monthlySpending}</p>}
            {answers.monthlyPension !== undefined && <p><strong>Monthly Pension:</strong> {answers.monthlyPension}</p>}
            {answers.portfolioValue !== undefined && <p><strong>Portfolio Value:</strong> {answers.portfolioValue}</p>}
            {answers.investmentStyle && <p><strong>Investment Style:</strong> {answers.investmentStyle}</p>}
            {answers.drawdownReaction && <p><strong>Drawdown Reaction:</strong> {answers.drawdownReaction}</p>}
            {answers.stockComfort !== undefined && (
              <p><strong>Stock Comfort Level:</strong> {answers.stockComfort} stocks</p>
            )}
            {answers.investmentTopics && answers.investmentTopics.length > 0 && (
              <>
                <p><strong>Investment Topics:</strong></p>
                <ul className="list-disc list-inside">{formatList(answers.investmentTopics)}</ul>
              </>
            )}
            {answers.investmentPriorities && answers.investmentPriorities.length > 0 && (
              <>
                <p><strong>Investment Priorities:</strong></p>
                <ul className="list-disc list-inside">{formatList(answers.investmentPriorities)}</ul>
              </>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button className="btn-secondary" onClick={onBack}>Back</button>
            <button className="btn-primary" onClick={handleConfirm}>Confirm</button>
          </div>
        </>
      )}
    </ProfilingLayout>
  );
}
