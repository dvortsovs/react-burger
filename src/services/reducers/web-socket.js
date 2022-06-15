import {
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_GET_MESSAGE,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_CLIENT_CLOSED,
    WS_CONNECTION_CLIENT_CLOSED
} from "../actions/web-socket";

const initialState = {
    wsConnected: false,
    messages: null,
    payload: null
}

export const wsReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_AUTH_CONNECTION_CLIENT_CLOSED: {
            return {
                ...state,
                messages: null,
            }
        }
        case WS_AUTH_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnected: false,
                payload: {...action.payload}
            }
        }
        case WS_AUTH_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true,
                payload: {...action.payload}
            }
        }
        case WS_AUTH_GET_MESSAGE: {
            return {
                ...state,
                messages: {...action.payload}
            }
        }
        case WS_AUTH_CONNECTION_ERROR: {
            return {
                ...state,
                wsConnected: false,
                payload: {...action.payload}
            }
        }
        case WS_CONNECTION_CLIENT_CLOSED: {
            return {
                ...state,
                messages: null,
            }
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnected: false,
                payload: {...action.payload}
            }
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true,
                payload: {...action.payload}
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
                wsConnected: false,
                payload: {...action.payload}
            }
        }
        default: {
            return state
        }
    }
}