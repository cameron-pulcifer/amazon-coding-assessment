import { z } from 'zod';
import { TodoSchema } from './TodoSchema';

export const AddTodoSchema = TodoSchema.omit({ id: true, createdAt: true });

export type AddTodo = z.infer<typeof AddTodoSchema>;
