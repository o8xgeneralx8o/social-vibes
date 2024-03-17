import { dataSelector } from '@/lib/dataSelector';
import { z } from 'zod';

const StandardUserPublicSchema = z.object({
    id: z.string(),
    givenName: z.string(),
    avatar: z.string().url(),
})

export const StandardUserWithPrivateInfoSchema = StandardUserPublicSchema.extend({
    email: z.string().email(),
})

export type StandardUserPublic = z.infer<typeof StandardUserPublicSchema>;

export type StandardUserWithPrivateInfo = z.infer<typeof StandardUserWithPrivateInfoSchema>;

export const standardUserPublicInfo = dataSelector<StandardUserPublic>(StandardUserPublicSchema);

export const standardUserWithPrivateInfo = dataSelector<StandardUserWithPrivateInfo>(StandardUserWithPrivateInfoSchema);


