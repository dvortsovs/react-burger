import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type TApiRequestState = {
    apiRequest: boolean;
    apiRequestFailed: boolean;
    error: null | object;
}

const initialState: TApiRequestState = {
    apiRequest: false,
    apiRequestFailed: false,
    error: null
}

const apiRequestsReducer = createSlice({
    name: 'apiRequests',
    initialState,
    reducers: {
        apiRequest(state) {
            state.apiRequest = true
        },
        apiRequestSuccess(state) {
            state.apiRequest = false
            state.apiRequestFailed = false
            state.error = null
        },
        apiRequestFailed(state, action: PayloadAction<object>) {
            state.apiRequest = false
            state.apiRequestFailed = true
            state.error = action.payload
        },
    }
})

export default apiRequestsReducer.reducer
export const {apiRequest, apiRequestFailed, apiRequestSuccess} = apiRequestsReducer.actions