import './main.scss';
import RouteSetup from '@routes/RouteSetup';
import './i18n/config';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from './stores';
import { useEffect, createContext, useState } from 'react';
import api from './services/api';
import { userAction } from './stores/slices/user.slice';
import { productAction } from './stores/slices/product.slice';
import { categoryAction } from './stores/slices/category.slice';
import { cartAction } from './stores/slices/cart.slice';

/* Context Config */
export const RootContext = createContext(0);

function App() {
  const dispatch = useDispatch();
  const store = useSelector(store => store) as StoreType;

  // useEffect(() => {
  //   console.log("userStore", store.userStore)
  // }, [store])

  useEffect(() => {
    if (localStorage.getItem("token")) {
      api.userApi.authentication()
        .then(res => {
          if (res.status == 200) {
            dispatch(userAction.setLoginData(res.data.data))
          } else {
            localStorage.removeItem("token");
          }
        })
    }
  }, [])

  useEffect(() => {
    api.categoryApi.findMany()
      .then(res => {
        // console.log("res", res)
        if (res.status == 200) {
          dispatch(categoryAction.setCategoryData(res.data.data))
        } else {
        }
      })
      .catch(err => {

      })
  }, []);

  // useEffect(() => {
  //   cartAction.setCartData(10)
  // }, []);

  return (
    <RootContext.Provider value={1}>
      {/* {t('hello')} */}
      {/* <h1>{store.userStore.data?.firstName}</h1> */}
      <RouteSetup />
    </RootContext.Provider>
  )
}

export default App;
