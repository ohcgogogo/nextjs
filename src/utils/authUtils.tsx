import {NextApiRequest, NextApiResponse} from "next";
import {getCookie, setCookie} from "cookies-next";
import {toBoolean} from "@/utils/casting";
import {OptionsType} from "cookies-next/src/types";
import axios from "@/utils/axios";
import {IncomingMessage, ServerResponse} from "http";
import {NextApiRequestCookies} from "next/dist/server/api-utils";

// CookieValueTypes Alias For string | boolean | undefined | null
// 쿠키에 값을 넣을때 CookeyValueTypes을 고려해서 케스팅을 해주자.

export type AuthCookieRequest = NextApiRequest | IncomingMessage & {
    cookies: NextApiRequestCookies
}
export type AuthCookieResponse = NextApiResponse | ServerResponse
type AuthCookieOptions = {
    req: AuthCookieRequest
    res: AuthCookieResponse
} | {}

export const setAuthCookie = (accessToken : string, refreshToken : string, accessTokenExpiresIn: bigint, options : AuthCookieOptions) => {
    const cookieOptions : OptionsType = { sameSite: 'lax', httpOnly: toBoolean(process.env.HTTP_ONLY) }
    Object.assign(cookieOptions, options)
    setCookie('accessToken', accessToken, cookieOptions);
    setCookie('refreshToken', refreshToken, cookieOptions);
    setCookie('accessTokenExpiresIn', accessTokenExpiresIn.toString(), cookieOptions);
}

export const clearAuthCookie = (options : AuthCookieOptions) => {
    const cookieOptions : OptionsType = { sameSite: 'lax', maxAge: -1, httpOnly: toBoolean(process.env.HTTP_ONLY) }
    Object.assign(cookieOptions, options)
    setCookie('accessToken', "", cookieOptions);
    setCookie('refreshToken', "", cookieOptions);
    setCookie('accessTokenExpiresIn', "0", cookieOptions);
}

export const getAuthCookie = (options : AuthCookieOptions) : [string, string, bigint] => {
    const cookieOptions : OptionsType = {}
    Object.assign(cookieOptions, options)
    let accessToken = getCookie('accessToken', cookieOptions);
    let refreshToken = getCookie('refreshToken', cookieOptions);
    let accessTokenExpiresIn = getCookie('accessTokenExpiresIn', cookieOptions);
    if(accessToken === undefined || accessToken === null) accessToken = ""
    if(refreshToken === undefined || refreshToken === null ) refreshToken = ""
    if(accessTokenExpiresIn === undefined || accessTokenExpiresIn === null) accessTokenExpiresIn = ""
    return [accessToken as string, refreshToken as string, BigInt(accessTokenExpiresIn as string)]
}

export const getAuthCookieByKey = (key : string, options : AuthCookieOptions) : string | bigint => {
    const cookieOptions : OptionsType = {}
    Object.assign(cookieOptions, options)
    let value = getCookie(key, cookieOptions);
    if(value === undefined || value === null) value = ""
    if(key == 'accessTokenExpiresIn') {
        return BigInt(value as string)
    } else {
        return value as string
    }
}

export const onSilentRefresh = async(value : bigint) => {
    try {
        console.log("onSilentRefresh...................");
        let accessToken = getCookie('accessToken')
        let refreshToken = getCookie('refreshToken')
        const response = await axios.post('/api/auth/refreshToken', {accessToken:accessToken})


        console.log("onSilentRefresh getCookies accessToken : " + getCookie('accessToken'));
        console.log("onSilentRefresh getCookies refreshToken : " + getCookie('refreshToken'));
    } catch (error : any) {
        console.log("onSilentRefresh api/refreshToken error : ", error)
        console.log("onSilentRefresh api/refreshToken error : ", error.response.data.data)
        console.log("onSilentRefresh api/refreshToken error : ", error.response.data.data.map((o: { message: any }) => o.message).join(', '))
        console.log("onSilentRefresh api/refreshToken error delete cookie.."); // 여기서 지워봐야 제대로 동작하지 않음. // 페이지 리프래쉬 후에나 동작함...???
    }
}
