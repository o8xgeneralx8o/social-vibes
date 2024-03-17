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



afterEach(() => {
    jest.clearAllMocks();
})


describe('Services of Standard User', () => {

    describe('checkForStandardUser', () => {
        it('should call findUnique function to find the standard user', async () => {
            try {
                prisma.standardUser.findUnique = jest.fn();
                await checkForStandardUser('test@gmail.com');
                expect((prisma.standardUser.findUnique as jest.Mock).mock.calls.length).toBe(1)
            } catch (e) {
                console.log(e);
            }
        })
    })

    describe('createStandardUser', () => {
        it('should call create function to create a new standard user', async () => {
            try {
                prisma.standardUser.create = jest.fn();
                await createStandardUser({
                    id: 'aaaa-aaaa-aaaa-aaaa',
                    avatar: 'https://placehold.co/600x400?text=Hello+World',
                    email: 'test123@gmail.com',
                    givenName: 'test',
                });
                expect((prisma.standardUser.create as jest.Mock).mock.calls.length).toBe(1)
            } catch (e) {
                console.log(e);
            }
        })
    })

    describe('findMyStandardUser', () => {
        it('should call findUnique function to find the standard user', async () => {
            try {
                prisma.standardUser.findUniqueOrThrow = jest.fn();
                await findMyStandardUser('aaaa-aaaa-aaaa-aaaa');
                expect((prisma.standardUser.findUniqueOrThrow as jest.Mock).mock.calls.length).toBe(1)
            } catch (e) {
                console.log(e);
            }
        })
    })

    describe('getStandardUsers', () => {
        it('should call findMany function to find all the users in specific range', async () => {
            try {
                prisma.standardUser.findMany = jest.fn();
                await getStandardUsers('aaaa-aaaa-aaaa-aaaa', [], { skip: 9, take: 9 });
                expect((prisma.standardUser.findMany as jest.Mock).mock.calls.length).toBe(1)
            } catch (e) {
                console.log(e);
            }
        })
    })

    describe('changeMyAvatar', () => {
        it('should call update function to update the avatar', async () => {
            try {
                prisma.standardUser.update = jest.fn();
                await changeMyAvatar('aaaa-aaaa-aaaa-aaaa', 'https://placehold.co/600x400?text=Hello+World');
                expect((prisma.standardUser.update as jest.Mock).mock.calls.length).toBe(1)
            } catch (e) {
                console.log(e);
            }
        })
    })
})