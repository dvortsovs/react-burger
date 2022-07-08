import {createSlice} from "@reduxjs/toolkit";

const burgerConstructorReducer = createSlice({
    name: 'burgerConstructor',
    initialState: {
        bun: {
            price: 0
        },
        ingredients: [],
        counter: 0
    },
    reducers: {
        resetConstructorState(state) {
            state.ingredients = []
            state.bun = burgerConstructorReducer.getInitialState().bun
        },
        replaceIngredient(state, action) {
            state.ingredients = [...action.payload]
        },
        addIngredients(state, action) {
            state.ingredients.push(action.payload)
            state.counter++
        },
        removeIngredient(state, action) {
            state.ingredients = [...state.ingredients.filter((item, index) => index !== action.payload)]
        },
        addBun(state, action) {
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