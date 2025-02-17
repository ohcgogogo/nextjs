import axios from "@/utils/axios";
import { NextApiRequest, NextApiResponse } from "next"
import {setAuthCookie} from "@/utils/authUtils";
import {getCookie} from "cookies-next";

// anonymous function 으로 import 할때 이름을 정해서 사용하면됨.
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { headers, body } = req
    try {
        const response = await axios.post(
            '/auth/login', // Node.js backend path
            body, // Login body (email + password)
            { headers } // Headers from the Next.js Client
        )
        const data = response.data

        var cookies = require('set-cookie-parser').parse(response, {
            decodeValues: true,  // default: true
            map: true
        });

        const accessToken : string = data.data.token.accessToken;
        const refreshToken: string = cookies['refreshToken'].value;
        const accessTokenExpiresIn: bigint = data.data.token.accessTokenExpiresIn;
        setAuthCookie(accessToken, refreshToken, accessTokenExpiresIn, {req, res})
        res.send(data) // Send data from Node.js server response
    } catch (error : any) {
        const status = error.response.status;
        const data = error.response.data;
        // Send status (probably 401) so the axios interceptor can run.
        res.status(status as number).json(data)
    }
}


