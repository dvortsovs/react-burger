import {api} from "../../constants/api";
import {fetchWithRefresh, getCookie} from "../utils";
import {apiRequest, apiRequestFailed, apiRequestSuccess} from "../reducers/api-requests";
import {bookingSuccess} from "../reducers/booking-details";

export const getBookingDetails = (ingredientsList, bun) => {
    const ingredients = ingredientsList.map(item => item.data)
    ingredients.unshift(bun)
    ingredients.push(bun)

    return dispatch => {
        dispatch(apiRequest())
        fetchWithRefresh(`${api.urls.baseUrl}${api.urls.orders}`, {
            method: 'POST',
            headers: {
                ...api.headers,
                Authorization: `Bearer ${getCookie('accessToken')}`
            },
            body: JSON.stringify({"ingredients": ingredients})
        })
            .then((res) => {
                dispatch(bookingSuccess(res))
                dispatch(apiRequestSuccess())
            })
            .catch((err) => {
                dispatch(apiRequestFailed(err))
            })
    }
}