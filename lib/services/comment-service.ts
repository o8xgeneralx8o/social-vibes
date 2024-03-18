import prisma from "../db"
import PaginationPreferences from "@/types/paginationPreferences-type"
import { Comment, commentPublicInfo } from "@/types/comment-type"
import { StandardUserPublic, standardUserPublicInfo } from "@/types/standardUser-type"

type CommentWithAllInfo = Comment & { _count: { Like: number }, author: StandardUserPublic }

type CommentServices = {
    createOne: (commentData: Comment) => Promise<CommentWithAllInfo>,
    get: (modelInfo: { modelType: 'post' | 'comment', modelId: string }, notAllwedUsers: string[], paginationPreferences: PaginationPreferences) => Promise<CommentWithAllInfo[]>,
    deleteOne: (commentId: string) => Promise<Comment>
}

const commentServices: CommentServices = {
    createOne: async (commentData) => {
        try {

            // const modelId: string | null = commentData.postId ?? commentData.commentId;
            // if (modelId === null)
            //     throw ('postId and commentId cannot be null in the same time')

            return await prisma.comment.create({
                data: {
                    id: commentData.id,
                    body: commentData.body,
                    createdAt: commentData.createdAt,
                    author: {
                        connect: {
                            id: commentData.authorId
                        }
                    },
                },
                select: {
                    ...commentPublicInfo,
                    _count: {
                        select: {
                            Like: true
                        }
                    },
                    author: {
                        select: standardUserPublicInfo
                    }
                }
            })

        } catch (e) {
            throw (e);
        }
    },
    get: async ({ modelType, modelId }, notAllwedUsers, paginationPreferences) => {
        try {
            return await prisma.comment.findMany({
                where: {
                    author: {
                        id: {
                            notIn: notAllwedUsers,
                        }
                    },
                    [modelType]: {
                        id: modelId
                    }
                },
                select: {
                    ...commentPublicInfo,
                    author: {
                        select: standardUserPublicInfo
                    },
                    _count: {
                        select: {
                            Like: true
                        }
                    }
                },
                ...paginationPreferences
            });
        } catch (e) {
            throw (e);
        }
    },
    deleteOne: async (commentId) => {
        try {
            return await prisma.comment.delete({
                where: {
                    id: commentId
                },
                select: commentPublicInfo,
            })
        } catch (e) {
            throw (e);
        }
    }
}

export default commentServices;