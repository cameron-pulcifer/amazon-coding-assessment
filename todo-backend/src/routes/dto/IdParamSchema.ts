import { z } from 'zod';

export const IdParamSchema = z.object({
  id: z.uuid({ version: 'v7' }),
});

export type IdParam = z.infer<typeof IdParamSchema>;
