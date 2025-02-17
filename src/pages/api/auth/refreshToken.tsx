import axios, {setAxiosHeaderAccessToken} from "@/utils/axios";
import {NextApiRequest, NextApiResponse} from 'next'
import {clearAuthCookie, setAuthCookie, AuthCookieRequest, AuthCookieResponse} from "@/utils/authUtils";
import {getCookie} from "cookies-next";
// api router 에서는 request body를 세팅하거나 변경할수 없음...
// Client에서 호출되는지 서버에서 호출되는지에 따라서 여기서 Cookie를 세팅할수 있고 없고가 달라지는것으로 보임.


// TODO getServerSideProps (SSR) 에서 apiRouter를 호출하지 않도록 token refresh를 요청하는 부분을 함수로 제공해야함.
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {headers, body} = req
    try {
        const response = await axios.post(
            '/auth/reissue', // refresh token Node.js server path
            body,
            {
                headers
            },
        )

        refreshTokenResultProcessing(req, res, response)
        res.send(response.data)
    } catch (error : any) {
        const status = error.response.status;
        const data = error.response.data;
        // Send status (probably 401) so the axios interceptor can run.
        res.status(status as number).json(data)
    }
}
export const refreshTokenResultProcessing = (req: AuthCookieRequest, res: AuthCookieResponse, apiResponse : any) => {
    if(apiResponse.data.result_code === 'Success') {
        success(req, res, apiResponse)
    } else {
        failure(req, res, apiResponse)
    }
}

const success = (req: AuthCookieRequest, res: AuthCookieResponse, apiResponse : any) => {
    var cookies = require('set-cookie-parser').parse(apiResponse, {
        decodeValues: true,  // default: true
        map: true
    });
    const accessToken = apiResponse.data.data.token.accessToken
    const refreshToken = cookies['refreshToken'].value
    const accessTokenExpiresIn: bigint = apiResponse.data.data.token.accessTokenExpiresIn
    setAuthCookie(accessToken, refreshToken, accessTokenExpiresIn, {req, res})
    setAxiosHeaderAccessToken(accessToken)
}

const failure = (req: AuthCookieRequest, res: AuthCookieResponse, apiResponse : any) => {
    clearAuthCookie({req, res})
    setAxiosHeaderAccessToken("")
}



// export const config = {
//     api: {
//         bodyParser: false,
//     },
// }
