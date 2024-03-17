/**
 * @jest-environment node
 */

import {
    checkForStandardUser,
    changeMyAvatar,
    createStandardUser,
    findMyStandardUser,
    getStandardUsers
} from "@/lib/services/standardUser-service"
import prisma from "@/lib/db";
import { StandardUserPublic, StandardUserWithPrivateInfo } from "@/types/standardUser-type";
import { v4 as uuidv4 } from 'uuid';

type FakeStandardUser = {
    data: StandardUserWithPrivateInfo[],
    generateData: () => StandardUserWithPrivateInfo,
}

const fakeStandardUser: FakeStandardUser = {
    data: [] as StandardUserWithPrivateInfo[],
    generateData: function (): StandardUserWithPrivateInfo {
        let i = this.data.length
        return {
            id: uuidv4(),
            email: `test${i}@gmail.com`,
            avatar: 'https://placehold.co/600x400?text=Hello+World',
            givenName: `test${i}`,
        }
    }
}

afterAll(async () => {
    await prisma.standardUser.deleteMany({
        where: {
            id: {
                in: fakeStandardUser.data.map((standardUser: StandardUserWithPrivateInfo): string => {
                    return standardUser.id as string
                })
            }
        }
    });
})


describe('Services of Standard User', () => {

    describe('createStandardUser', () => {
        it('should create a standard user', async () => {
            try {
                const newStandardUser = fakeStandardUser.generateData();
                const standardUser = await createStandardUser(newStandardUser);
                expect(standardUser).toMatchObject<StandardUserWithPrivateInfo>(newStandardUser)
                fakeStandardUser.data.push(standardUser)
            } catch (e) {
                console.log(e);
            }
        })
        it('should throw error if email or id already exists', async () => {
            try {
                const newStandardUser = fakeStandardUser.data[0];
                const standardUser = () => createStandardUser(newStandardUser);
                expect(standardUser()).rejects.toThrow()
            } catch (e) {
                console.log(e);
            }
        })
    })

    describe('checkForStandardUser', () => {
        it('should return the user if the user exists', async () => {
            try {
                const standardUser = await checkForStandardUser(fakeStandardUser.data[0].email);
                expect(standardUser).toEqual({
                    ...fakeStandardUser.data[0],
                    email: undefined,
                })
            } catch (e) {
                console.log(e);
            }
        });
        it('should return null if the user doesn\'t exists', async () => {
            try {
                const standardUser = await checkForStandardUser('not-email142y7@gmail.com');
                expect(standardUser).toBe(null);
            } catch (e) {
                console.log(e);
            }
        });
    })

    describe('findMyStandardUser', () => {
        it('should find my account', async () => {
            try {
                const id: string | undefined = fakeStandardUser.data[0].id;
                let myStandardUser: StandardUserWithPrivateInfo = {} as StandardUserWithPrivateInfo;
                if (id)
                    myStandardUser = await findMyStandardUser(id);
                expect(myStandardUser).toEqual(fakeStandardUser.data[0])
            } catch (e) {
                console.log(e);
            }
        })
    })

    describe('getStandardUsers', () => {
        it('should view all the standard users in a specific range', async () => {
            try {
                for (let i = 1; i <= 15; i++) {
                    const standardUser = await createStandardUser(fakeStandardUser.generateData());
                    fakeStandardUser.data.push(standardUser)
                }
                const standardUsers: StandardUserPublic[] = await getStandardUsers(fakeStandardUser.data[0].id, [], { skip: 0, take: 9 });
                expect(standardUsers.length).toBe(9)
            } catch (e) {
                console.log(e);
            }
        })
    })

    describe('changeMyAvatar', () => {
        it('should call update function to update the avatar', async () => {
            try {
                const standardUser = await changeMyAvatar(fakeStandardUser.data[0].id as string, 'https://placehold.co/600x400?text=Edited');
                expect(standardUser.avatar).toBe('https://placehold.co/600x400?text=Edited')
            } catch (e) {
                console.log(e);
            }
        })
    })
})
