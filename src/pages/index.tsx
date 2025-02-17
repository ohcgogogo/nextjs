import React, {FormEvent, ReactElement, useState} from 'react';
import LoginButton from "src/components/shared/buttons/Login";
import TopNavigationBar from "src/components/shared/navigate/TopNavigationBar";
import {GetServerSideProps, GetStaticProps, InferGetServerSidePropsType} from "next";
import { useDispatch, useSelector } from "react-redux" // 액션을 발생 시키는 dispatch
import { OurStore } from "src/redux/rootReducer"; // 리듀서
import Image from 'next/image'
import { addUser, User } from "src/redux/slices/users";
import MainLayout from '@/components/layout/MainLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import {user} from "@/utils/authorize";
import {MyThunkDispatch} from "@/redux/store";
import {getCookie} from "cookies-next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {getAuthCookie} from "@/utils/authUtils";

interface Props {
    callbackprop : string
}

function Home({callbackprop}: Props) {
// function Home() {
    // https://redux-toolkit.js.org/tutorials/quick-start 를 useSelector와 useDispatch역할을 확인해야함
    const users = useSelector<OurStore, User[]>(state=> state.usersReducer); // store에서 action types에 해당하는 상태를 가져온다.
    const dispatch = useDispatch(); // store.dispatch를 가져온다.
    const [ name, setName ] = useState('');

    const handleChangeName = (e: any) => {
        setName(e.target.value);
    }

    const handleAddUser = (e:FormEvent) => {
        e.preventDefault();
        dispatch(addUser({ name } as User)); // 액션을 발생시킨다.
        setName('');
    }

console.log("index getCookies accessToken : " + getCookie('accessToken'));
console.log("index getCookies refreshToken : " + getCookie('refreshToken'));
    return (
        <div>
            <h1>홈</h1>
            <TopNavigationBar/>
            <p>홈, 가장 먼저 보여지는 페이지 {callbackprop}</p>
            <LoginButton/>

            <form onSubmit={handleAddUser}>
                <input type='text' value={name} onChange={handleChangeName} />
                <button type='submit'>Add User</button>
            </form>

            {users.map(user=> (
                <div key={user.id}>{user.name}</div>
            ))}
        </div>
    );
}

const home: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    return <Home callbackprop={props.callbackprop}/>;
}

// const home: NextPageWithLayout = () => {
//     return <Home/>;
// }

home.getLayout = function getLayout(page : ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = user({
    callback: async (_, store, res, context) => {
        // const {req} = context
        // let [accessToken, refreshToken, accessTokenExpiresIn] = getAuthCookie({ req, res })
        return {
            props : {
                callbackprop : "index 페이지"
            }
        }
    },
})

// export const getStaticProps: GetStaticProps = async ({locale}) => ({
//     props: {
// //         ...(await serverSideTranslations(locale as string, [
// //             'common'
// //         ])),
// //     },
// // })

export default home;

/*
async : function 앞에 async를 붙이면 해당 함수는 항상 프라미스를 반환합니다. 프라미스가 아닌 값을 반환하더라도 이행 상태의 프라미스(resolved promise)로 값을 감싸 이행된 프라미스가 반환되도록 합니다.
await : 자바스크립트는 await 키워드를 만나면 프라미스가 처리될 때까지 기다립니다
promise : 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타냅니다.
*/

// export const getServerSideProps: GetServerSideProps = async ({locale}) => {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale as string, [
//                 'common'
//             ])),
//         },
//     }
// };



