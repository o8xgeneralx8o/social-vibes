import { dataSelector } from '@/lib/dataSelector';
import { z } from 'zod';


export const LikeSchema = z.object({
    id: z.string(),
    standardUserId: z.string(),
    postId: z.string().nullable(),
    commentId: z.string().nullable(),
})

export type Like = z.infer<typeof LikeSchema>;


export const likePublicInfo = dataSelector<Like>(
    LikeSchema
);

