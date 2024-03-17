import PaginationPreferences from "@/types/paginationPreferences-type"
import prisma from "../db"
import { Follow, followPublicInfo } from '@/types/follow-type'
import { StandardUserPublic, standardUserPublicInfo } from "@/types/standardUser-type"

type FollowServices = {
    followSomeOne: (followingData: Follow) => Promise<Follow>,
    deleteFollowRecord: (followRecordId: string) => Promise<Follow>,
    getFollowedBySomeOne: (standardUserId: string, paginationPreferences: PaginationPreferences) => Promise<(Follow & { followerTo: StandardUserPublic })[]>,
    getFollowerForSomeOne: (standardUserId: string, paginationPreferences: PaginationPreferences) => Promise<(Follow & { followedBy: StandardUserPublic })[]>,
    findOne: (standardUserId: string, standardUserIdToEnquiry: string) => Promise<Follow[]>,
}

const followServices: FollowServices = {
    followSomeOne: async (followingData) => {
        try {
            return await prisma.follow.create({
                data: {
                    followedBy: {
                        connect: {
                            id: followingData.followedById
                        }
                    },
                    followerTo: {
                        connect: {
                            id: followingData.followerToId
                        }
                    },
                    id: followingData.id
                },
                select: followPublicInfo
            })
        } catch (e) {
            throw e;
        }
    },
    deleteFollowRecord: async (followRecordId) => {
        try {
            return await prisma.follow.delete({
                where: { id: followRecordId },
                select: followPublicInfo
            })
        } catch (e) {
            throw e;
        }
    },
    getFollowedBySomeOne: async (standardUserId, paginationPreferences) => {
        try {
            return await prisma.follow.findMany({
                where: {
                    followedById: standardUserId
                },
                select: {
                    ...followPublicInfo,
                    followerTo: {
                        select: standardUserPublicInfo
                    }
                },
                ...paginationPreferences
            });
        } catch (e) {
            throw (e);
        }
    },
    getFollowerForSomeOne: async (standardUserId, paginationPreferences) => {
        try {
            return await prisma.follow.findMany({
                where: {
                    followerTo: {
                        id: standardUserId
                    }
                },
                select: {
                    ...followPublicInfo,
                    followedBy: {
                        select: standardUserPublicInfo
                    }
                },
                ...paginationPreferences
            })
        } catch (e) {
            throw (e)
        }

    },
    findOne: async (standardUserId, standardUserIdToEnquiry) => {
        try {
            return await prisma.follow.findMany({
                where: {
                    OR: [
                        {
                            AND:
                                [
                                    {
                                        followedById: standardUserId
                                    },
                                    {
                                        followerToId: standardUserIdToEnquiry
                                    }
                                ]
                        },
                        {
                            AND:
                                [
                                    {
                                        followedById: standardUserIdToEnquiry
                                    },
                                    {
                                        followerToId: standardUserId
                                    }
                                ]
                        }
                    ]
                },
                select: followPublicInfo
            })
        } catch (e) {
            throw (e)
        }
    }
}

export default followServices;