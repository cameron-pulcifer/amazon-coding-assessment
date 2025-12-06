import z from 'zod';

export const TodoSchema = z.object({
  id: z.uuid({ version: 'v7' }),
  title: z.string().min(1),
  description: z.string().min(1),
  dueDate: z.string(),
  completed: z.boolean(),
  categoryId: z.uuid({ version: 'v7' }),
  createdAt: z.coerce.date(),
});

export type Todo = z.infer<typeof TodoSchema>;
