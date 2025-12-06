import z from 'zod/index';
import { TodoSchema } from './TodoSchema';

export const PatchTodoSchema = TodoSchema.partial().required({ id: true });

export type PatchTodo = z.infer<typeof PatchTodoSchema>;
