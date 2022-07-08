import {createSlice} from "@reduxjs/toolkit";

const ingredientsReducer = createSlice({
    name: 'ingredientsList',
    initialState: {
        ingredients: [],
        ingredientsRequest: false,
        ingredientsRequestFailed: false
    },
    reducers: {
        ingredientsRequest(state) {
            state.ingredientsRequest = true
        },
        ingredientsSuccess(state, action) {
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