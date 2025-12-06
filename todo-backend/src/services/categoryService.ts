import HttpCodes from '../constants/HttpCodes';
import categoriesRepo from '../db/repositories/categoriesRepo';
import { Category } from '../db/schema';
import { ApiError } from '../errors/ApiError';

const findAll = async () => {
  return await categoriesRepo.getAll();
};

const findById = async (id: string) => {
  const item = await categoriesRepo.getById(id);
  if (!item) {
    throw new ApiError(HttpCodes.NotFound, 'Category not found');
  }
  return item;
};

const add = async (category: Omit<Category, 'id'>) => {
  const item = await categoriesRepo.add(category);
  if (!item) {
    throw new ApiError(HttpCodes.BadRequest, 'Category could not be added');
  }
  return item;
};

const modify = async (category: Category) => {
  const item = await categoriesRepo.modify(category);
  if (!item) {
    throw new ApiError(HttpCodes.NotFound, 'Category not found');
  }
  return item;
};

const remove = async (id: string) => {
  const category = await categoriesRepo.remove(id);
  if (!category) {
    throw new ApiError(HttpCodes.NotFound, 'Category not found');
  }
  return category;
};

export default {
  findAll,
  findById,
  add,
  remove,
  modify,
};
