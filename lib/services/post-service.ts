import prisma from "../db"
import PaginationPreferences from "@/types/paginationPreferences-type"
import { Post, postPublicInfo } from '@/types/post-type'
import { MediaContent, mediaContentPublicInfo } from "@/types/mediaContent-type"
import { StandardUserPublic, standardUserPublicInfo } from "@/types/standardUser-type"

type PostWithAllInfo = Post & { MediaContent: MediaContent[], _count: { Like: number }, author: StandardUserPublic }

type PostServices = {
    createOne: (postData: Post, mediaContentArray: MediaContent[]) => Promise<PostWithAllInfo>,
    getForHomeScreen: (followedStandardUsers: string[], paginationPreferences: PaginationPreferences) => Promise<PostWithAllInfo[]>,
    getFromSpecificStandardUser: (standardUserIdToGetPostsFrom: string, notAllwedUsers: string[], paginationPreferences: PaginationPreferences) => Promise<PostWithAllInfo[]>,
    deleteOne: (postId: string) => Promise<Post>
}

const postServices: PostServices = {
    createOne: async (postData, mediaContentArray) => {
        try {
            return await prisma.post.create({
                data: {
                    author: {
                        connect: { id: postData.authorId }
                    },
                    body: postData.body,
                    MediaContent: {
                        createMany: { data: mediaContentArray }
                    },
                    id: postData.id
                },
                select: {
                    ...postPublicInfo,
                    MediaContent: {
                        select: mediaContentPublicInfo
                    },
                    _count: {
                        select: {
                            Like: true
                        }
                    },
                    author: { select: standardUserPublicInfo }
                }
            });
        } catch (e) {
            throw e;
        }
    },
    getForHomeScreen: async (followedStandardUsers, paginationPreferences) => {
        try {
            return await prisma.post.findMany({
                where: {
                    authorId: {
                        in: followedStandardUsers
                    }
                },
                select: {
                    ...postPublicInfo,
                    MediaContent: {
                        select: mediaContentPublicInfo
                    },
                    _count: {
                        select: {
                            Like: true
                        }
                    },
                    author: {
                        select: standardUserPublicInfo
                    }
                },
                ...paginationPreferences
            });
        } catch (e) {
            throw e;
        }
    },
    getFromSpecificStandardUser: async (standardUserIdToGetPostsFrom, notAllwedUsers, paginationPreferences) => {
        try {
            return await prisma.post.findMany({
                where: {
                    authorId: standardUserIdToGetPostsFrom
                },
                select: {
                    MediaContent: {
                        select: mediaContentPublicInfo
                    },
                    ...postPublicInfo,
                    _count: {
                        select: {
                            Like: {
                                where: {
                                    standardUserId: {
                                        notIn: notAllwedUsers
                                    }
                                }
                            }
                        }
                    },
                    author: {
                        select: standardUserPublicInfo
                    }
                },
                ...paginationPreferences
            });
        } catch (e) {
            throw e;
        }
    },
    deleteOne: async (postId) => {
        try {
            return await prisma.post.delete({
                where: {
                    id: postId
                },
                select: postPublicInfo
            })
        } catch (e) {
            throw (e);
        }
    }
}

export default postServices;