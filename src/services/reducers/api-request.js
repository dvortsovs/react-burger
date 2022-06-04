import {
    API_REQUEST,
    API_REQUEST_SUCCESS,
    API_REQUEST_FAILED
} from "../actions/api-request";

const initialState = {
    apiRequest: false,
    apiRequestFailed: false,
    error: null,
    data: null
}

export const apiRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_REQUEST: {
            return {
                ...state,
                apiRequest: true
            }
        }
        case API_REQUEST_SUCCESS: {
            return {
                ...state,
                apiRequest: false,
                apiRequestFailed: false,
                data: action.data,
                error: null
            }
        }
        case API_REQUEST_FAILED: {
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