import {api} from "../../constants/api";
import {getCookie, fetchWithRefresh, removeTokens, setTokens} from "../utils";
import {loginAction, logoutAction, TUser} from "../reducers/auth-provider";
import {TAppDispatch} from "../reducers";
import {createAsyncThunk} from "@reduxjs/toolkit";

type TReplaceToCallback = () => void

type TLoginPayload = {
    email: string;
    password: string;
    replaceToCallback: TReplaceToCallback;
}

type TRegistrationPayload = TLoginPayload & {
    name: string
}

type TChangeUserInfoPayload = Omit<TRegistrationPayload, 'replaceToCallback'>

type TResetPasswordPayload = Omit<TLoginPayload, 'email'> & {
    token: string;
}

type TLoginResponseData = {
    success: boolean;
    refreshToken: string;
    accessToken: string;
    user: TUser
}

type TChangeUserInfoResponseData = Omit<TLoginResponseData, 'refreshToken' | 'accessToken'>

type TLogoutResponseData = {
    success: boolean;
    message: string;
}

type TForgotPasswordResponseData = TLogoutResponseData

export const login = createAsyncThunk<void, TLoginPayload, { rejectValue: number, dispatch: TAppDispatch }>(
    'auth/login',
    async ({email, password, replaceToCallback}, {rejectWithValue, dispatch}) => {
        const response = await fetch(`${api.urls.baseUrl}${api.urls.login}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({
                "email": email,
                "password": password,
            })
        });
        if (response.ok) {
            const data = await response.json() as TLoginResponseData;
            setTokens(data.accessToken.split('Bearer ')[1], data.refreshToken);
            dispatch(loginAction(data.user))
            replaceToCallback();
        } else return rejectWithValue(response.status)
    }
)

export const logout = createAsyncThunk<void, Omit<TLoginPayload, 'email' | 'password'>, { rejectValue: number, dispatch: TAppDispatch  }>(
    'auth/logout',
    async ({replaceToCallback}, {rejectWithValue, dispatch}) => {
        const response = await fetch(`${api.urls.baseUrl}${api.urls.logout}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({"token": `${localStorage.getItem('refreshToken')}`})
        });
        if (response.ok) {
            removeTokens();
            dispatch(logoutAction());
            replaceToCallback();
        } else return rejectWithValue(response.status)
    }
)

export const getRegistration = createAsyncThunk<void, TRegistrationPayload, { rejectValue: number, dispatch: TAppDispatch   }>(
    'auth/getRegistration',
    async ({name, password, email, replaceToCallback}, {rejectWithValue, dispatch}) => {
        const response = await fetch(`${api.urls.baseUrl}${api.urls.registration}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name
            })
        });
        if (response.ok) {
            const data = await response.json() as TLoginResponseData;
            setTokens(data.accessToken.split('Bearer ')[1], data.refreshToken)
            dispatch(loginAction(data.user));
            replaceToCallback();
        } else return rejectWithValue(response.status)
    }
)

export const forgotPasswordRequest = createAsyncThunk<TForgotPasswordResponseData, Omit<TLoginPayload, 'password'>, { rejectValue: number }>(
    'auth/forgotPasswordRequest',
    async ({email, replaceToCallback}, {rejectWithValue}) => {
        const response = await fetch(`${api.urls.baseUrl}${api.urls.forgotPassword}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({"email": email})
        });
        if (response.ok) {
            const data = await response.json() as TForgotPasswordResponseData;
            replaceToCallback();
            return data;
        } else return rejectWithValue(response.status)
    }
)

export const resetPasswordRequest = createAsyncThunk<TForgotPasswordResponseData, TResetPasswordPayload, { rejectValue: number }>(
    'auth/resetPasswordRequest',
    async ({password, token, replaceToCallback}, {rejectWithValue}) => {
        const response = await fetch(`${api.urls.baseUrl}${api.urls.forgotPassword}${api.urls.resetPassword}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({
                "password": password,
                "token": token
            })
        });
        if (response.ok) {
            const data = await response.json() as TForgotPasswordResponseData;
            replaceToCallback();
            return data;
        } else return rejectWithValue(response.status)
    }
)

export const updateUserInfoRequest = createAsyncThunk<TUser, undefined, { rejectValue: string }>(
    'auth/updateUserInfoRequest',
    async (_, {rejectWithValue}) => {
        const response = await fetchWithRefresh(`${api.urls.baseUrl}${api.urls.user}`, {
            method: 'GET',
            headers: {
                ...api.headers,
                Authorization: `Bearer ${getCookie('accessToken')}`
            }

        })
        if (response.ok) {
            const data = await response.json() as TLoginResponseData;
            return data.user;
        } else return rejectWithValue('cantGetUser')
    }
)

export const changeUserInfoRequest = createAsyncThunk<TUser, TChangeUserInfoPayload, { rejectValue: string }>(
    'auth/changeUserInfoRequest',
    async ({name, email, password}, {rejectWithValue}) => {
        const response = await fetchWithRefresh(`${api.urls.baseUrl}${api.urls.user}`, {
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
        if (response.ok) {
            const data = await response.json() as TChangeUserInfoResponseData;
            return data.user;
        } else return rejectWithValue('cantGetUser')
    }
)
