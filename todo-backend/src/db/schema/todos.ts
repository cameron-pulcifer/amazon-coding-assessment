import { relations, sql } from 'drizzle-orm';
import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { categories } from './categories';

export const todos = pgTable('todos', {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
  title: varchar().notNull(),
  description: varchar(),
  dueDate: timestamp({ mode: 'string' }).notNull(),
  completed: boolean().notNull().default(false),
  categoryId: uuid()
    .references(() => categories.id)
    .notNull(),
  createdAt: timestamp()
    .notNull()
    .default(sql`now()`),
});

export const todosRelations = relations(todos, ({ one }) => ({
  category: one(categories, { fields: [todos.categoryId], references: [categories.id] }),
}));

export type Todo = typeof todos.$inferSelect;
