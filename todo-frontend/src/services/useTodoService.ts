import type { AxiosError } from 'axios';
import type { AddTodoInput } from '../types/AddTodoInput';
import type { GroupedTodos } from '../types/GroupedTodos';
import type { Todo } from '../types/Todo';
import type { TodoSearchCriteria } from '../types/TodoSearchCriteria';
import type { UpdateTodoInput } from '../types/UpdateTodoInput';
import useApi from './useApi';

const useTodoService = () => {
  const { api, handleError } = useApi();

  const getTodos = async (criteria: TodoSearchCriteria): Promise<GroupedTodos> => {
    try {
      const urlParams = new URLSearchParams(criteria);
      const response = await api.get<GroupedTodos>(`/todos?${urlParams.toString()}`);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  const getTodoById = async (id: string): Promise<Todo> => {
    try {
      const response = await api.get<Todo>(`/todos/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  const addTodo = async (todo: AddTodoInput): Promise<Todo> => {
    try {
      const response = await api.post<Todo>('/todos', todo);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  const modifyTodo = async (todo: UpdateTodoInput): Promise<Todo> => {
    try {
      const response = await api.patch<Todo>(`/todos/${todo.id}`, todo);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  const removeTodo = async (id: string): Promise<Todo> => {
    try {
      const response = await api.delete<Todo>(`/todos/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  return {
    getTodos,
    getTodoById,
    addTodo,
    modifyTodo,
    removeTodo,
  };
};

export default useTodoService;
