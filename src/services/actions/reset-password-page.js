import {api} from "../../constants/api";

export const GET_RESET_PASSWORD_REQUEST = 'GET_RESET_PASSWORD_REQUEST';
export const GET_RESET_PASSWORD_SUCCESS = 'GET_RESET_PASSWORD_SUCCESS';
export const GET_RESET_PASSWORD_FAILED = 'GET_RESET_PASSWORD_FAILED';

export const resetPasswordRequest = (password, token, replaceToCallback) => {
    return dispatch => {
        dispatch({
            type: GET_RESET_PASSWORD_REQUEST
        })
        fetch(`${api.urls.baseUrl}${api.urls.forgotPassword}${api.urls.resetPassword}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({
                "password": password,
                "token": token
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
                    type: GET_RESET_PASSWORD_SUCCESS,
                })
                replaceToCallback()
            })
            .catch(() => {
                dispatch({
                    type: GET_RESET_PASSWORD_FAILED,
                })
            })
    }
}