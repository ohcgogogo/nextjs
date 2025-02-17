import {FormikProps, FormikValues, useFormik} from 'formik';
import React, {FormEvent, ReactElement, useState} from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import InputWithError from '@/components/shared/form/InputWithError';
import FormWithLabel from '@/components/shared/form/FormWithLabel';
import { MyThunkDispatch } from '@/redux/store';
import {login, register} from '@/redux/slices/auth';
import SubmitButton from '@/components/shared/buttons/SubmitButton';
import {NextPageWithLayout} from "@/pages/_app";
import {GetStaticProps, InferGetServerSidePropsType} from "next";
import SingleLayout from "@/components/layout/SingleLayout";
import {getServerSideProps} from "@/pages/index";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

interface Values {
    email: string
    password: string
}

const signinSchema = yup.object({
    email: yup.string().email('Provide correct e-mail').required('Required'),
    password: yup.string().required('Required'),
})

const initialValues: Values = {
    email: '',
    password: '',
}

const PageWrapper = styled.div`
  height: 100vh;
`

function Signin() {
    const router = useRouter()
    const dispatch: MyThunkDispatch = useDispatch()
    const formik : FormikProps<any> = useFormik<any>({
        validationSchema: signinSchema,
        initialValues,
        onSubmit: async (values) => {
            try {
                await dispatch(login(values))
            } catch(error : any) {
                alert(error);
            }
            await router.push('/')
        },
    })
    return (
        <PageWrapper>
            <SubmitButton
                name="homeButton"
                onClick={() => {
                    router.push('/')
                }}>
                Go to phrogs 🐸
            </SubmitButton>
            <FormWithLabel
                onSubmit={formik.handleSubmit}
                topText="Sign In"
                buttonText="Submit"
                redirectText="Signup instead"
                onRedirect={() => router.push('/signup')}
                buttonName="signinButton"
                onClick={() => void(0)}>
                <InputWithError name="email" formik={formik} label="E-mail" />
                <InputWithError name="password" formik={formik} label="Password" type="password" />
            </FormWithLabel>
        </PageWrapper>
    )
}

const signin: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    return <Signin/>;
}

signin.getLayout = function getLayout(page : ReactElement) {
    return (
        <SingleLayout>
            {page}
        </SingleLayout>
    )
}

export default signin;

export const getStaticProps: GetStaticProps = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale as string, [
            'common'
        ])),
    },
})





