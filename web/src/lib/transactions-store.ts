export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  note?: string;
};

const transactions: Transaction[] = [
  {
    id: "tx_1",
    amount: 150000,
    type: "income",
    category: "salary",
    date: "2026-03-01",
    note: "Monthly salary",
  },
  {
    id: "tx_2",
    amount: 2500,
    type: "expense",
    category: "food",
    date: "2026-03-03",
    note: "Lunch",
  },
];

export const transactionsStore = {
  list() {
    return transactions;
  },
  getById(id: string) {
    return transactions.find((item) => item.id === id);
  },
  create(input: Omit<Transaction, "id">) {
    const item: Transaction = {
      ...input,
      id: `tx_${Date.now()}`,
    };
    transactions.unshift(item);
    return item;
  },
  update(id: string, input: Partial<Omit<Transaction, "id">>) {
    const index = transactions.findIndex((item) => item.id === id);
    if (index === -1) return undefined;
    const updated = { ...transactions[index], ...input };
    transactions[index] = updated;
    return updated;
  },
  remove(id: string) {
    const index = transactions.findIndex((item) => item.id === id);
    if (index === -1) return false;
    transactions.splice(index, 1);
    return true;
  },
};
