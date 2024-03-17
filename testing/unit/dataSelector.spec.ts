import { dataSelector } from '@/lib/dataSelector';

describe('privacy-guard', () => {
    it('should gives us object which its members are the schema keys with the value true except the schema private keys', () => {
        const OurObjectSchema = {
            shape: {
                public1: 'Hello',
                public2: 'World',
            }
        }

        type OurType = typeof OurObjectSchema.shape;

        const StandardUserPublicInfo = dataSelector<OurType>(
            OurObjectSchema
        );

        expect(StandardUserPublicInfo).toEqual({
            public1: true,
            public2: true,
        })
    });
});