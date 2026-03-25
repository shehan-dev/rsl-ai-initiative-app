export type Category = {
  id: string;
  name: string;
  type: "expense" | "income" | "both";
};

const categories: Category[] = [
  { id: "cat_food", name: "food", type: "expense" },
  { id: "cat_transport", name: "transport", type: "expense" },
  { id: "cat_bills", name: "bills", type: "expense" },
  { id: "cat_entertainment", name: "entertainment", type: "expense" },
  { id: "cat_salary", name: "salary", type: "income" },
  { id: "cat_other", name: "other", type: "both" },
];

export const categoriesStore = {
  list() {
    return categories;
  },
  getById(id: string) {
    return categories.find((item) => item.id === id);
  },
  create(input: Omit<Category, "id">) {
    const item: Category = {
      id: `cat_${Date.now()}`,
      ...input,
    };
    categories.push(item);
    return item;
  },
  update(id: string, input: Partial<Omit<Category, "id">>) {
    const index = categories.findIndex((item) => item.id === id);
    if (index === -1) return undefined;
    const updated = { ...categories[index], ...input };
    categories[index] = updated;
    return updated;
  },
  remove(id: string) {
    const index = categories.findIndex((item) => item.id === id);
    if (index === -1) return false;
    categories.splice(index, 1);
    return true;
  },
};
