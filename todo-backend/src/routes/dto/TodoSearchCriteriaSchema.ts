import { z } from 'zod';

export const TodoSearchCriteriaSchema = z.object({
  orderBy: z.enum(['createdAt', 'dueDate']), //.default('dueDate'),
  sortDirection: z.enum(['asc', 'desc']), //.default('desc'),
  completed: z.enum(['all', 'active', 'completed']).optional(),
});

export type TodoSearchCriteria = z.infer<typeof TodoSearchCriteriaSchema>;
