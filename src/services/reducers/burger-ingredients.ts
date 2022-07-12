import {AnyAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import TIngredient from "../../constants/ingredient";
import {getIngredients} from "../actions/burger-ingredients";

type TIngredientsListState = {
    ingredients: TIngredient[];
    ingredientsRequest: boolean;
    ingredientsRequestFailed: boolean;
    errorStatus: number | null;
}

const initialState: TIngredientsListState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsRequestFailed: false,
    errorStatus: null
}

const ingredientsReducer = createSlice({
    name: 'ingredientsList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.ingredientsRequest = true;
            })
            .addCase(getIngredients.fulfilled, (state, action) => {
                state.ingredientsRequest = false;
                state.ingredientsRequestFailed = false;
                state.errorStatus = null;
                state.ingredients = action.payload;
            })
            .addMatcher(isRequestError, (state, action: PayloadAction<number>) => {
                state.ingredientsRequestFailed = true;
                state.ingredientsRequest = false;
                state.errorStatus = action.payload;
            })
    }
})

const isRequestError = (action: AnyAction) => {
    return action.type.endsWith('rejected')
}

export default ingredientsReducer.reducer