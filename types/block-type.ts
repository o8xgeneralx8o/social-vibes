import { z } from 'zod';
import { dataSelector } from '@/lib/dataSelector';


export const BlockSchema = z.object({
    id: z.string(),
    blockedThisId: z.string(),
    blockedById: z.string(),
})

export type Block = z.infer<typeof BlockSchema>;

export const blockPublicInfo = dataSelector<Block>(
    BlockSchema
);
