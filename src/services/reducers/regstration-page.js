import {
    GET_REGISTRATION_REQUEST,
    GET_REGISTRATION_SUCCESS,
    GET_REGISTRATION_FAILED}
    from "../actions/registration-page";

const initialState = {
    registrationRequest: false,
    registrationRequestFailed: false,
}

export const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REGISTRATION_REQUEST: {
            return {
                ...state,
                registrationRequest: true,
            }
        }
        case GET_REGISTRATION_SUCCESS: {
            return {
                ...state,
                registrationRequest: false,
                registrationRequestFailed: false,
            }
        }
        case GET_REGISTRATION_FAILED: {
            return {
                ...state,
                registrationRequest: false,
                registrationRequestFailed: true,
            }
        }
        default: {
            return state
        }
    }
}