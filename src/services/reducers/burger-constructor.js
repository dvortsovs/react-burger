import {
    ADD_INGREDIENT,
    ADD_BUN,
    REMOVE_INGREDIENT,
    REPLACE_INGREDIENT,
    RESET_CONSTRUCTOR_STATE
} from "../actions/burger-constructor";

const initialState = {
    bun: {
        price: 0
    },
    ingredients: [],
    counter: 0
}
export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_CONSTRUCTOR_STATE: {
            return {
                ...state,
                bun: initialState.bun,
                ingredients: []
            }
        }
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
        default: {
            return state
        }
    }
}