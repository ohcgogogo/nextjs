import type {AppContext, AppProps} from "next/app";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "src/assets/styles/globalStyle";
import { theme } from "src/assets/styles/theme";
import ErrorBoundary from '@/components/configs/ErrorBoundary';
import {appWithTranslation} from "next-i18next";
import React, {createContext, useEffect, useState} from 'react';
import {wrapper} from "@/redux/store";
import {Provider} from 'react-redux';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { PersistGate } from 'redux-persist/integration/react'


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

interface IGlobalContext {
    accessToken: string | undefined;
}
export const GlobalContext = createContext<IGlobalContext>({accessToken : undefined});

//  The Component prop is the active page, so whenever you navigate between routes, Component will change to the new page.
//  Therefore, any props you send to Component will be received by the page.
//  pageProps is an object with the initial props that were preloaded for your page by one of our data fetching methods, otherwise it's an empty object.
function MyApp({ Component, pageProps }: AppPropsWithLayout ) {
    const getLayout = Component.getLayout ?? ((page) => page)
    const { store, props } = wrapper.useWrappedStore(pageProps);
console.log("pageProps.accessToken", props.accessToken)
console.log(props)
    const accessToken = props.accessToken;
    const globalContext = {
        accessToken,
    };
    return (
        <GlobalContext.Provider value={globalContext}>
            <Provider store={store}>
                <PersistGate persistor={store.__persistor} loading={null}>
                    <ThemeProvider theme={theme}>
                        <GlobalStyle />
                        {getLayout(
                            <ErrorBoundary>
                                <Component {...props} />
                            </ErrorBoundary>
                        )}
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </GlobalContext.Provider>
    );
}

// getInitialProps 대신 GetServerSideProps을 사용하라고 권장함.
// _app은 getStaticProps와 getServerSideProps를 지원하지 않습니다.
// MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
//     let pageProps = {}
//     if (Component.getInitialProps) {
//         pageProps = await Component.getInitialProps(ctx)
//     }
//     const {req, res} = ctx;
//     const accessToken = getCookie('accessToken', { req, res });
//     pageProps = {accessToken, ...pageProps}
//     return { pageProps }
// }

export default appWithTranslation(MyApp);