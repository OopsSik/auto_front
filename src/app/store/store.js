import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./userSlice.js";
import {userApi} from "./userApi.js";
import {popupReducer} from "./popupSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        popups: popupReducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware)
})