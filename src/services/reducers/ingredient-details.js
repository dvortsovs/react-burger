import {OPEN_DETAILS_MODAL, CLOSE_DETAILS_MODAL} from "../actions/ingredient-details";

const initialState = {
    ingredientDetails: {},
    detailsVisible: false
}

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DETAILS_MODAL: {
            return {
                ...state,
                ingredientDetails: {...action.ingredient},
                detailsVisible: true
            }
        }
        case CLOSE_DETAILS_MODAL: {
            return {
                ...state,
                detailsVisible: false,
                ingredientDetails: {}
            }
        }
        default: {
            return state
        }
    }
}