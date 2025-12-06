import { asc, desc, eq } from 'drizzle-orm';
import { TodoSearchCriteria } from '../../routes/dto/TodoSearchCriteriaSchema';
import { db } from '../conn';
import { categories, Todo, todos } from '../schema';

// future: pagination - not specified in assessment

const add = async (todo: Omit<Todo, 'id' | 'createdAt'>) => {
  const result = await db.insert(todos).values(todo).returning();
  const [first] = result;
  return first ?? null;
};

const remove = async (id: string) => {
  const result = await db.delete(todos).where(eq(todos.id, id)).returning();
  const [first] = result;
  return first ?? null;
};

const findAll = async (criteria: TodoSearchCriteria) => {
  const { orderBy = 'dueDate', sortDirection = 'desc', completed = 'all' } = criteria;

  const dateOrder = sortDirection === 'asc' ? asc(todos[orderBy]) : desc(todos[orderBy]);

  let query = db
    .select({
      id: todos.id,
      title: todos.title,
      description: todos.description,
      dueDate: todos.dueDate,
      completed: todos.completed,
      categoryId: todos.categoryId,
      createdAt: todos.createdAt,
      categoryName: categories.name,
    })
    .from(todos)
    .innerJoin(categories, eq(todos.categoryId, categories.id));

  // Apply completion filter
  if (completed === 'active') {
    query = query.where(eq(todos.completed, false)) as typeof query;
  } else if (completed === 'completed') {
    query = query.where(eq(todos.completed, true)) as typeof query;
  }
  // If 'all', no filter is applied

  return query.orderBy(asc(categories.name), dateOrder);
};

const findById = async (id: string) => {
  return await db.query.todos.findFirst({
    where: (todos, { eq }) => eq(todos.id, id),
    with: {
      category: true,
    },
  });
};

const modify = async (todo: Partial<Todo> & Pick<Todo, 'id'>) => {
  const result = await db.update(todos).set(todo).where(eq(todos.id, todo.id)).returning();
  const [first] = result;
  return first ?? null;
};

export default {
  add,
  remove,
  findAll,
  findById,
  modify,
};
