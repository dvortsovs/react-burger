import {
    ADD_INGREDIENT,
    ADD_BUN,
    REMOVE_INGREDIENT,
    UPDATE_TOTAL_PRICE,
    REPLACE_INGREDIENT
} from "../actions/burger-constructor";

const initialState = {
    bun: {},
    ingredients: [],
    totalPrice: null,
    counter: 0
}
export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case REPLACE_INGREDIENT: {
            return {
                ...state,
                ingredients: [...action.ingredients],
            }
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.ingredient],
                counter: state.counter + action.ingredient.length
            }
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients.filter((item, index) => index !== action.index)],
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: {...action.bun}
            }
        }
        case UPDATE_TOTAL_PRICE: {
            return {
                ...state,
                totalPrice: state.ingredients.reduce((acc, item) => acc + item.data.price, 0) + state.bun.price * 2
            }
        }
        default: {
            return state
        }
    }
}