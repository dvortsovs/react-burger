import {
    LOGIN,
    LOGOUT,
    CHANGE_USER_INFO_SUCCESS,
    CHANGE_USER_INFO_FAILED,
    CHANGE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_FAILED,
    UPDATE_USER_INFO_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    LOGOUT_REQUEST
} from "../actions/auth-provider";

const initialState = {
    auth: false,
    user: null,
    apiRequest: false,
    apiRequestFailed: false,
    error: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_FAILED: {
            return {
                ...state,
                apiRequest: false,
                apiRequestFailed: true,
                error: action.error
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                apiRequest: false,
                apiRequestFailed: false,
                error: null,
                auth: false,
                user: null
            }
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                apiRequest: true
            }
        }
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
                apiRequestFailed: true,
                error: action.error
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
                apiRequestFailed: true,
                error: action.error
            }
        }
        case LOGIN: {
            return {
                ...state,
                auth: true,
                user: action.user,
            }
        }
        default: {
            return state
        }
    }
}
