import {api} from "../../constants/api";
import {getCookie, fetchWithRefresh, removeTokens, checkResponse, setTokens} from "../utils";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAILED = 'UPDATE_USER_INFO_FAILED';
export const CHANGE_USER_INFO_REQUEST = 'CHANGE_USER_INFO_REQUEST';
export const CHANGE_USER_INFO_SUCCESS = 'CHANGE_USER_INFO_SUCCESS';
export const CHANGE_USER_INFO_FAILED = 'CHANGE_USER_INFO_FAILED';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const login = (email, password, replaceToCallback) => {
    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST
        })
        fetch(`${api.urls.baseUrl}${api.urls.login}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({
                "email": email,
                "password": password,
            })
        })
            .then(checkResponse)
            .then((res) => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    user: res.user
                })
                setTokens(res.accessToken.split('Bearer ')[1], res.refreshToken)
                replaceToCallback()
            })
            .catch((err) => {
                dispatch({
                    type: LOGIN_FAILED,
                    error: err
                })
            })
    }
}

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
                    type: LOGOUT_SUCCESS,
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

export const getRegistration = (name, email, password, replaceToCallback) => {
    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST
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
            .then(checkResponse)
            .then((res) => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    user: res.user
                })
                setTokens(res.accessToken.split('Bearer ')[1], res.refreshToken)
                replaceToCallback()
            })
            .catch((err) => {
                dispatch({
                    type: LOGIN_FAILED,
                    error: err
                })
            })
    }
}

export const forgotPasswordRequest = (email, replaceToCallback) => {
    return dispatch => {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        })
        fetch(`${api.urls.baseUrl}${api.urls.forgotPassword}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({"email": email})
        })
            .then(checkResponse)
            .then(() => {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS,
                })
                replaceToCallback()
            })
            .catch((err) => {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED,
                    error: err
                })
            })
    }
}

export const resetPasswordRequest = (password, token, replaceToCallback) => {
    return dispatch => {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        })
        fetch(`${api.urls.baseUrl}${api.urls.forgotPassword}${api.urls.resetPassword}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({
                "password": password,
                "token": token
            })
        })
            .then(checkResponse)
            .then(() => {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS,
                })
                replaceToCallback()
            })
            .catch((err) => {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
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