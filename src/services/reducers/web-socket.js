import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED
} from "../actions/web-socket";

const initialState = {
    wsConnected: false,
    messages: null
}

export const wsReducer = (state = initialState, action) => {
    switch (action.type) {

        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnected: false
            }
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true
            }
        }
        case WS_SEND_MESSAGE: {
            return {

            }
        }
        case WS_GET_MESSAGE: {
            return {
                ...state,
                messages: {...action.payload}
            }
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                wsConnected: false
            }
        }
        default: {
            return state
        }
    }
}