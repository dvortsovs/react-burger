import {
    GET_SIGNIN_FAILED,
    GET_SIGNIN_SUCCESS,
    GET_SIGNIN_REQUEST
} from "../actions/login-page";

const initialState = {
    signInRequest: false,
    signInRequestFailed: false
}

export const signInReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SIGNIN_REQUEST: {
            return {
                ...state,
                signInRequest: true,
            }
        }
        case GET_SIGNIN_SUCCESS: {
            return {
                ...state,
                signInRequest: false,
                signInRequestFailed: false,
            }
        }
        case GET_SIGNIN_FAILED: {
            return {
                ...state,
                signInRequest: false,
                signInRequestFailed: true,
            }
        }
        default: {
            return state
        }
    }
}