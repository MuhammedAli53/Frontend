import { createSlice } from "@reduxjs/toolkit"
import { getMenuItems } from "../../helpers/functions/user-menu";

const initialState = {
    user: null,
    isUserLogin: false,
    menu: []
}

export const authSlice = createSlice({/* bu yapıyı redux kedndisi için ister. */
    name: "auth",
    initialState,
    reducers:{
        login: (state, action) => {
            state.isUserLogin = true;
            state.user = action.payload;
            state.menu = getMenuItems(action.payload.role);
        },
        logout: (state) => {
            state.isUserLogin = false;
            state.user = null;
            state.menu=[];
        },
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;