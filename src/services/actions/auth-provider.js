import {api} from "../../constants/api";
import {getCookie, fetchWithRefresh, removeTokens, checkResponse, setTokens} from "../utils";
import {
    updateUserInfoFailed,
    updateUserInfo as updateUserInfoSuccess,
    login as loginSuccess,
    logout as logoutSuccess,
    changeUserInfo as changeUserInfoSuccess,
} from "../reducers/auth-provider";
import {apiRequest, apiRequestFailed, apiRequestSuccess} from "../reducers/api-requests";

export const login = (email, password, replaceToCallback) => {
    return dispatch => {
        dispatch(apiRequest())
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
                dispatch(apiRequestSuccess())
                dispatch(loginSuccess(res.user))
                setTokens(res.accessToken.split('Bearer ')[1], res.refreshToken);
                replaceToCallback();
            })
            .catch((err) => {
                dispatch(apiRequestFailed(err))
            })
    }
}

export const logout = (replaceCallback) => {
    return dispatch => {
        dispatch(apiRequest())
        fetch(`${api.urls.baseUrl}${api.urls.logout}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({"token": `${localStorage.getItem('refreshToken')}`})
        })
            .then(checkResponse)
            .then(() => {
                dispatch(apiRequestSuccess())
                dispatch(logoutSuccess())
                removeTokens();
                replaceCallback();
            })
            .catch((err) => {
                dispatch(apiRequestFailed(err))
            })
    }
}

export const getRegistration = (name, email, password, replaceToCallback) => {
    return dispatch => {
        dispatch(apiRequest())
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
                dispatch(apiRequestSuccess())
                dispatch(loginSuccess(res.user))
                setTokens(res.accessToken.split('Bearer ')[1], res.refreshToken)
                replaceToCallback()
            })
            .catch((err) => {
                dispatch(apiRequestFailed(err))
            })
    }
}

export const forgotPasswordRequest = (email, replaceToCallback) => {
    return dispatch => {
        dispatch(apiRequest())
        fetch(`${api.urls.baseUrl}${api.urls.forgotPassword}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({"email": email})
        })
            .then(checkResponse)
            .then(() => {
                dispatch(apiRequestSuccess())
                replaceToCallback()
            })
            .catch((err) => {
                dispatch(apiRequestFailed(err))
            })
    }
}

export const resetPasswordRequest = (password, token, replaceToCallback) => {
    return dispatch => {
        dispatch(apiRequest())
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
                dispatch(apiRequestSuccess())
                replaceToCallback()
            })
            .catch((err) => {
                dispatch(apiRequestFailed(err))
            })
    }
}

export const updateUserInfoRequest = () => {
    return dispatch => {
        dispatch(apiRequest())
        fetchWithRefresh(`${api.urls.baseUrl}${api.urls.user}`, {
            method: 'GET',
            headers: {
                ...api.headers,
                Authorization: `Bearer ${getCookie('accessToken')}`
            }
        })
            .then((res) => {
                dispatch(apiRequestSuccess())
                dispatch(updateUserInfoSuccess(res.user))
            })
            .catch((err) => {
                dispatch(apiRequestFailed(err))
                dispatch(updateUserInfoFailed())
            })
    }
}

export const changeUserInfoRequest = (name, email, password) => {
    return dispatch => {
        dispatch(apiRequest())
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
                dispatch(apiRequestSuccess())
                dispatch(changeUserInfoSuccess(res.user))
            })
            .catch((err) => {
                dispatch(apiRequestFailed(err))
            })
    }
}