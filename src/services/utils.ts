import {api} from "../constants/api";
import {timePieces} from "../constants/time-pieces";
import {AnyAction} from "@reduxjs/toolkit";
import {ChangeEvent} from "react";

type TOptionsForFetch = RequestInit & {

    headers: {
        [key: string]: string
    }
}

type TRefreshTokensResponse = {
    success: boolean;
    refreshToken: string;
    accessToken: string;
}

const validateForm = (e: ChangeEvent<HTMLInputElement>, type: string, setValue: (arg: string) => void, setError: (arg: boolean) => void) => {
    switch (type) {
        case 'email':
            setValue(e.target.value)
            const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            setError(!reg.test(e.target.value))
            break
        case 'text':
            setValue(e.target.value)
            setError(e.target.value === '')
            break
        default:
            return
    }
}

function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name: string, value: string) {
    value = encodeURIComponent(value);
    document.cookie = name + '=' + value;
}

function deleteCookie(name: string) {
    const value = getCookie(name)
    document.cookie = `${name}=${value}; max-age=-1`
}

function setTokens(accessToken: string, refreshToken: string) {
    deleteCookie('accessToken');
    setCookie('accessToken', accessToken);
    localStorage.removeItem('refreshToken');
    localStorage.setItem('refreshToken', refreshToken);
}

function removeTokens() {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
}

function refreshToken() {
    return fetch(`${api.urls.baseUrl}${api.urls.updateToken}`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({"token": `${localStorage.getItem('refreshToken')}`})
    })
        .then((res): Promise<TRefreshTokensResponse> => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(res)
        })
        .then((refreshData) => {
            if (refreshData.success) {
                setTokens(refreshData.accessToken.split('Bearer ')[1], refreshData.refreshToken);
                return refreshData
            }
            return Promise.reject(refreshData);
        })
}

async function fetchWithRefresh(url: string, options: TOptionsForFetch) {
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw res
        }
        return res
    } catch (error) {
        const err = error as Response
        const errorPayload = await err.json()
        if (errorPayload.message === 'jwt expired') {
            const refreshData = await refreshToken();
            if (options.headers)
                options.headers.Authorization = refreshData.accessToken;
            const res = await fetch(url, options)
            return res
        } else {
            return Promise.reject(error)
        }
    }
}

const isRequestError = (action: AnyAction) => {
    return action.type.endsWith('rejected')
}

function defineDay(createdAt: string | undefined): string {
    const date = new Date()
    date.setHours(0, 0, 0)
    const parsedCreatedDate = new Date(createdAt ? createdAt : '')
    const difference = Math.round((date.getTime() - parsedCreatedDate.getTime()) / 1000)
    if (difference < 0) return 'Сегодня'
    if ((0 < difference) && (difference < timePieces.day)) return 'Вчера'
    if (Math.floor(difference / timePieces.day) === 1) return '1 день назад'
    if (Math.floor(difference / timePieces.day) === 21) {
        return `${Math.floor(difference / timePieces.day)} день назад`
    }
    if ((difference < timePieces.day * 5)
        || ((21 * timePieces.day < difference) && (difference < 25 * timePieces.day))) {
        return `${Math.floor(difference / timePieces.day)} дня назад`
    }
    if (((timePieces.day * 5 < difference) && (difference < timePieces.day * 21))
        || ((25 * timePieces.day < difference) && (difference < 31 * timePieces.day))) {
        return `${Math.floor(difference / timePieces.day)} дней назад`
    }
    if ((31 * timePieces.day < difference) && (difference < 2 * timePieces.month)) {
        return `${Math.floor(difference / timePieces.month)} месяц назад`
    }
    if ((2 * timePieces.month < difference) && (difference < 5 * timePieces.month)) {
        return `${Math.floor(difference / timePieces.month)} месяца назад`
    }
    if ((5 * timePieces.month < difference) && (difference < 12 * timePieces.month)) {
        return `${Math.floor(difference / timePieces.month)} месяцев назад`
    } else return 'Более года назад'
}

export {
    validateForm,
    setCookie,
    deleteCookie,
    getCookie,
    setTokens,
    fetchWithRefresh,
    removeTokens,
    defineDay,
    isRequestError
}