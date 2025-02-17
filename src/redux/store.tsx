import {configureStore, Reducer} from "@reduxjs/toolkit";
import {Context, createWrapper, MakeStore} from "next-redux-wrapper";
import logger from "redux-logger";
import reducer, {OurStore} from "@/redux/rootReducer";
import { persistedReducer } from "@/redux/persistConfig";
import { persistStore } from 'redux-persist';

export const makeConfiguredStore = (reducer : Reducer) => configureStore({
    // configureStore: store 를 생성
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false}).concat(logger),
    // redux-toolkit 은 devTools 등의 미들웨어들을 기본적으로 제공 (사용하고 싶은 미들웨어가 있다면 추가로 정의 ex.logger)
    devTools: process.env.NODE_ENV !== 'production',
});

const makeStore : MakeStore<any> = (context) => {
    const isServer = typeof window === 'undefined';
    if (isServer) {
console.log("isServer makeStore");
        return makeConfiguredStore(reducer);
    } else {
        // we need it only on client side
        const store : any = makeConfiguredStore(persistedReducer);
console.log("isClient makeStore", store);
        store.__persistor = persistStore(store);
        return store;
    }
}

export const wrapper = createWrapper(makeStore, {
    // createWrapper: wrapper 생성, wrapper 에 store 바인딩
    debug: process.env.NODE_ENV !== 'production'
})

export type MyThunkDispatch = ReturnType<typeof makeConfiguredStore>["dispatch"]

