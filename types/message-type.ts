import { dataSelector } from '@/lib/dataSelector';
import { z } from 'zod';


export const MessageSchema = z.object({
    id: z.string(),
    conversationId: z.string(),
    senderId: z.string(),
    body: z.string(),
    seen: z.boolean(),
    createdAt: z.date(),
});

export type Message = z.infer<typeof MessageSchema>;

export const messagePublicInfo = dataSelector<Message>(
    MessageSchema
);