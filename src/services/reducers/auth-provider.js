
import {createSlice} from "@reduxjs/toolkit";

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        auth: null,
        user: null,
    },
    reducers: {
        changeUserInfo(state, action) {
            state.user = action.payload
        },
        updateUserInfo(state, action) {
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
        login(state, action) {
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
