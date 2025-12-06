import { groupBy } from 'es-toolkit/array';
import HttpCodes from '../constants/HttpCodes';
import repo from '../db/repositories/todosRepo';
import { ApiError } from '../errors/ApiError';
import { AddTodo } from '../routes/dto/AddTodoSchema';
import { Todo } from '../routes/dto/TodoSchema';
import { TodoSearchCriteria } from '../routes/dto/TodoSearchCriteriaSchema';

const findAll = async (criteria: TodoSearchCriteria) => {
  const results = await repo.findAll(criteria);
  // group the results by category name => [ [<category name>, [<todos>]] ]
  return Object.entries(groupBy(results, x => x.categoryName));
};

const findById = async (id: string) => {
  const item = await repo.findById(id);
  if (!item) {
    throw new ApiError(HttpCodes.NotFound, 'Todo not found');
  }
  return item;
};

const add = async (todo: AddTodo) => {
  const item = await repo.add(todo);
  if (!item) {
    throw new ApiError(HttpCodes.BadRequest, 'Todo could not be added');
  }
  return item;
};

const modify = async (todo: Todo) => {
  const item = await repo.modify(todo);
  if (!item) {
    throw new ApiError(HttpCodes.NotFound, 'Todo not found');
  }
  return item;
};

const remove = async (id: string) => {
  const item = await repo.remove(id);
  if (!item) {
    throw new ApiError(HttpCodes.NotFound, 'Todo not found');
  }
  return item;
};

export default {
  findAll,
  findById,
  add,
  modify,
  remove,
};
