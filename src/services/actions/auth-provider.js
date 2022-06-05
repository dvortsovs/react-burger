import {api} from "../../constants/api";
import {getCookie, fetchWithRefresh} from "../utils";

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST'
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS'
export const UPDATE_USER_INFO_FAILED = 'UPDATE_USER_INFO_FAILED'
export const CHANGE_USER_INFO_REQUEST = 'CHANGE_USER_INFO_REQUEST'
export const CHANGE_USER_INFO_SUCCESS = 'CHANGE_USER_INFO_SUCCESS'
export const CHANGE_USER_INFO_FAILED = 'CHANGE_USER_INFO_FAILED'


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
            .catch(() => {
                dispatch({
                    type: UPDATE_USER_INFO_FAILED,
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
            .catch(() => {
                dispatch({
                    type: CHANGE_USER_INFO_FAILED,
                })
            })
    }
}