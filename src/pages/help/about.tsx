import {GetServerSideProps, GetStaticProps, InferGetServerSidePropsType} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import LayerPopup from 'src/components/shared/popup/LayerPopup';
import Notice from 'src/components/shared/etc/Notice';
import React, {ReactElement, useState} from "react";
import {useRouter} from "next/router";
import MainLayout from '@/components/layout/MainLayout';
import {NextPageWithLayout} from "@/pages/_app";
import {user} from "@/utils/authorize";

function About () {
    const router = useRouter();
    const { showDetail } = router.query;

    const [popup, setPopup] = useState(false);
    const onClick = () => {
        setPopup(true);
    }
    const onConfirm = () => {
        setPopup(false);
    }
    const onCancel = () => {
        setPopup(false);
    }
    return (
        <div>
            <h1>소개</h1>
            <p>
                이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트 입니다.
            </p>
            {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
            <Notice onClick={onClick}/>
            <LayerPopup visible={popup} onCancel={onCancel} onConfirm={onConfirm}/>
        </div>
    );
}

// const about: NextPageWithLayout = () => {
//     return <About/>;
// }

const about: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    return <About/>;
}

about.getLayout = function getLayout(page : ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default about;

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