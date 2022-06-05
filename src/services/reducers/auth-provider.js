import {
    LOGIN,
    LOGOUT,
    CHANGE_USER_INFO_SUCCESS,
    CHANGE_USER_INFO_FAILED,
    CHANGE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_FAILED,
    UPDATE_USER_INFO_SUCCESS,
} from "../actions/auth-provider";

const initialState = {
    auth: false,
    user: null,
    apiRequest: false,
    apiRequestFailed: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_INFO_SUCCESS: {
            return {
                ...state,
                apiRequest: false,
                apiRequestFailed: false,
                user: {...action.user},
                auth: true
            }
        }
        case UPDATE_USER_INFO_REQUEST: {
            return {
                ...state,
                apiRequest: true
            }
        }
        case UPDATE_USER_INFO_FAILED: {
            return {
                ...state,
                apiRequest: false,
                apiRequestFailed: true
            }
        }
        case CHANGE_USER_INFO_SUCCESS: {
            return {
                ...state,
                apiRequest: false,
                apiRequestFailed: false,
                user: {...action.user}
            }
        }
        case CHANGE_USER_INFO_REQUEST: {
            return {
                ...state,
                apiRequest: true
            }
        }
        case CHANGE_USER_INFO_FAILED: {
            return {
                ...state,
                apiRequest: false,
                apiRequestFailed: true
            }
        }
        case LOGIN: {
            return {
                ...state,
                auth: true,
                user: action.user,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                auth: false,
                user: null,
            }
        }
        default: {
            return state
        }
    }
}
