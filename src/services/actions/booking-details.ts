import {api} from "../../constants/api";
import {fetchWithRefresh, getCookie} from "../utils";
import {TBookingDetails} from "../reducers/booking-details";
import TIngredient from "../../constants/ingredient";
import {TIngredientsContainer} from "../reducers/burger-constructor";
import {createAsyncThunk} from "@reduxjs/toolkit";

type TGetBookingDetails = {
    ingredientsList: TIngredientsContainer[];
    bun: TIngredient | null;
}

export const getBookingDetails = createAsyncThunk<TBookingDetails, TGetBookingDetails, { rejectValue: number }>(
    'bookingDetails/getBookingDetails',
    async ({ingredientsList, bun}, {rejectWithValue}) => {
        const ingredients = ingredientsList.map(item => item.data)
        if (bun) {
            ingredients.unshift(bun)
            ingredients.push(bun)
        }
        const response = await fetchWithRefresh(`${api.urls.baseUrl}${api.urls.orders}`, {
            method: 'POST',
            headers: {
                ...api.headers,
                Authorization: `Bearer ${getCookie('accessToken')}`
            },
            body: JSON.stringify({"ingredients": ingredients})
        })
        if (response.ok) {
            return await response.json() as TBookingDetails;
        } else return rejectWithValue(response.status)
    }
)