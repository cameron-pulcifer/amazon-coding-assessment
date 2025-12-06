import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
});

export type Category = z.infer<typeof CategorySchema>;
