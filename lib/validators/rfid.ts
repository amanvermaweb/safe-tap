import { z } from 'zod';

export const rfidScanSchema = z.object({
  rfidTagId: z.string().min(1),
  busId: z.string().min(1),
  scannerId: z.string().optional(),
  location: z
    .object({ type: z.literal('Point'), coordinates: z.tuple([z.number(), z.number()]) })
    .optional(),
  timestamp: z.string().optional(),
});

export type RFIDScanInput = z.infer<typeof rfidScanSchema>;
