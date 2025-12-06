import { eq } from 'drizzle-orm';
import { db } from '../conn';
import { categories, Category } from '../schema';

const addCategory = async (category: Omit<Category, 'id'>) => {
  const result = await db.insert(categories).values(category).returning();
  const [first] = result;
  return first ?? null;
};

const deleteCategory = async (id: string) => {
  const result = await db.delete(categories).where(eq(categories.id, id)).returning();
  const [first] = result;
  return first ?? null;
};

const getAllCategories = async (limit = 10, offset = 0) => {
  return await db.query.categories.findMany({
    limit,
    offset,
    orderBy: (categories, { asc }) => [asc(categories.name)],
  });
};

const getCategoryById = async (id: string) => {
  return await db.query.categories.findFirst({ where: (categories, { eq }) => eq(categories.id, id) });
};

const updateCategory = async (category: Category) => {
  const result = await db.update(categories).set(category).where(eq(categories.id, category.id)).returning();
  const [first] = result;
  return first ?? null;
};

export default {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
};
