import prisma from "../db"
import PaginationPreferences from "@/types/paginationPreferences-type";
import { Follow, followPublicInfo } from "@/types/follow-type";
import { Block, blockPublicInfo } from "@/types/block-type";
import {
    StandardUserPublic,
    StandardUserWithPrivateInfo,
    standardUserPublicInfo,
    standardUserWithPrivateInfo
} from '@/types/standardUser-type'

type StandardUserServices = {
    checkIfOneExists: (email: string) => Promise<StandardUserPublic | null>,
    createOne: (standardUserToCreate: StandardUserWithPrivateInfo) => Promise<StandardUserWithPrivateInfo>,
    findOwn: (standardUserId: string) => Promise<StandardUserWithPrivateInfo>,
    getThem: (standardUserId: string, notAllwedUsers: string[], paginationPreferences: PaginationPreferences) => Promise<StandardUserPublic[]>,
    changeAvatar: (standardUserId: string, avatarURL: string) => Promise<StandardUserWithPrivateInfo>,
    getSpecificOne: (currentStandardUserId: string, standardUserIdToGet: string) => Promise<StandardUserPublic & { followerTo: Follow[], followedBy: Follow[], blockedThis: Block[] }>,
    deleteStandardUser: (standardUserId: string) => Promise<StandardUserWithPrivateInfo>,
    disconnectFromBlock: (standardUserId: string, blockId: string) => Promise<StandardUserPublic>,
    disconnectFromPost: (standardUserId: string, postId: string) => Promise<StandardUserPublic>
}

const standardUserServices: StandardUserServices = {
    checkIfOneExists: async (email) => {
        try {
            return await prisma.standardUser.findUnique({
                where: {
                    email,
                },
                select: standardUserPublicInfo,
            });
        } catch (e) {
            throw e;
        }
    },
    createOne: async (standardUserToCreate) => {
        try {
            return await prisma.standardUser.create({
                data: standardUserToCreate,
                select: standardUserWithPrivateInfo
            });
        } catch (e) {
            throw e;
        }
    },
    findOwn: async (standardUserId) => {
        try {
            return await prisma.standardUser.findUniqueOrThrow({
                where: {
                    id: standardUserId
                },
                select: standardUserWithPrivateInfo
            });
        } catch (e) {
            throw e;
        }
    },
    getThem: async (standardUserId, notAllwedUsers, paginationPreferences) => {
        try {
            return await prisma.standardUser.findMany({
                where: {
                    id: {
                        notIn: [...notAllwedUsers, standardUserId]
                    }
                },
                select: standardUserPublicInfo,
                ...paginationPreferences
            });
        } catch (e) {
            throw e;
        }
    },
    changeAvatar: async (standardUserId, avatarURL) => {
        try {
            return await prisma.standardUser.update({
                where: {
                    id: standardUserId
                },
                data: {
                    avatar: avatarURL
                },
                select: standardUserWithPrivateInfo
            });
        } catch (e) {
            throw e;
        }
    },
    getSpecificOne: async (currentStandardUserId, standardUserIdToGet) => {
        try {
            return await prisma.standardUser.findUniqueOrThrow({
                where: {
                    id: standardUserIdToGet
                },
                select: {
                    ...standardUserPublicInfo,
                    followerTo: {
                        where:
                        {
                            followerToId: currentStandardUserId
                        },
                        select: followPublicInfo
                    },
                    followedBy: {
                        where: {
                            followedById: currentStandardUserId
                        },
                        select: followPublicInfo
                    },
                    blockedThis: {
                        where: {
                            blockedThisId: currentStandardUserId
                        },
                        select: blockPublicInfo
                    },
                },
            });
        } catch (e) {
            throw e;
        }
    },
    deleteStandardUser: async (standardUserId) => {
        try {
            return await prisma.standardUser.delete({
                where: {
                    id: standardUserId
                },
                select: standardUserWithPrivateInfo
            })
        } catch (e) {
            throw (e);
        }
    },
    disconnectFromBlock: async (standardUserId, blockId) => {
        try {
            return await prisma.standardUser.update({
                where: {
                    id: standardUserId
                },
                data: {
                    blockedThis: {
                        disconnect: {
                            id: blockId
                        }
                    },
                    blockedBy: {
                        disconnect: {
                            id: blockId
                        }
                    }
                },
                select: standardUserPublicInfo
            })
        } catch (e) {
            throw (e);
        }
    },
    disconnectFromPost: async (standardUserId, postId) => {
        return await prisma.standardUser.update({
            where: {
                id: standardUserId
            },
            data: {
                Post: {
                    disconnect: {
                        id: postId
                    }
                }
            },
            select: standardUserPublicInfo
        })
    }
    //follow, like, comment
}

export default standardUserServices;


/**
 * 
 *     disconnectBlockedAccountFromBlock: async (standardUserId, blockId) => {
        try {
            return prisma.standardUser.update({
                where: {
                    id: standardUserId
                },
                data: {
                    blockedBy: {
                        disconnect: {
                            id: blockId
                        }
                    }
                }
            })
        } catch (e) {
            throw (e);
        }
    },
 */