import {
    CHANGE_USER_INFO_SUCCESS,
    CHANGE_USER_INFO_FAILED,
    CHANGE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_FAILED,
    UPDATE_USER_INFO_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    LOGOUT_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
} from "../actions/auth-provider";

const initialState = {
    auth: null,
    user: null,
    apiRequest: false,
    apiRequestFailed: false,
    error: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                apiRequest: false,
                apiRequestFailed: false,
                error: null,
            }
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                apiRequest: true
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                apiRequest: false,
                apiRequestFailed: true,
                error: action.error
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                apiRequest: false,
                apiRequestFailed: false,
                error: null,
            }
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                apiRequest: false,
                apiRequestFailed: true,
                error: action.error
            }
        }
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                apiRequest: true
            }
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                apiRequest: true
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                apiRequest: false,
                apiRequestFailed: false,
                error: null,
                auth: true,
                user: action.user
            }
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                apiRequest: false,
                apiRequestFailed: true,
                error: action.error
            }
        }
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
                auth: false,
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
        default: {
            return state
        }
    }
}
