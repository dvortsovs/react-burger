import {
    GET_FORGOT_PASSWORD_SUCCESS,
    GET_FORGOT_PASSWORD_FAILED,
    GET_FORGOT_PASSWORD_REQUEST
} from "../actions/forgot-password-page";

const initialState = {
    forgotRequest: false,
    forgotRequestFailed: false,
}

export const forgotPasswordPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotRequest: true
            }
        }
        case GET_FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotRequest: false,
                forgotRequestFailed: false
            }
        }
        case GET_FORGOT_PASSWORD_FAILED: {
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