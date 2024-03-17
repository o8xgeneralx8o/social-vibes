import { dataSelector } from '@/lib/dataSelector';
import { z } from 'zod';


export const mediaTypes = ["image", "video"] as const;

export const mediaContentSchema = z.object(
    {
        id: z.string(),
        url: z.string().url(),
        mediaType: z.enum(mediaTypes),
        postId: z.string()
    }
);

export type MediaContent = z.infer<typeof mediaContentSchema>;

export const mediaContentPublicInfo = dataSelector<MediaContent>(
    mediaContentSchema,
);
