import {ADD_INGREDIENT, ADD_BUN, REMOVE_INGREDIENT, UPDATE_TOTAL_PRICE} from "../actions/burger-constructor";

const initialState = {
    bun: {},
    ingredients: [],
    totalPrice: null,
}
export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.ingredient],
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
                totalPrice: state.ingredients.reduce((acc, item) => acc + item.price, 0) + state.bun.price * 2
            }
        }
        default: {
            return state
        }
    }
}