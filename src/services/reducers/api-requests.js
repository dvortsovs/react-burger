import {createSlice} from "@reduxjs/toolkit";

const apiRequestsReducer = createSlice({
    name: 'apiRequests',
    initialState: {
        apiRequest: false,
        apiRequestFailed: false,
        error: null
    },
    reducers: {
        apiRequest(state) {
            state.apiRequest = true
        },
        apiRequestSuccess(state) {
            state.apiRequest = false
            state.apiRequestFailed = false
            state.error = null
        },
        apiRequestFailed(state, action) {
            state.apiRequest = false
            state.apiRequestFailed = true
            state.error = action.payload
        },
    }
})

export default apiRequestsReducer.reducer
export const {apiRequest, apiRequestFailed, apiRequestSuccess} = apiRequestsReducer.actions