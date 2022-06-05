import {api} from "../../constants/api";
import {LOGIN} from "./auth-provider";
import {setTokens} from "../utils";

export const GET_REGISTRATION_REQUEST = 'GET_REGISTRATION_REQUEST';
export const GET_REGISTRATION_SUCCESS = 'GET_REGISTRATION_SUCCESS';
export const GET_REGISTRATION_FAILED = 'GET_REGISTRATION_FAILED';

export const getRegistration = (name, email, password, replaceToCallback) => {
    return dispatch => {
        dispatch({
            type: GET_REGISTRATION_REQUEST
        })
        fetch(`${api.urls.baseUrl}${api.urls.registration}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name
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
                    type: GET_REGISTRATION_SUCCESS
                })
                dispatch({
                    type: LOGIN,
                    user: res.user
                })
                setTokens(res.accessToken.split('Bearer ')[1], res.refreshToken)
                replaceToCallback()
            })
            .catch(() => {
                dispatch({
                    type: GET_REGISTRATION_FAILED,
                })
            })
    }
}