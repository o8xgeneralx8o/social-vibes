import prisma from "../db"
import PaginationPreferences from "@/types/paginationPreferences-type"
import { Like, likePublicInfo } from "@/types/like-type"
import { StandardUserPublic, standardUserPublicInfo } from "@/types/standardUser-type"

type LikeWithAllInfo = Like & { standardUser: StandardUserPublic }

type LikeServices = {
    likeSomething: (likeData: Like) => Promise<LikeWithAllInfo>,
    get: (modelInfo: { modelId: string, modelType: 'post' | 'comment' }, notAllwedUsers: string[], paginationPreferences: PaginationPreferences) => Promise<LikeWithAllInfo[]>,
    removeIt: (likeId: string) => Promise<Like>
}

const likeServices: LikeServices = {
    likeSomething: async (likeData) => {
        try {
            const modelId: string | null = likeData.postId ?? likeData.commentId;
            if (modelId === null)
                throw ('postId and commentId cannot be null in the same time')

            return await prisma.like.create({
                data: {
                    id: likeData.id,
                    standardUser: {
                        connect: {
                            id: likeData.standardUserId
                        }
                    },
                },
                select: {
                    ...likePublicInfo,
                    standardUser: {
                        select: standardUserPublicInfo
                    }
                }
            })

        } catch (e) {
            throw (e);
        }
    },
    get: async ({ modelId, modelType }, notAllwedUsers, paginationPreferences) => {
        try {
            return await prisma.like.findMany({
                where: {
                    standardUser: {
                        id: {
                            notIn: notAllwedUsers,
                        }
                    },
                    [modelType]: modelId
                },
                select: {
                    ...likePublicInfo,
                    standardUser: {
                        select: standardUserPublicInfo
                    },
                },
                ...paginationPreferences
            });
        } catch (e) {
            throw (e);
        }
    },
    removeIt: async (likeId) => {
        try {
            return await prisma.like.delete({
                where: {
                    id: likeId
                },
                select: likePublicInfo,
            })
        } catch (e) {
            throw (e);
        }
    }
}

export default likeServices;