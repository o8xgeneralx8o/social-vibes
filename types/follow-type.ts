import { dataSelector } from '@/lib/dataSelector';
import { z } from 'zod';


export const FollowSchema = z.object({
    id: z.string(),
    followerToId: z.string(),
    followedById: z.string(),
})

export type Follow = z.infer<typeof FollowSchema>;

export const followPublicInfo = dataSelector<Follow>(
    FollowSchema
);
