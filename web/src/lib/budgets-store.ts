export type CategoryBudget = {
  category: string;
  allocated: number;
};

export type MonthlyBudget = {
  id: string;
  month: string;
  totalBudget: number;
  categoryBudgets: CategoryBudget[];
};

const budgets: MonthlyBudget[] = [
  {
    id: "budget_2026_03",
    month: "2026-03",
    totalBudget: 120000,
    categoryBudgets: [
      { category: "food", allocated: 25000 },
      { category: "transport", allocated: 12000 },
      { category: "bills", allocated: 35000 },
      { category: "entertainment", allocated: 10000 },
      { category: "other", allocated: 8000 },
    ],
  },
];

export const budgetsStore = {
  list() {
    return budgets;
  },
  getByMonth(month: string) {
    return budgets.find((item) => item.month === month);
  },
  upsertByMonth(month: string, input: Omit<MonthlyBudget, "id" | "month">) {
    const existing = budgets.find((item) => item.month === month);
    if (existing) {
      existing.totalBudget = input.totalBudget;
      existing.categoryBudgets = input.categoryBudgets;
      return existing;
    }
    const created: MonthlyBudget = {
      id: `budget_${Date.now()}`,
      month,
      totalBudget: input.totalBudget,
      categoryBudgets: input.categoryBudgets,
    };
    budgets.push(created);
    return created;
  },
};
