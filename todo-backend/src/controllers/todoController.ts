import { Request, Response } from 'express';
import HttpCodes from '../constants/HttpCodes';
import service from '../services/todoService';
import { TodoSearchCriteria } from '../routes/dto/TodoSearchCriteriaSchema';

const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await service.getAll(req.query as TodoSearchCriteria);
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(HttpCodes.BadRequest).json({ error: 'Failed to get todos' });
  }
};

const getTodoById = async (req: Request, res: Response) => {
  try {
    const todo = await service.getTodoById(req.params.id);
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(HttpCodes.BadRequest).json({ error: 'Failed to get todo' });
  }
};

const addTodo = async (req: Request, res: Response) => {
  try {
    const todo = await service.addTodo(req.body);
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(HttpCodes.BadRequest).json({ error: 'Failed to add todo' });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const todo = await service.updateTodo(req.body);
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(HttpCodes.BadRequest).json({ error: 'Failed to update todo' });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await service.deleteTodo(req.params.id);
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(HttpCodes.BadRequest).json({ error: 'Failed to delete todo' });
  }
};

export default {
  getAllTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
};
