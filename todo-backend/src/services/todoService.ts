import { groupBy } from 'es-toolkit/array';
import repo from '../db/repositories/todosRepo';
import { AddTodo } from '../routes/dto/AddTodoSchema';
import { Todo } from '../routes/dto/TodoSchema';
import { TodoSearchCriteria } from '../routes/dto/TodoSearchCriteriaSchema';

const getAll = async (criteria: TodoSearchCriteria) => {
  const results = await repo.getAllTodos(criteria);
  // group the results by category name => [ [<category name>, [<todos>]] ]
  return Object.entries(groupBy(results, x => x.categoryName));
};

const getTodoById = async (id: string) => {
  return await repo.getTodoById(id);
};

const addTodo = async (todo: AddTodo) => {
  return await repo.addTodo(todo);
};

const updateTodo = async (todo: Todo) => {
  return await repo.updateTodo(todo);
};

const deleteTodo = async (id: string) => {
  return await repo.deleteTodo(id);
};

export default {
  getAll,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
};
