import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    isLogin: boolean,
    data: any
}

const initialState: UserState = {
    isLogin: false,
    data: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoginData: (state, action) => {
            return {
                isLogin: true,
                data: action.payload
            }
        }
    }
})

export const userAction = {
    ...userSlice.actions
}

export const userReducer = userSlice.reducer