import prisma from "../db"
import PaginationPreferences from "@/types/paginationPreferences-type"
import { Like, likePublicInfo } from "@/types/like-type"
import { StandardUserPublic, standardUserPublicInfo } from "@/types/standardUser-type"
import { generateFromOptions, ModelName } from '@/lib/generateFromOptions';

type LikeWithAllInfo = Like & { standardUser: StandardUserPublic }

type LikeServices = {
    likeSomething: (likeData: Like, modelName: ModelName) => Promise<LikeWithAllInfo>,
    getForModel: (modelInfo: { modelId: string, modelName: ModelName }, notAllwedUsers: string[], paginationPreferences: PaginationPreferences) => Promise<LikeWithAllInfo[]>,
    removeIt: (likeId: string) => Promise<Like>
}

const likeServices: LikeServices = {
    likeSomething: async (likeData, modelName) => {
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
                    ...generateFromOptions(modelId, modelName, true)
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
    getForModel: async ({ modelId, modelName }, notAllwedUsers, paginationPreferences) => {
        try {
            return await prisma.like.findMany({
                where: {
                    standardUser: {
                        id: {
                            notIn: notAllwedUsers,
                        }
                    },
                    ...generateFromOptions(modelId, modelName, false)
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