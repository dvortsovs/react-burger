import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TFeedDetailsOrder} from "./feed-details";

type TWsMessages = {
    success: boolean;
    total: number;
    totalToday: number;
    orders: TFeedDetailsOrder[];
}

type TWsPayload = {
    isTrusted?: boolean;
}

type TWsReducerState = {
    wsConnected: boolean;
    messages: TWsMessages | null;
    payload: TWsPayload | null;
}

const initialState: TWsReducerState = {
    wsConnected: false,
    messages: null,
    payload: null
}

const wsReducer = createSlice({
    name: 'wsReducer',
    initialState,
    reducers: {
        wsConnectionClientClosed(state) {
            state.wsConnected = false
            state.messages = null
        },
        wsConnectionSuccess(state, action: PayloadAction<TWsPayload>) {
            state.wsConnected = true
            state.payload = {...action.payload}
        },
        wsConnectionGetMessage(state, action: PayloadAction<TWsMessages>) {
            state.messages = {...action.payload}
        },
        wsConnectionClosed(state, action: PayloadAction<TWsPayload>) {
            state.wsConnected = false
            state.payload = {...action.payload}
        },
        wsConnectionError(state, action: PayloadAction<TWsPayload>) {
            state.wsConnected = false
            state.payload = {...action.payload}
        },
        wsAuthConnectionClientClosed(state) {
            state.wsConnected = false
            state.messages = null
        },
        wsAuthConnectionSuccess(state, action: PayloadAction<TWsPayload>) {
            state.wsConnected = true
            state.payload = {...action.payload}
        },
        wsAuthConnectionGetMessage(state, action: PayloadAction<TWsMessages>) {
            state.messages = {...action.payload}
        },
        wsAuthConnectionClosed(state, action: PayloadAction<TWsPayload>) {
            state.wsConnected = false
            state.payload = {...action.payload}
        },
        wsAuthConnectionError(state, action: PayloadAction<TWsPayload>) {
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