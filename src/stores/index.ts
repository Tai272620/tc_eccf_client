import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { commonReducer } from './slices/common.slice';

import { userReducer } from './slices/user.slice';

import { productReducer } from './slices/product.slice';

import { categoryReducer } from './slices/category.slice';

import { cartReducer } from './slices/cart.slice';

// Kết hợp reducer
const rootReducer = combineReducers({
    commonStore: commonReducer,
    userStore: userReducer,
    productStore: productReducer,
    categoryStore: categoryReducer,
    cartStore: cartReducer
});

// Xuất ra store type
export type StoreType = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer
})

export default store