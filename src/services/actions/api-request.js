
export const API_REQUEST = 'API_REQUEST';
export const API_REQUEST_SUCCESS = 'API_REQUEST_SUCCESS';
export const API_REQUEST_FAILED = 'API_REQUEST_FAILED';

export const apiRequest = (url, method, headers, body, callback) => {
    return dispatch => {
        dispatch({
            type: API_REQUEST
        })
        fetch(url, {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status)
            })
            .then((data) => {
                dispatch({
                    type: API_REQUEST_SUCCESS,
                    data: data
                })
                callback()
            })
            .catch((error) => {
                dispatch({
                    type: API_REQUEST_FAILED,
                    error: error
                })
            })
    }
}