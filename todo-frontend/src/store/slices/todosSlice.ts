import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { GroupedTodos } from '../../types/GroupedTodos';
import type { Todo } from '../../types/Todo';
import type { TodoSearchCriteria } from '../../types/TodoSearchCriteria';
import type { RootState } from '../registry';

interface TodosState {
  todos: GroupedTodos;
  criteria: TodoSearchCriteria;
}

const initialState: TodosState = {
  todos: [],
  criteria: {
    completed: 'all',
    orderBy: 'dueDate',
    sortDirection: 'asc',
  },
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<GroupedTodos>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<{ categoryName: string; todo: Todo }>) => {
      const { categoryName, todo } = action.payload;
      const categoryIndex = state.todos.findIndex(([name]) => name === categoryName);

      if (categoryIndex >= 0) {
        state.todos[categoryIndex][1].push(todo);
      } else {
        state.todos.push([categoryName, [todo]]);
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      for (const [, todos] of state.todos) {
        const index = todos.findIndex((todo: Todo) => todo.id === action.payload.id);
        if (index !== -1) {
          todos[index] = action.payload;
          break;
        }
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      for (const [, todos] of state.todos) {
        const index = todos.findIndex((todo: Todo) => todo.id === action.payload);
        if (index !== -1) {
          todos.splice(index, 1);
          break;
        }
      }
    },
    setCriteria: (state, action: PayloadAction<Partial<TodoSearchCriteria>>) => {
      state.criteria = { ...state.criteria, ...action.payload };
    },
  },
});

export const { setTodos, addTodo, updateTodo, removeTodo, setCriteria } = todosSlice.actions;

// Selectors
export const selectTodos = (state: RootState) => state.todos.todos;
export const selectCriteria = (state: RootState) => state.todos.criteria;
export const selectTodoById = (id: string) => (state: RootState) => {
  for (const [, todos] of state.todos.todos) {
    const todo = todos.find((todo: Todo) => todo.id === id);
    if (todo) return todo;
  }
  return undefined;
};

export default todosSlice.reducer;
