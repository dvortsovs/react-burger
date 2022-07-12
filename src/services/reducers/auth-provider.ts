import {AnyAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    changeUserInfoRequest,
    forgotPasswordRequest,
    getRegistration,
    login,
    logout,
    resetPasswordRequest,
    updateUserInfoRequest
} from "../actions/auth-provider";

export type TUser = {
    name: string;
    email: string;
}

type TAuthState = {
    auth: boolean | null;
    user: TUser | null;
    request: boolean,
    requestFailed: boolean,
    errorStatus: null | number
}

const initialState: TAuthState = {
    auth: null,
    user: null,
    request: false,
    requestFailed: false,
    errorStatus: null,
}

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutAction(state) {
            state.auth = false
            state.user = null
        },
        loginAction(state, action: PayloadAction<TUser>) {
            state.auth = true
            state.user = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state) => {
                state.request = true;
            })
            .addCase(login.fulfilled, (state) => {
                state.request = false;
                state.requestFailed = false;
                state.errorStatus = null;
            })
            .addCase(getRegistration.pending, (state) => {
                state.request = true;
            })
            .addCase(getRegistration.fulfilled, (state, action) => {
                state.request = false;
                state.requestFailed = false;
                state.errorStatus = null;
            })
            .addCase(forgotPasswordRequest.pending, (state) => {
                state.request = true;
            })
            .addCase(forgotPasswordRequest.fulfilled, (state) => {
                state.request = false;
                state.requestFailed = false;
                state.errorStatus = null;
            })
            .addCase(resetPasswordRequest.pending, (state) => {
                state.request = true;
            })
            .addCase(resetPasswordRequest.fulfilled, (state) => {
                state.request = false;
                state.requestFailed = false;
                state.errorStatus = null;
            })
            .addCase(updateUserInfoRequest.pending, (state) => {
                state.request = true;
            })
            .addCase(updateUserInfoRequest.fulfilled, (state, action) => {
                state.request = false;
                state.requestFailed = false;
                state.errorStatus = null;
                state.auth = true;
                state.user = action.payload;
            })
            .addCase(changeUserInfoRequest.pending, (state) => {
                state.request = true;
            }).addCase(changeUserInfoRequest.fulfilled, (state, action) => {
            state.request = false;
            state.requestFailed = false;
            state.errorStatus = null;
            state.user = action.payload;
        })
            .addCase(logout.pending, (state) => {
                state.request = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.request = false;
                state.requestFailed = false;
                state.errorStatus = null;
            })
            .addMatcher(isRequestError, (state, action: PayloadAction<string>) => {
                state.request = false;
                if (action.payload === 'cantGetUser') {
                    state.auth = false;
                }
            })
            .addMatcher(isRequestError, (state, action: PayloadAction<number>) => {
                state.request = false;
                state.requestFailed = true;
                state.errorStatus = action.payload;
            })
    }
})

const isRequestError = (action: AnyAction) => {
    return action.type.endsWith('rejected')
}

export default authReducer.reducer
export const {
    loginAction,
    logoutAction,
} = authReducer.actions
