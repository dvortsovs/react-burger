import {createSlice} from "@reduxjs/toolkit";

const ingredientDetailsReducer = createSlice({
    name: 'ingredientDetails',
    initialState: {
        ingredientDetails: {}
    },
    reducers: {
        openIngredientDetails(state, action) {
            state.ingredientDetails = action.payload
        },
        closeIngredientDetails(state) {
            state.ingredientDetails = {}
        }
    }
})

export default ingredientDetailsReducer.reducer
export const {openIngredientDetails, closeIngredientDetails} = ingredientDetailsReducer.actions