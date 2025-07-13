import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { postsAPI } from "../api/postsAPI";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [postsAPI.reducerPath]: postsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postsAPI.middleware)
});