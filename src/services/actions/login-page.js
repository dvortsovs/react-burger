import {api} from "../../constants/api";
import {LOGIN} from "./auth-provider";
import {setTokens} from "../utils";

export const GET_SIGNIN_REQUEST = 'GET_SIGNIN_REQUEST';
export const GET_SIGNIN_SUCCESS = 'GET_SIGNIN_SUCCESS';
export const GET_SIGNIN_FAILED = 'GET_SIGNIN_FAILED';

export const signIn = (email, password, replaceToCallback) => {
    return dispatch => {
        dispatch({
            type: GET_SIGNIN_REQUEST
        })
        fetch(`${api.urls.baseUrl}${api.urls.login}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({
                "email": email,
                "password": password,
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
                    type: GET_SIGNIN_SUCCESS,
                })
                dispatch({
                    type: LOGIN,
                    user: res.user,
                })
                setTokens(res.accessToken.split('Bearer ')[1], res.refreshToken)
                replaceToCallback()
            })
            .catch(() => {
                dispatch({
                    type: GET_SIGNIN_FAILED,
                })
            })
    }
}