import {api} from "../../constants/api";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export const getOrderDetails = (ingredientsList) => {
    return dispatch => {
        dispatch({
            type: GET_ORDER_REQUEST
        })
        fetch(`${api.urls.baseUrl}${api.urls.orders}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({"ingredients": ingredientsList.map(item => item.data)})
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status)
            })
            .then((res) => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    orderDetails: res
                })
            })
            .catch(() => {
                dispatch({
                    type: GET_ORDER_FAILED,
                })
            })
    }
}