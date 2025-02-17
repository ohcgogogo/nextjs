import { AnyAction, CombinedState, combineReducers} from "redux";
import {HYDRATE} from "next-redux-wrapper";
import usersReducer, {User} from 'src/redux/slices/users';
import authReducer, {AuthSliceState} from "@/redux/slices/auth";


const combinedReducers = combineReducers({
    usersReducer,
    authReducer,
})

export type OurStore = ReturnType<typeof combinedReducers>;
/* 리듀서는 변화를 일으키는 함수로 액션을 전달받아 새로운 상태를 만들어 내는 역할을 수행한다 */
const reducer = (state: OurStore | undefined, action: AnyAction) => {
    if(action.type === HYDRATE) { // SSR 작업 수행 시 HYDRATE 라는 액션을 통해서 서버의 스토어와 클라이언트의 스토어를 합쳐주는 작업을 수행
        const nextState =  {
            ...state, // use previous state
            ...action.payload // apply delta from hydration
        }
        if(state?.authReducer) nextState.authReducer = state.authReducer; // 서버에서 HYDRATE할 store값을 xxxxx에 설정해준다. (HYDRATE이후 PERSIST사용시 덮어 씌여진다 - whitelist, blacklist도 persist제어 가능)
        // if(action.payload?.me) nextState.authReducer = action.payload?.me;
        return nextState;
    }
    return combinedReducers(state, action);
}

export default reducer;