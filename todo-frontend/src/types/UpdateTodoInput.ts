import type { AddTodoInput } from './AddTodoInput';

export type UpdateTodoInput = Partial<AddTodoInput> & { id: string };
