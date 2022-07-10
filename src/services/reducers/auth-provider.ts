import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TUser = {
    name: string;
    email: string;
}

type TAuthState = {
    auth: boolean | null;
    user: TUser | null;
}

const initialState: TAuthState = {
    auth: null,
    user: null,
}

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeUserInfo(state, action: PayloadAction<TUser>) {
            state.user = action.payload
        },
        updateUserInfo(state, action: PayloadAction<TUser>) {
            state.auth = true
            state.user = action.payload
        },
        updateUserInfoFailed(state) {
            state.auth = false
        },
        logout(state) {
            state.auth = false
            state.user = null
        },
        login(state, action: PayloadAction<TUser>) {
            state.auth = true
            state.user = action.payload
        },
    }
})

export default authReducer.reducer
export const {
    login,
    logout,
    changeUserInfo,
    updateUserInfoFailed,
    updateUserInfo
} = authReducer.actions
