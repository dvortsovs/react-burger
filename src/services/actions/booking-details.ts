import {api} from "../../constants/api";
import {fetchWithRefresh, getCookie} from "../utils";
import {apiRequest, apiRequestFailed, apiRequestSuccess} from "../reducers/api-requests";
import {bookingSuccess} from "../reducers/booking-details";
import TIngredient from "../../constants/ingredient";
import {TIngredientsContainer} from "../reducers/burger-constructor";
import {TAppDispatch} from "../reducers";

export const getBookingDetails = (ingredientsList: TIngredientsContainer[], bun: TIngredient | null) => {
    const ingredients = ingredientsList.map(item => item.data)
    if (bun) {
        ingredients.unshift(bun)
        ingredients.push(bun)
    }

    return (dispatch: TAppDispatch) => {
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