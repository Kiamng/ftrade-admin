import * as z from 'zod';

export const CitySchema = z.object({
  name: z.string().min(1, 'Category name is required')
});
