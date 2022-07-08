import {createSlice} from "@reduxjs/toolkit";

const wsReducer = createSlice({
    name: 'wsReducer',
    initialState: {
        wsConnected: false,
        messages: null,
        payload: null
    },
    reducers: {
        wsConnectionClientClosed(state) {
            state.wsConnected = false
            state.messages = null
        },
        wsConnectionSuccess(state, action) {
            state.wsConnected = true
            state.payload = {...action.payload}
        },
        wsConnectionGetMessage(state, action) {
            state.messages = {...action.payload}
        },
        wsConnectionClosed(state, action) {
            state.wsConnected = false
            state.payload = {...action.payload}
        },
        wsConnectionError(state, action) {
            state.wsConnected = false
            state.payload = {...action.payload}
        },
        wsAuthConnectionClientClosed(state) {
            state.wsConnected = false
            state.messages = null
        },
        wsAuthConnectionSuccess(state, action) {
            state.wsConnected = true
            state.payload = {...action.payload}
        },
        wsAuthConnectionGetMessage(state, action) {
            state.messages = {...action.payload}
        },
        wsAuthConnectionClosed(state, action) {
            state.wsConnected = false
            state.payload = {...action.payload}
        },
        wsAuthConnectionError(state, action) {
            state.wsConnected = false
            state.payload = {...action.payload}
        },
    }
})

export default wsReducer.reducer
export const {
    wsAuthConnectionGetMessage,
    wsAuthConnectionClosed,
    wsAuthConnectionSuccess,
    wsConnectionClientClosed,
    wsConnectionGetMessage,
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionSuccess,
    wsAuthConnectionError,
    wsAuthConnectionClientClosed
} = wsReducer.actions