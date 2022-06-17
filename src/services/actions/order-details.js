import {api} from "../../constants/api";
import {fetchWithRefresh, getCookie} from "../utils";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export const getOrderDetails = (ingredientsList, bun) => {
    const ingredients = ingredientsList.map(item => item.data)
    ingredients.unshift(bun)
    ingredients.push(bun)

    return dispatch => {
        dispatch({
            type: GET_ORDER_REQUEST
        })
        fetchWithRefresh(`${api.urls.baseUrl}${api.urls.orders}`, {
            method: 'POST',
            headers: {
                ...api.headers,
                Authorization: `Bearer ${getCookie('accessToken')}`
            },
            body: JSON.stringify({"ingredients": ingredients})
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