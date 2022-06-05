import {api} from "../constants/api";

const validateForm = (e, type, setValue, setError) => {
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
        default: return
    }
}

function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, null, { expires: -1 });
}

function setTokens(accessToken, refreshToken) {
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

function removeTokens() {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
}

function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res)
}

function refreshToken() {
    return fetch(`${api.urls.baseUrl}${api.urls.updateToken}`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({"token": `${localStorage.getItem('refreshToken')}`})
    })
        .then(checkResponse)
        .then((refreshData) => {
            if (refreshData.success) {
                setTokens(refreshData.accessToken.split('Bearer ')[1], refreshData.refreshToken);
                return refreshData
            }
            return Promise.reject(refreshData);
        })
}

async function fetchWithRefresh(url, options) {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (error) {
        const errorPayload = await error.json()
        if (errorPayload.message === 'jwt expired') {
            const refreshData = await refreshToken();
            options.headers.Authorization = refreshData.accessToken;
            const res = await fetch(url, options)
            return await checkResponse(res)
        } else {
            return Promise.reject(error)
        }
    }
}

export {validateForm, setCookie, deleteCookie, getCookie, setTokens, checkResponse, fetchWithRefresh, removeTokens}