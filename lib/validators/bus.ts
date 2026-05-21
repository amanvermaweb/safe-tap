import { z } from 'zod';

export const busLocationSchema = z.object({
  busId: z.string().min(1),
  location: z.object({ type: z.literal('Point'), coordinates: z.tuple([z.number(), z.number()]) }),
  speed: z.number().optional(),
  driverId: z.string().optional(),
});

export type BusLocationInput = z.infer<typeof busLocationSchema>;
