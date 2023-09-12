import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
    [x: string]: any;
    data: any
}

const initialState: CartState = {
    data: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartData: (state, action) => {
            return {
                data: action.payload
            }
        }
    }
})

export const cartAction = {
    ...cartSlice.actions
}

export const cartReducer = cartSlice.reducer