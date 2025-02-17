import axios from "@/utils/axios";
import { NextApiRequest, NextApiResponse } from 'next'
import {AuthCookieRequest, AuthCookieResponse, clearAuthCookie, setAuthCookie} from "@/utils/authUtils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { headers } = req
    try {
        const { data } = await axios.post(
            '/member/me', undefined, {
            headers,
        })
        memberMeResultProcessing(req, res, data)
        res.send(data)
    } catch (error : any) {
        const status = error.response.status;
        const data = error.response.data;
        // Send status (probably 401) so the axios interceptor can run.
        res.status(status as number).json(data)
    }
}

export const memberMeResultProcessing = (req: AuthCookieRequest, res: AuthCookieResponse, apiResponse : any) => {
    if(apiResponse.result_code === 'Success') {
        success(req, res, apiResponse)
    } else {
        failure(req, res, apiResponse)
    }
}

const success = (req: AuthCookieRequest, res: AuthCookieResponse, apiResponse : any) => {
    // none
}

const failure = (req: AuthCookieRequest, res: AuthCookieResponse, apiResponse : any) => {
    clearAuthCookie({req, res})
}



