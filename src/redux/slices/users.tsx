import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*
 createSlice
 A function that accepts an initial state, an object of reducer functions,
 and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
 */
export interface User {
    id: number;
    name: string;
}

let tempId = 3;

export const usersSlice = createSlice({
    name: 'users',
    initialState: [
        { id: 1, name: 'User1' },
        { id: 2, name: 'User2' },
    ] as User[],
    reducers: {
        /* 리듀서는 변화를 일으키는 함수로 액션을 전달받아 새로운 상태를 만들어 내는 역할을 수행한다 */
        addUser(state, action: PayloadAction<User>) {
            action.payload.id = tempId++;
            return [...state, action.payload];
        }
    }
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;