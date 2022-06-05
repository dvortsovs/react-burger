import {api} from "../../constants/api";
import {getCookie, fetchWithRefresh, removeTokens, checkResponse} from "../utils";

export const LOGIN = 'LOGIN'
export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST'
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS'
export const UPDATE_USER_INFO_FAILED = 'UPDATE_USER_INFO_FAILED'
export const CHANGE_USER_INFO_REQUEST = 'CHANGE_USER_INFO_REQUEST'
export const CHANGE_USER_INFO_SUCCESS = 'CHANGE_USER_INFO_SUCCESS'
export const CHANGE_USER_INFO_FAILED = 'CHANGE_USER_INFO_FAILED'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'


export const logout = () => {
    return dispatch => {
        dispatch({
            type: LOGOUT_REQUEST
        })
        fetch(`${api.urls.baseUrl}${api.urls.logout}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({"token": `${localStorage.getItem('refreshToken')}`})
        })
            .then(checkResponse)
            .then(() => {
                dispatch({
                    type: LOGOUT_SUCCESS
                })
                removeTokens();
            })
            .catch((err) => {
                dispatch({
                    type: LOGOUT_FAILED,
                    error: err
                })
            })
    }
}

export const updateUserInfoRequest = () => {
    return dispatch => {
        dispatch({
            type: UPDATE_USER_INFO_REQUEST
        })
        fetchWithRefresh(`${api.urls.baseUrl}${api.urls.user}`, {
            method: 'GET',
            headers: {
                ...api.headers,
                Authorization: `Bearer ${getCookie('accessToken')}`
                // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWI1YmRlZmE3NDdlMDAxYmQ0ZGIwZiIsImlhdCI6MTY1NDQ0OTE2MCwiZXhwIjoxNjU0NDUwMzYwfQ.lkuWo4nYxqBi7UTirdjRaBDRRhSQo5wskt7BTB9t4h0'
            }
        })
            .then((res) => {
                dispatch({
                    type: UPDATE_USER_INFO_SUCCESS,
                    user: res.user,
                })
            })
            .catch((err) => {
                dispatch({
                    type: UPDATE_USER_INFO_FAILED,
                    error: err
                })
            })
    }
}

export const changeUserInfoRequest = (name, email, password) => {
    return dispatch => {
        dispatch({
            type: CHANGE_USER_INFO_REQUEST
        })
        fetchWithRefresh(`${api.urls.baseUrl}${api.urls.user}`, {
            method: 'PATCH',
            headers: {
                ...api.headers,
                Authorization: `Bearer ${getCookie('accessToken')}`
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            })
        })
            .then((res) => {
                dispatch({
                    type: CHANGE_USER_INFO_SUCCESS,
                    user: res.user,
                })
            })
            .catch((err) => {
                dispatch({
                    type: CHANGE_USER_INFO_FAILED,
                    error: err
                })
            })
    }
}