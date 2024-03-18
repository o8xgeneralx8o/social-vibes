import prisma from "../db"
import PaginationPreferences from "@/types/paginationPreferences-type"
import { Notification, notificationPublicInfo } from "@/types/notification-type"
import { Like, likePublicInfo } from "@/types/like-type"
import { Comment, commentPublicInfo } from "@/types/comment-type"
import { Follow, followPublicInfo } from "@/types/follow-type"

type AllNotificationInfo = Notification & { like: Like | null, comment: Comment | null, follow: Follow | null }

type NotificationServices = {
    get: (standardUserId: string, paginationPreferences: PaginationPreferences) => Promise<AllNotificationInfo[]>,
    createOne: (notificationData: Notification) => Promise<AllNotificationInfo>
}

const notificationServices: NotificationServices = {
    get: async (standardUserId, paginationPreferences) => {
        try {
            return await prisma.notification.findMany({
                where: {
                    userIdToNotifie: standardUserId
                },
                select: {
                    ...notificationPublicInfo,
                    like: {
                        select: likePublicInfo,
                    },
                    comment: {
                        select: commentPublicInfo,
                    },
                    follow: {
                        select: followPublicInfo,
                    }
                },
                ...paginationPreferences
            })
        } catch (e) {
            throw (e);
        }
    },
    createOne: async (notificationData) => {
        try {

            const modelId: string | null = notificationData.commentId ?? notificationData.followId ?? notificationData.likeId;

            if (modelId === null)
                throw 'modelId Cannot be null'

            return await prisma.notification.create({
                data: {
                    id: notificationData.id,
                    userToNotifie: {
                        connect: {
                            id: notificationData.userIdToNotifie
                        }
                    },
                    seen: notificationData.seen,
                    createdAt: notificationData.createdAt,
                },
                select: {
                    ...notificationPublicInfo,
                    like: {
                        select: likePublicInfo,
                    },
                    comment: {
                        select: commentPublicInfo,
                    },
                    follow: {
                        select: followPublicInfo,
                    }
                }
            })
        } catch (e) {
            throw (e);
        }
    }
}

export default notificationServices;





