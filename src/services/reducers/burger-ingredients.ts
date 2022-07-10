import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TIngredient from "../../constants/ingredient";

type TIngredientsListState = {
    ingredients: TIngredient[];
    ingredientsRequest: boolean;
    ingredientsRequestFailed: boolean;
}

const initialState: TIngredientsListState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsRequestFailed: false
}

const ingredientsReducer = createSlice({
    name: 'ingredientsList',
    initialState,
    reducers: {
        ingredientsRequest(state) {
            state.ingredientsRequest = true
        },
        ingredientsSuccess(state, action: PayloadAction<TIngredient[]>) {
            state.ingredients = action.payload
            state.ingredientsRequest = false
            state.ingredientsRequestFailed = false
        },
        ingredientsFailed(state) {
            state.ingredients = []
            state.ingredientsRequest = false
            state.ingredientsRequestFailed = true
        }
    }
})

export default ingredientsReducer.reducer
export const {ingredientsRequest, ingredientsSuccess, ingredientsFailed} = ingredientsReducer.actions