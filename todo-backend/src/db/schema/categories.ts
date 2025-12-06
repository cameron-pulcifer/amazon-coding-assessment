import { relations, sql } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { todos } from './todos';

export const categories = pgTable('categories', {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
  name: varchar().notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  todos: many(todos),
}));

export type Category = typeof categories.$inferSelect;
