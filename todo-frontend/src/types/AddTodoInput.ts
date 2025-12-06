import type { Todo } from './Todo';

export type AddTodoInput = Omit<Todo, 'id' | 'createdAt' | 'categoryName'>;
