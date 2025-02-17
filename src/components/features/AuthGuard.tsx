// You might want to implement some sort of role system. I will not cover that.
import React, {useContext} from 'react';
import {OurStore} from "@/redux/rootReducer";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "cookies-next";
import {GlobalContext} from "@/pages/_app";
import {reset} from "@/redux/slices/auth";
import axios, {setAxiosHeaderAccessToken} from "@/utils/axios";
import {getAuthCookie, onSilentRefresh} from "@/utils/authUtils";

interface Props {
    readonly children?: JSX.Element|JSX.Element[];
    readonly role?: 'admin';
    readonly customText?: React.ReactNode;
}

export const AuthGuard: React.FC<Props> = ({children, role, customText} : Props) => {
console.log("AuthGuard getCookies accessToken : " + getCookie('accessToken'));
console.log("AuthGuard getCookies refreshToken : " + getCookie('refreshToken'));
    const { accessToken } = useContext(GlobalContext);
    console.log(accessToken);
    const dispatch = useDispatch();
    if(accessToken === "") {
        dispatch(reset())
    }
    setAxiosHeaderAccessToken(accessToken)
console.log("MyApp axios.defaults.headers.Authorization", axios.defaults.headers.common["Authorization"]);

    // Get `me` object from client side redux store.
    const { loading, me } = useSelector((state: OurStore) => state.authReducer)

console.log("AuthGuard....");
console.log(loading);
console.log(me);


    // Loading indicator
    if (loading === 'loading') {
        return <>loading...</>
    }

    // Without role allow all authorized users
    if (me || role === 'admin') {
        // TODO 여기서 token refresh하도록 로직을 넣는다.
        const [accessToken, refreshToken, accessTokenExpiresIn] = getAuthCookie({})
console.log("AuthGuard accessTokenExpiresIn : " + new Date(Number(accessTokenExpiresIn)).toString());
        setTimeout(onSilentRefresh, Number((BigInt(accessTokenExpiresIn) - BigInt(1000*60*29) - BigInt(+1000*58))) - new Date().getTime())

        // setTimeout()
        return <>{children}</>
    }

    // This happens if user is unauthorized :)
    return (
        <section>
            <h2 className="text-center">Unauthorized</h2>
            <div className="text-center">
                {customText || "You don't have permission to access this page. Pleae contact an admin if you think something is wrong."}
            </div>
        </section>
    )
}