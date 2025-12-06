import { Request, Response, NextFunction } from 'express';
import service from '../services/todoService';
import { TodoSearchCriteria } from '../routes/dto/TodoSearchCriteriaSchema';

const findAllTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await service.findAll(req.query as TodoSearchCriteria);
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

const findTodoById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await service.findById(req.params.id);
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await service.add(req.body);
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

const modifyTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await service.modify(req.body);
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

const removeTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await service.remove(req.params.id);
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

export default {
  findAllTodos,
  findTodoById,
  addTodo,
  modifyTodo,
  removeTodo,
};
