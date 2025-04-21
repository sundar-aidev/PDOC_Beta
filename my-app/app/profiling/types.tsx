export type StepKey =
  | "age"
  | "employment"
  | "netIncome"
  | "incomeSourceUnemployed"
  | "incomeSourceRetired"
  | "monthlySpending"
  | "monthlyPension"
  | "portfolioValue"
  | "investmentStyle"
  | "drawdownReaction"
  | "stockComfort"
  | "investmentTopics"
  | "investmentPriorities"
  | "confirmation"
  | "result"; // ✅ Step 10 - Investment profile result

export type UserProfileAnswers = {
  ageRange?: string;
  employmentStatus?: string;
  netMonthlyIncome?: number;
  incomeSource?: string;
  monthlySpending?: number;
  monthlyPension?: number;
  portfolioValue?: number;
  investmentStyle?: string;
  drawdownReaction?: string;
  stockComfort?: number;
  investmentTopics?: string[];
  investmentPriorities?: string[];
};
