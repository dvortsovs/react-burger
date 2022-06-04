import {
    LOGIN,
    LOGOUT,
} from "../actions/auth-provider";

const initialState = {
    auth: false,
    user: null,
    accessToken: null,
    refreshToken: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                auth: true,
                user: action.user,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        }
        case LOGOUT: {
            return {
                ...state,
                auth: false,
                user: null,
                accessToken: null,
                refreshToken: null
            }
        }
        default: {
            return state
        }
    }
}
