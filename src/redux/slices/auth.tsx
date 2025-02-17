import {createSlice, SerializedError, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "@/utils/axios";

export enum AuthStates {
    IDLE = 'idle',
    LOADING = 'loading',
}
type Me = {
    email: string
} | null
export interface AuthSliceState {
    // accessToken: string
    loading: AuthStates
    me: Me
    error: SerializedError | null
}

// That's what we will store in the auth slice.
const internalInitialState : AuthSliceState = {
    // accessToken: '',
    loading: AuthStates.IDLE,
    me: null,
    error: null,
}

// createSlice
export const authSlice = createSlice({
    name: 'auth', // name of the slice that we will use.
    initialState: internalInitialState,
    reducers: {
        // here will end up non async basic reducers.
        // updateAccessToken(state: AuthSliceState, action: PayloadAction<{ accessToken: string }>) {
        //     state.accessToken = action.payload.accessToken
        // },
        // updateMe(state: AuthSliceState, action: PayloadAction<{ me: Me }>) {
        //     state.me = action.payload.me
        // },
        reset: () => internalInitialState,
    },
    extraReducers: (builder) => { // extraReducers 를 쓰는경우 store에는 값이 저장되는데, payload 에 값이 설정되지 않아 HYDRATE할때 혼선이 올수 있음.
        builder.addCase(login.fulfilled, (state, action) => {
            // state.accessToken = action.payload.accessToken
            state.me = action.payload.me
            //                 authSlice.caseReducers.updateMe(state, action) // dispatch를 할수 있는 방법이 있을까??? (Allow to dispatch actions with the createAsyncThunk's result ?? )
            // TODO createAsyncThunk 를 처리하는 reducer와 authReducer를 분리해서 authReducer를 dispatch하는식으로 작성해봐야함.
            state.loading = AuthStates.IDLE
        })
        builder.addCase(login.rejected, (state, action : any) => {
            state = { ...internalInitialState, error: action.error }
            throw new Error(action.payload.error)
        })
        builder.addCase(logout.pending, (state) => {
            state.loading = AuthStates.LOADING
        })
        builder.addCase(logout.fulfilled, (state, action : any) => internalInitialState )
        builder.addCase(logout.rejected, (state, action : any) => {
console.log("logout.rejected");
console.log(action);
            // state.error = action.error
            throw new Error(action.payload.error)
        })
        builder.addCase(login.pending, (state) => {
            state.loading = AuthStates.LOADING
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = AuthStates.IDLE
        })
        builder.addCase(register.rejected, (state, action : any) => {
console.log("register.rejected");
console.log(action);
            state.error = action.error
            throw new Error(action.payload.error)
        })
        builder.addCase(fetchUser.rejected, (state, action : any) => {
            throw new Error(action.payload.error)
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            // state.me = action.payload
        })
    } // here will end up async more complex reducers.
})

// token timeout테스트하기 위해서 넣은 소스로 그냥 테스트 용도임.
export const fetchUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
    try {
        const response = await axios.post('api/auth/me', _) // Call proxy server (api/pages/me.ts)
console.log("fetchUser response : ", response.data);
        return response.data
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.response.data.data.map((o: { message: any }) => o.message).join(', ') })
    }
})

//
export const register = createAsyncThunk(
    'auth/register',
    async (credentials: { email: string; password: string; }, thunkAPI) => {
        try {
            // Register the user with credentials payload (email, password)
            const response = await axios.post<{ accessToken: string }>('/api/auth/register', credentials, {
                headers: { Authorization: `Bearer ` },
            }) // Call proxy server (api/pages/register.ts)
console.log(credentials.email);
console.log(response.data);
            // return access token + user data
            return { me: { email: '' } }
        } catch (error: any) {
            // push error further
            // const error = e as AxiosError
console.log(error.response.data.data.map((o: { message: any }) => o.message).join(', '));
            return thunkAPI.rejectWithValue({ error: error.response.data.data.map((o: { message: any }) => o.message).join(', ') })
        }
    }
) // TODO 에러처리를 최종적으로 어떻게 해야하는지와 회원 가입 후 로그인 여부를 어떻게 판단하는지 등등 확인해야함. (이건 회원가입이기떄문에 로그인이 안된걸로 인식되어야함)
// TODO 회원가입은 사실 auth 상태와 별개로 작성되어야할것 같은데..ㅎㅎ 같이 작성이 되어있네....

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, thunkAPI) => {
        try {
            const response : any = await axios.post<{ accessToken: string }>('/api/auth/login', credentials, {
                headers: { Authorization: `Bearer ` },
            })
console.log(response.data.data.token)
            // const dispatch: MyThunkDispatch = useDispatch();
            // dispatch(updateMe({ me: { email: credentials.email } }))
            return { me: { email: credentials.email } }
        } catch (error : any) {
            // const error = e as AxiosError
            return thunkAPI.rejectWithValue({ error: error.response.data.data.map((o: { message: any }) => o.message).join(', ') })
        }
    }
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
console.log("logout axios.defaults.headers.Authorization", axios.defaults.headers.common["Authorization"])

        await axios.post<{ accessToken: string }>('/api/auth/logout', _)
        return {}
    } catch (error : any) {
        // const error = e as AxiosError
        return thunkAPI.rejectWithValue({ error: error.response.data.data.map((o: { message: any }) => o.message).join(', ') })
    }
})

// Actions generated automatically by createSlice function
export const { reset } = authSlice.actions
// export const { reset } = authSlice.actions
export default authSlice.reducer