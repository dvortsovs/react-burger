import {api} from "../../constants/api";
import {createAsyncThunk} from "@reduxjs/toolkit";
import TIngredient from "../../constants/ingredient";

type TResponseData = {
    success: boolean;
    data: TIngredient[]
}

export const getIngredients = createAsyncThunk<TIngredient[], undefined, {rejectValue: number}>(
    'ingredientsList/getIngredients',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${api.urls.baseUrl}${api.urls.ingredients}`);
        if (response.ok) {
            const data = await response.json() as TResponseData;
            return data.data;
        } else return rejectWithValue(response.status)
    }
);