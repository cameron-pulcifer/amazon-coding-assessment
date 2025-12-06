import { Request, Response, NextFunction } from 'express';
import service from '../services/categoryService';

const findAllCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await service.findAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const addCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await service.add(req.body);
    res.json(category);
  } catch (err) {
    next(err);
  }
};

const findCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await service.findById(req.params.id);
    res.json(category);
  } catch (err) {
    next(err);
  }
};

const modifyCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await service.modify(req.body);
    res.json(category);
  } catch (err) {
    next(err);
  }
};

const removeCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await service.remove(req.params.id);
    res.json(category);
  } catch (err) {
    next(err);
  }
};

export default {
  findAllCategories,
  addCategory,
  findCategoryById,
  modifyCategory,
  removeCategory,
};
