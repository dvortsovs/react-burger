import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TIngredient from "../../constants/ingredient";

export type TIngredientsContainer = {
    data: TIngredient;
    id: number
}

type TBurgerConstructorState = {
    bun: TIngredient | null;
    ingredients: TIngredientsContainer[];
    counter: number;
}

const initialState: TBurgerConstructorState = {
    bun: null,
    ingredients: [],
    counter: 0
}

const burgerConstructorReducer = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        resetConstructorState(state) {
            state.ingredients = []
            state.bun = burgerConstructorReducer.getInitialState().bun
        },
        replaceIngredient(state, action: PayloadAction<TIngredientsContainer[]>) {
            state.ingredients = action.payload
        },
        addIngredients(state, action: PayloadAction<TIngredientsContainer>) {
            state.ingredients.push(action.payload)
            state.counter++
        },
        removeIngredient(state, action: PayloadAction<number>) {
            state.ingredients = [...state.ingredients.filter(
                (item: TIngredientsContainer, index: number) => index !== action.payload
            )]
        },
        addBun(state, action: PayloadAction<TIngredient>) {
            state.bun = {...action.payload}
        }
    }
})

export default burgerConstructorReducer.reducer
export const {
    addBun,
    addIngredients,
    replaceIngredient,
    removeIngredient,
    resetConstructorState
} = burgerConstructorReducer.actions