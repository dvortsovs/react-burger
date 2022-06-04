import {
    GET_RESET_PASSWORD_REQUEST,
    GET_RESET_PASSWORD_SUCCESS,
    GET_RESET_PASSWORD_FAILED
} from "../actions/reset-password-page";

const initialState = {
    resetRequest: false,
    resetRequestFailed: false,
}

export const resetPasswordPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotRequest: true
            }
        }
        case GET_RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotRequest: false,
                forgotRequestFailed: false
            }
        }
        case GET_RESET_PASSWORD_FAILED: {
            return {
                ...state,
                forgotRequest: false,
                forgotRequestFailed: true
            }
        }
        default: {
            return state
        }
    }
}