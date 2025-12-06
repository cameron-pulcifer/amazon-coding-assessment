import categoriesRepo from '../db/repositories/categoriesRepo';
import { Category } from '../db/schema';

const getAll = async () => {
  return await categoriesRepo.getAllCategories();
};

const getById = async (id: string) => {
  return await categoriesRepo.getCategoryById(id);
};

const add = async (category: Omit<Category, 'id'>) => {
  return await categoriesRepo.addCategory(category);
};

const update = async (category: Category) => {
  return await categoriesRepo.updateCategory(category);
};

const remove = async (id: string) => {
  return await categoriesRepo.deleteCategory(id);
};

export default {
  getAll,
  getById,
  add,
  remove,
  update,
};
