import PaginationPreferences from "@/types/paginationPreferences-type"
import prisma from "../db"
import { Block, blockPublicInfo } from '@/types/block-type'
import { StandardUserPublic, standardUserPublicInfo } from "@/types/standardUser-type"

type BlockServices = {
    blockSomeOne: (blockingData: Block) => Promise<Block>,
    deleteBlockRecord: (blockRecordId: string) => Promise<Block>,
    viewWhoBlockedFromSomeOne: (standardUserId: string, paginationPreferences: PaginationPreferences) => Promise<(Block & { blockedThis: StandardUserPublic })[]>,
    getNotAllowedForSomeOne: (standardUserId: string) => Promise<Block[]>,
    findOne: (standardUserId: string, standardUserIdToEnquiry: string) => Promise<Block[]>,
}

const blockServices: BlockServices = {
    blockSomeOne: async (blockingData) => {
        try {
            return await prisma.block.create({
                data: {
                    blockedBy: {
                        connect: {
                            id: blockingData.blockedById
                        }
                    },
                    blockedThis: {
                        connect: {
                            id: blockingData.blockedThisId
                        }
                    },
                    id: blockingData.id
                },
                select: blockPublicInfo
            })
        } catch (e) {
            throw e;
        }
    },
    deleteBlockRecord: async (blockRecordId) => {
        try {
            return await prisma.block.delete({
                where: { id: blockRecordId },
                select: blockPublicInfo
            })
        } catch (e) {
            throw e;
        }
    },
    viewWhoBlockedFromSomeOne: async (standardUserId, paginationPreferences) => {
        try {
            return await prisma.block.findMany({
                where: {
                    blockedThisId: standardUserId
                },
                select: {
                    ...blockPublicInfo,
                    blockedThis: {
                        select: standardUserPublicInfo
                    }
                },
                ...paginationPreferences
            });
        } catch (e) {
            throw (e);
        }
    },
    getNotAllowedForSomeOne: async (standardUserId) => {
        try {
            return await prisma.block.findMany({
                where: {
                    OR:
                        [
                            {
                                blockedById: standardUserId
                            },
                            {
                                blockedThisId: standardUserId
                            }
                        ]
                },
                select: blockPublicInfo
            });
            // return notAllowedStandardUsers.map(({ blockedById, blockedThisId }) => {
            //     return standardUserId === blockedById ? blockedThisId : blockedById
            // })
        } catch (e) {
            throw (e)
        }

    },
    findOne: async (standardUserId, standardUserIdToEnquiry) => {
        try {
            return await prisma.block.findMany({
                where: {
                    OR: [
                        {
                            AND:
                                [
                                    {
                                        blockedById: standardUserId
                                    },
                                    {
                                        blockedThisId: standardUserIdToEnquiry
                                    }
                                ]
                        },
                        {
                            AND:
                                [
                                    {
                                        blockedById: standardUserIdToEnquiry
                                    },
                                    {
                                        blockedThisId: standardUserId
                                    }
                                ]
                        }
                    ]
                },
                select: blockPublicInfo
            })
            // return blocksBetweenThem.length === 0 ? true : false
        } catch (e) {
            throw (e)
        }
    }
}

export default blockServices;