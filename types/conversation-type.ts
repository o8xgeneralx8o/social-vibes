import { dataSelector } from '@/lib/dataSelector';
import { z } from 'zod';


export const ConversationSchema = z.object({
    id: z.string(),
    firstParticipantId: z.string(),
    secondParticipantId: z.string()
})

export type Conversation = z.infer<typeof ConversationSchema>;

export const conversationPublicInfo = dataSelector<Conversation>(
    ConversationSchema
);