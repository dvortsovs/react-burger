import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from "../actions/burger-ingredients";


const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsRequestFailed: false
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsRequestFailed: false,
                ingredients: [...state.ingredients, ...action.ingredients]
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredients: [],
                ingredientsRequestFailed: true,
                ingredientsRequest: false
            }
        }
        default: {
            return state
        }
    }
}