"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { StepKey, UserProfileAnswers } from "./types";
import Step0_AgeRange from "./steps/Step0_AgeRange";
import Step1_EmploymentStatus from "./steps/Step1_EmploymentStatus";
import Step2_1_NetMonthlyIncome from "./steps/Step2_1_NetMonthlyIncome";
import Step2_2_IncomeSource_Unemployed from "./steps/Step2_2_IncomeSource_Unemployed";
import Step2_3_IncomeSource_Retired from "./steps/Step2_3_IncomeSource_Retired";
import Step2_4_1_MonthlySpending from "./steps/Step2_4_1_MonthlySpending";
import Step2_4_2_MonthlyPension from "./steps/Step2_4_2_MonthlyPension";
import Step3_PortfolioValue from "./steps/Step3_PortfolioValue";
import Step4_InvestmentStyle from "./steps/Step4_InvestmentStyle";
import Step5_DrawdownReaction from "./steps/Step5_DrawdownReaction";
import Step6_StockComfort from "./steps/Step6_StockComfort";
import Step7_InvestmentTopics from "./steps/Step7_InvestmentTopics";
import Step8_InvestmentPriorities from "./steps/Step8_InvestmentPriorities";
import Step9_Confirmation from "./steps/Step9_Confirmation";
import Step10_Result from "./steps/Step10_Result";

export default function ProfilingPage() {
  const [currentStep, setCurrentStep] = useState<StepKey>("age");
  const [answers, setAnswers] = useState<UserProfileAnswers>({});
  const router = useRouter();

  const updateAnswer = (key: keyof UserProfileAnswers, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = (step: StepKey) => setCurrentStep(step);

  return (
    <div className="max-w-3xl mx-auto p-6">
        
      {currentStep === "age" && (
        <Step0_AgeRange
          onNext={() => nextStep("employment")}
          onSelect={(value) => updateAnswer("ageRange", value)}
        />
      )}

      {currentStep === "employment" && (
        <Step1_EmploymentStatus
          onSelect={(status) => {
            updateAnswer("employmentStatus", status);
            if (["Employed", "Self-Employed", "Freelance"].includes(status)) {
              nextStep("netIncome");
            } else if (status === "Unemployed") {
              nextStep("incomeSourceUnemployed");
            } else if (status === "Retired") {
              nextStep("incomeSourceRetired");
            }
          }}
          onBack={() => nextStep("age")}
        />
      )}

      {currentStep === "netIncome" && (
        <Step2_1_NetMonthlyIncome
          onNext={() => nextStep("portfolioValue")}
          onBack={() => nextStep("employment")}
          onSubmit={(value) => updateAnswer("netMonthlyIncome", value)}
        />
      )}

      {currentStep === "incomeSourceUnemployed" && (
        <Step2_2_IncomeSource_Unemployed
          onSelect={(src) => {
            updateAnswer("incomeSource", src);
            if (src === "Assets and Investments") {
              nextStep("netIncome");
            } else if (src === "Savings") {
              nextStep("monthlySpending");
            }
          }}
          onBack={() => nextStep("employment")}
        />
      )}

      {currentStep === "incomeSourceRetired" && (
        <Step2_3_IncomeSource_Retired
          onSelect={(src) => {
            updateAnswer("incomeSource", src);
            if (src === "Assets and Investments") {
              nextStep("netIncome");
            } else if (src === "Savings") {
              nextStep("monthlySpending");
            } else if (src === "Pension") {
              nextStep("monthlyPension");
            }
          }}
          onBack={() => nextStep("employment")}
        />
      )}

      {currentStep === "monthlySpending" && (
        <Step2_4_1_MonthlySpending
          onSubmit={(value) => {
            updateAnswer("monthlySpending", value);
            nextStep("portfolioValue");
          }}
          onBack={() => nextStep("incomeSourceRetired")}
        />
      )}

      {currentStep === "monthlyPension" && (
        <Step2_4_2_MonthlyPension
          onSubmit={(value) => {
            updateAnswer("monthlyPension", value);
            nextStep("portfolioValue");
          }}
          onBack={() => nextStep("incomeSourceRetired")}
        />
      )}

      {currentStep === "portfolioValue" && (
        <Step3_PortfolioValue
          onSubmit={(value) => {
            updateAnswer("portfolioValue", value);
            nextStep("investmentStyle");
          }}
          onBack={() => {
            if (answers.incomeSource === "Pension") nextStep("monthlyPension");
            else if (answers.incomeSource === "Savings") nextStep("monthlySpending");
            else nextStep("netIncome");
          }}
        />
      )}

      {currentStep === "investmentStyle" && (
        <Step4_InvestmentStyle
          onSelect={(value) => {
            updateAnswer("investmentStyle", value);
            nextStep("drawdownReaction");
          }}
          onBack={() => nextStep("portfolioValue")}
        />
      )}

      {currentStep === "drawdownReaction" && (
        <Step5_DrawdownReaction
          onSelect={(value) => {
            updateAnswer("drawdownReaction", value);
            nextStep("stockComfort");
          }}
          onBack={() => nextStep("investmentStyle")}
        />
      )}

      {currentStep === "stockComfort" && (
        <Step6_StockComfort
          onSelect={(value) => {
            updateAnswer("stockComfort", value);
            nextStep("investmentTopics");
          }}
          onBack={() => nextStep("drawdownReaction")}
        />
      )}

      {currentStep === "investmentTopics" && (
        <Step7_InvestmentTopics
          onSubmit={(selected) => {
            updateAnswer("investmentTopics", selected);
            nextStep("investmentPriorities");
          }}
          onBack={() => nextStep("stockComfort")}
        />
      )}
      
        {currentStep === "investmentPriorities" && (
        <Step8_InvestmentPriorities
            onSubmit={(selected) => {
            updateAnswer("investmentPriorities", selected);
            nextStep("confirmation");
            }}
            onBack={() => nextStep("investmentTopics")}
        />
        )}

        {currentStep === "confirmation" && (
            <Step9_Confirmation
                answers={answers}
                onConfirm={() => {
                    console.log("📤 Final Profile Submission:", answers);
                    nextStep("result"); // ✅ Step 10
                  }}
                onBack={() => nextStep("investmentPriorities")}
            />
        )}

        {currentStep === "result" && (
        <Step10_Result
            profileCode="BioTech Investor" // ⬅ Replace with your derived logic based on `answers`
            description="You're a focused biotech investor with high ESG awareness and exposure to emerging markets.
            Your portfolio is well-diversified across sectors, with a strong emphasis on healthcare and technology."
        />
        )}
    </div>
  );
}
