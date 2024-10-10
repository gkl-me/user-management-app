import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import { apiSlice  } from "./slices/apiSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import adminReducer from './slices/adminSlice'

const store = configureStore({
    reducer: {
        auth:authReducer, 
        admin:adminReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})


type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store