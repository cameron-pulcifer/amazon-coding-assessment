import { z } from 'zod';
import { CategorySchema } from './CategorySchema';

export const AddCategorySchema = CategorySchema.omit({ id: true });

export type AddCategory = z.infer<typeof AddCategorySchema>;
