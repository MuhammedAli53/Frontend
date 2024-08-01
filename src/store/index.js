import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import miscReducer from "./slices/misc-slice";
export default configureStore({
    reducer: {
        auth: authReducer,
        misc: miscReducer
    }
})