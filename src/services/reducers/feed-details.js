import {OPEN_FEED_DETAILS, CLOSE_FEED_DETAILS} from "../actions/feed-details";

const initialState = {
    order: null,
    isOpenDetails: false
}

export const feedDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_FEED_DETAILS: {
            return {
                ...state,
                isOpenDetails: true,
                order: {...action.order}
            }
        }
        case CLOSE_FEED_DETAILS: {
            return {
                ...state,
                isOpenDetails: false,
                order: null
            }
        }
        default:
            return state
    }
}