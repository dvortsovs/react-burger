import {api} from "../../constants/api";

export const FORGOT_PASSWORD_REQUEST = 'GET_REGISTRATION_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'GET_REGISTRATION_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'GET_REGISTRATION_FAILED';

export const forgotPasswordRequest = (email, replaceToCallback) => {
    return dispatch => {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        })
        fetch(`${api.urls.baseUrl}${api.urls.forgotPassword}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({
                "email": email
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status)
            })
            .then((res) => {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS
                })
                replaceToCallback()
            })
            .catch(() => {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED,
                })
            })
    }
}