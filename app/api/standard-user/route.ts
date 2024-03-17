import { StandardUserPublic } from "@/types/standardUser-type"
import standardUserServices from "@/lib/services/standardUser-service";
import blockServices from "@/lib/services/blocking-service";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Session } from '@/types/modules/next-auth'
import paginationPrefrences from "@/lib/paginationPrefrences";
import errorMessage from "@/lib/errorMessage";
import { NextApiRequest } from "next";


const GET = async (req: NextApiRequest) => {
    try {

        const session: Session | null = await getServerSession(options)


        if (!session || !session?.user?.id)
            return Response.json(errorMessage("UnAuthorized Access"), {
                status: 400
            })

        const standardUserId: string = session?.user?.id;

        const cursorId: string = "";// req.query.cursorId;

        const notAllowedStandardUser = await blockServices.getNotAllowedForSomeOne(standardUserId);

        const standardUsers: StandardUserPublic[] = await standardUserServices.getThem(standardUserId, notAllowedStandardUser, paginationPrefrences(cursorId));


        return Response.json({ data: standardUsers }, {
            status: 200
        })
    } catch (error) {
        return Response.json(
            errorMessage(
                "Error While Trying getting standard users",
                error
            ), {
            status: 500
        })
    }
}

export {
    GET
}