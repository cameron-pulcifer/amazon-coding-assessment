import { Request, Response } from 'express';
import HttpCodes from '../constants/HttpCodes';
import service from '../services/categoryService';

const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await service.getAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(HttpCodes.BadRequest).json({ error: 'Failed to get categories' });
  }
};

const addCategory = async (req: Request, res: Response) => {
  try {
    const category = await service.add(req.body);
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(HttpCodes.BadRequest).json({ error: 'Failed to add category' });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await service.getById(req.params.id);
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(HttpCodes.BadRequest).json({ error: 'Failed to get category' });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await service.update(req.body);
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(HttpCodes.BadRequest).json({ error: 'Failed to update category' });
  }
};

const removeCategory = async (req: Request, res: Response) => {
  try {
    const category = await service.remove(req.params.id);
    res.json(category);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Check if it's a foreign key constraint error (category is in use)
    // Postgres error code 23503 is for foreign key violation
    // Also check the cause property which might contain the actual DB error
    const isForeignKeyError =
      err.code === '23503' ||
      err.cause?.code === '23503' ||
      err.constraint_name?.includes('categoryId') ||
      err.message?.toLowerCase().includes('foreign key') ||
      err.detail?.toLowerCase().includes('foreign key') ||
      err.cause?.message?.toLowerCase().includes('foreign key') ||
      err.message?.toLowerCase().includes('violates foreign key constraint');

    if (isForeignKeyError) {
      res.status(HttpCodes.Conflict).json({
        error: 'Category is in use',
        message: 'This category cannot be deleted because it is being used by one or more to-do items.',
      });
    } else {
      res.status(HttpCodes.BadRequest).json({ error: 'Failed to remove category' });
    }
  }
};

export default {
  getAllCategories,
  addCategory,
  getCategoryById,
  updateCategory,
  removeCategory,
};
