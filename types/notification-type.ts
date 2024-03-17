import { dataSelector } from '@/lib/dataSelector';
import { z } from 'zod';

export const NotifcationSchema = z.object({
    id: z.string(),
    userIdToNotifie: z.string(),
    likeId: z.string().nullable(),
    followId: z.string().nullable(),
    commentId: z.string().nullable(),
    seen: z.boolean(),
    createdAt: z.date(),
})

export type Notification = z.infer<typeof NotifcationSchema>;

export const notificationPublicInfo = dataSelector<Notification>(
    NotifcationSchema
);