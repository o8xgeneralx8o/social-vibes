import { dataSelector } from '@/lib/dataSelector';
import { z } from 'zod';



export const PostSchema = z.object({
    id: z.string(),
    authorId: z.string(),
    body: z.string(),
    createdAt: z.date(),
})

export type Post = z.infer<typeof PostSchema>;

export const postPublicInfo = dataSelector<Post>(
    PostSchema,
);
