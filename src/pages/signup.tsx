import {FormikProps, useFormik} from 'formik'
import React, {ReactElement} from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/dist/client/router'
import { useDispatch } from 'react-redux'
import InputWithError from '@/components/shared/form/InputWithError';
import FormWithLabel from '@/components/shared/form/FormWithLabel';
import { MyThunkDispatch } from '@/redux/store';
import {login, register} from '@/redux/slices/auth';
import styled from "styled-components";
import {NextPageWithLayout} from "@/pages/_app";
import {GetStaticProps, InferGetServerSidePropsType} from "next";
import {getServerSideProps} from "@/pages/index";
import SingleLayout from "@/components/layout/SingleLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

interface Values {
    email: string
    password: string
}

const signupSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
})

const initialValues: Values = {
    email: '',
    password: ''
}

const PageWrapper = styled.div`
  height: 100vh;
`

function Signup() {
    const router = useRouter()
    const dispatch: MyThunkDispatch = useDispatch()
    const formik : FormikProps<any> = useFormik<any>({
        validationSchema: signupSchema,
        initialValues,
        onSubmit: async (values) => {
            try {
                await dispatch(register(values))
            } catch(error : any) {
                alert(error);
            }
            await router.push('/')
        },
    })
    return (
        <PageWrapper>
            <FormWithLabel
                onSubmit={formik.handleSubmit}
                topText="Sign Up"
                buttonText="Submit"
                redirectText="Signin instead"
                onRedirect={() => router.push('/signin')}
                buttonName="signupButton"
                onClick={() => void(0)}>
                <InputWithError name="email" formik={formik} label="E-mail" />
                <InputWithError name="password" formik={formik} label="Password" type="password" />
            </FormWithLabel>
        </PageWrapper>
    )
}

const signup: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    return <Signup/>;
}

signup.getLayout = function getLayout(page : ReactElement) {
    return (
        <SingleLayout>
            {page}
        </SingleLayout>
    )
}

export default signup;

export const getStaticProps: GetStaticProps = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale as string, [
            'common'
        ])),
    },
})

