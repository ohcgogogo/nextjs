import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// https://redux-toolkit.js.org/api/createSlice

interface CounterState {
    value: number
}

const initialState = { value: 0 } as CounterState

const counterSlice = createSlice({
    name: 'counter', // A name, used in action types
    initialState, // The initial state for the reducer
    reducers: { // An object of "case reducers". Key names will be used to generate actions.
        increment(state) {
            state.value++
        },
        decrement(state) {
            state.value--
        },
        incrementByAmount(state, action: PayloadAction<number>) {
            state.value += action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer