import {api} from "../../constants/api";

export const GET_FORGOT_PASSWORD_REQUEST = 'GET_FORGOT_PASSWORD_REQUEST';
export const GET_FORGOT_PASSWORD_SUCCESS = 'GET_FORGOT_PASSWORD_SUCCESS';
export const GET_FORGOT_PASSWORD_FAILED = 'GET_FORGOT_PASSWORD_FAILED';

export const forgotPasswordRequest = (email, replaceToCallback) => {
    return dispatch => {
        dispatch({
            type: GET_FORGOT_PASSWORD_REQUEST
        })
        fetch(`${api.urls.baseUrl}${api.urls.forgotPassword}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({"email": email})
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status)
            })
            .then((res) => {
                dispatch({
                    type: GET_FORGOT_PASSWORD_SUCCESS,
                })
                replaceToCallback()
            })
            .catch(() => {
                dispatch({
                    type: GET_FORGOT_PASSWORD_FAILED,
                })
            })
    }
}