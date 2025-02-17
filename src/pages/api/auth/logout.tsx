import axios from "@/utils/axios";
import { NextApiRequest, NextApiResponse } from 'next'
import {clearAuthCookie} from "@/utils/authUtils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { headers } = req
    try {
        const { data } = await axios.delete(
            '/member/logout',
            {
                headers,
            }
        )
        clearAuthCookie({req, res})
        res.send(data)
    } catch (error : any) {
        const status = error.response.status;
        const data = error.response.data;
        // Send status (probably 401) so the axios interceptor can run.
        res.status(status as number).json(data)
    }
}