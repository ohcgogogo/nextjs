import { useRouter } from 'next/router';
import {GetServerSideProps, GetStaticProps, InferGetServerSidePropsType} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import MainLayout from '@/components/layout/MainLayout';
import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactElement} from "react";
import {user} from "@/utils/authorize";

const data : {[key: string]: {name: string, description: string}} = {
    velopert : {
        name: "김민준",
        description: "리액트를 좋아하는 개발자",
    },
    gildong : {
        name: "홍길동",
        description: "고전 소설 홍길동전의 주인공",
    }
};

function Profile () {
    const router = useRouter();
    const { username } = router.query;
    const profile = data[username as string];

    if (!profile) {
        return <div>존재하지 않는 사용자입니다.</div>;
    } else {
        return (
            <div>
                <h3>{username}</h3>
                <p>{profile.description}</p>
            </div>
        );
    }
}

// const profile: NextPageWithLayout = () => {
//     return <Profile/>;
// }

const profile: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    return <Profile/>;
}

profile.getLayout = function getLayout(page : ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default profile;

// export const getStaticProps: GetStaticProps = async ({locale}) => ({
//     props: {
//         ...(await serverSideTranslations(locale as string, [
//             'common'
//         ])),
//     },
// })

export const getServerSideProps: GetServerSideProps = user({
    callback: async (_, store, res, context) => {
        return {
            props: {
            },
        }
    },
})

