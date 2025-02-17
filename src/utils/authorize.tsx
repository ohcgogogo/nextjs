// This type contains context of the wrapper.getServerSideProps + State of our store.
import {OurStore} from "@/redux/rootReducer";
import { AnyAction, Store } from '@reduxjs/toolkit'
import {GetServerSidePropsContext} from "next";
import {ServerResponse} from 'http'

import axios, {setAxiosHeaderAccessToken} from "@/utils/axios";
import {MyThunkDispatch, wrapper} from "@/redux/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {clearAuthCookie, getAuthCookie} from "@/utils/authUtils";
import {memberMeResultProcessing} from "@/pages/api/auth/me";
import {refreshTokenResultProcessing} from "@/pages/api/auth/refreshToken";

// Omit : 특정 속성만 제거한 타입을 정의합니다. (첫번째 인자에서 두번짜 인자의 속성을 제거)
// export type ContextWithStore = Omit<
//     GetServerSidePropsContext & {
//     store: Store<OurStore, AnyAction>,
// },
//     'resolvedUrl'
// >

// This type tells us how our callback function will look like.
// We will provide accessToken, store and server response to the callback
// But you can provide whatever you want.
// type myCallbackType = (arg1: string, arg2: boolean) => number
export type Callback = (
    accessToken: string,
    store: Store<OurStore, AnyAction>,
    res: ServerResponse,
    context : GetServerSidePropsContext
) => Record<string, unknown> | Promise<Record<string, unknown>>

// General props type for our authorize function.
interface AuthorizeProps {
    store: Store<OurStore, AnyAction>
    context: GetServerSidePropsContext
    callback: Callback
}

export const authorize = async ({store, context, callback}: AuthorizeProps) => {
    // 여기서 store를 세팅해봐야 presist에 의해서 덮어 씌어 지기 때문에 초기값 세팅 용도 외에는 크게 의미가 없음.
    const {req, res} = context
    let [accessToken, refreshToken, accessTokenExpiresIn] = getAuthCookie({ req, res })
    let date = new Date(Number(accessTokenExpiresIn));

    if (req) {
        if (accessToken)
            setAxiosHeaderAccessToken(accessToken) // 서버에서 넣어주는건 서버단에서만 동작하기 때문에 client에서도 따로 세팅해주어야함.

        if (accessToken) {
            try {
                const response = await axios.post('/api/auth/me')
                memberMeResultProcessing(req, res, response.data)
            } catch (error : any) {
                console.log("authorize api/me error : ", error.response.data.data.map((o: { message: any }) => o.message).join(', '))
                clearAuthCookie({req, res})
            }
        }
        if (accessToken !== "") {
            date = new Date();
console.log("authorize now : " + date.toString());
console.log("authorize now : " + new Date(Number((BigInt(accessTokenExpiresIn) - BigInt(10 * 1000)))).toString());
console.log("authorize now : " + new Date(Number(date.getTime())).toString());
console.log("before refreshed accessToken : " + accessToken);
console.log("before refreshed refreshToken : " + refreshToken);
console.log("before refreshed accessTokenExpiresIn : " + accessTokenExpiresIn);
        // TODO api router를 요청하지 않고 api router내에 axios객체를 사용하는 함수를 제공해서 해당 함수를 호출해야함. (api router를 호출하는건 비효율 적임)
        if ((BigInt(accessTokenExpiresIn) - BigInt(1000*60*30)) <= date.getTime()) {
                try {
                    const response = await axios.post('/api/auth/refreshToken', {accessToken:accessToken},
                        {
                            headers : {
                                Cookie : `refreshToken=${refreshToken};`
                            }
                        })
                    refreshTokenResultProcessing(req, res, response)
                } catch (error : any) {
                    clearAuthCookie({req, res})
                }
                [accessToken, refreshToken, accessTokenExpiresIn] = getAuthCookie({ req, res })
console.log("refreshed accessToken : " + accessToken);
console.log("refreshed refreshToken : " + refreshToken);
console.log("refreshed accessTokenExpiresIn : " + accessTokenExpiresIn);
            }
        }
    }
    const callbackResponseProps = await callback(accessToken, store, res, context)
    const thisResponseProps = {
        props : {
            accessToken : accessToken
        }
    }
    return { props : Object.assign({}, thisResponseProps.props, callbackResponseProps.props)}
}

interface UserProps {
    callback: Callback
}


export const user = ({ callback }: UserProps) =>
// wrapper.getServerSideProps 의 경우 GetServerSidePropsContext만 넘길수 있는데, store를 넘겨야 해서 ts-ignore를 설정할수 밖에 없었음.
// @ts-ignore
wrapper.getServerSideProps(store => async (context: GetServerSidePropsContext) => {
        const { dispatch }: { dispatch: MyThunkDispatch } = store

        // 인증 관련 프로퍼티
        let authorizeResponseProps = await authorize({
            store,
            context,
            callback: async (...props) => {
                return callback(...props)
            },
        })
        // 일반적으로 페이지 마다 넘겨줘야하는 공통 프로퍼티 정의
        const commonResponseProps = {
            props: {
                ...(await serverSideTranslations(context.locale! as string, [
                    'common'
                ])),
            },
        }
        // 응답값을 합쳐서 응답 (아마도 await가 처리를 안한경우에 결과 합치는 소스로 보임)
        // return (async () => {
        //     const props = await Promise.all([commonResponseProps, authorizeResponseProps]);
        //     return props.reduce((result, obj) => ({...result, ...obj}), {});
        // })();
        return { props : Object.assign({}, authorizeResponseProps.props, commonResponseProps.props)}
    })





