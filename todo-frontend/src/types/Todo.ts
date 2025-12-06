export type Todo = {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string
  completed: boolean;
  categoryId: string;
  createdAt: string; // ISO date string
  categoryName?: string; // from joined query
};
