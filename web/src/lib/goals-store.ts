export type Goal = {
  id: string;
  title: string;
  target: number;
  saved: number;
  targetDate?: string;
};

const goals: Goal[] = [
  { id: "goal_1", title: "Laptop Fund", target: 100000, saved: 65000, targetDate: "2026-12-31" },
  { id: "goal_2", title: "Emergency Fund", target: 150000, saved: 80000 },
  { id: "goal_3", title: "Vacation", target: 75000, saved: 20000, targetDate: "2026-08-01" },
];

export const goalsStore = {
  list() {
    return goals;
  },
  getById(id: string) {
    return goals.find((item) => item.id === id);
  },
  create(input: Omit<Goal, "id">) {
    const item: Goal = {
      id: `goal_${Date.now()}`,
      ...input,
    };
    goals.unshift(item);
    return item;
  },
  update(id: string, input: Partial<Omit<Goal, "id">>) {
    const index = goals.findIndex((item) => item.id === id);
    if (index === -1) return undefined;
    const updated = { ...goals[index], ...input };
    goals[index] = updated;
    return updated;
  },
  remove(id: string) {
    const index = goals.findIndex((item) => item.id === id);
    if (index === -1) return false;
    goals.splice(index, 1);
    return true;
  },
};
