import { dataSelector } from '@/lib/dataSelector';
import { z } from 'zod';

export const CommentSchema = z.object({
    id: z.string(),
    authorId: z.string(),
    body: z.string(),
    createdAt: z.date(),
    postId: z.string().nullable(),
    commentId: z.string().nullable()
});


export type Comment = z.infer<typeof CommentSchema>;

export const commentPublicInfo = dataSelector<Comment>(
    CommentSchema
);
