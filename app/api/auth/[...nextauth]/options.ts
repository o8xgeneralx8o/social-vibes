import type { NextAuthOptions, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import standardUserServices from "@/lib/services/standardUser-service";
import { StandardUserPublic, StandardUserWithPrivateInfoSchema } from '@/types/standardUser-type'
import { Session } from '@/types/modules/next-auth'
import { v4 as uuidv4 } from 'uuid';

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,

        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ profile, user }) {
            try {
                if (!profile?.email)
                    throw Error("Email doesn't Exist")

                // check if user already exists
                const userExists: StandardUserPublic | null = await standardUserServices.checkIfOneExists(profile?.email);

                // if not, create a new standardUser
                if (!userExists) {
                    const { email, image: avatar, name: givenName }: User = user;
                    const standardUserToCreate = {
                        id: uuidv4(),
                        email,
                        avatar,
                        givenName,
                    }

                    await standardUserServices.createOne(StandardUserWithPrivateInfoSchema.parse(standardUserToCreate));
                }

                return true
            } catch (error: any) {
                console.log("Error While Signing In >>> ", error.message);
                return false
            }
        },
        async session({ session }: { session: Session }) {
            try {
                if (!session || !session?.user?.email)
                    throw 'UnAuthorized'

                const sessionUser: StandardUserPublic | null = await standardUserServices.checkIfOneExists(session?.user?.email);

                if (sessionUser)
                    session.user.id = sessionUser?.id?.toString();

                return session;
            } catch (err) {
                return session
            }
        },
    }
}
