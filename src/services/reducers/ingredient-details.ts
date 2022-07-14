import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TIngredient from "../../constants/ingredient";

type TIngredientDetailsState = {
    ingredientDetails: TIngredient | null;
}

const initialState: TIngredientDetailsState = {
    ingredientDetails: null
}

const ingredientDetailsReducer = createSlice({
    name: 'ingredientDetails',
    initialState,
    reducers: {
        openIngredientDetails(state, action: PayloadAction<TIngredient>) {
            state.ingredientDetails = action.payload
        },
        closeIngredientDetails(state) {
            state.ingredientDetails = null
        }
    }
})

export default ingredientDetailsReducer.reducer
export const {openIngredientDetails, closeIngredientDetails} = ingredientDetailsReducer.actions