import {
    OPEN_DETAILS,
    CLOSE_DETAILS
} from "../actions/ingredient-details";

const initialState = {
    ingredientDetails: {}
}

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLOSE_DETAILS: {
            return {
                ...state,
                ingredientDetails: {}
            }
        }
        case OPEN_DETAILS: {
            return {
                ...state,
                ingredientDetails: {...action.ingredient}
            }
        }
        default: {
            return state
        }
    }
}