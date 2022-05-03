import {GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLOSE_ORDER_DETAILS} from "../actions/order-details";

const initialState = {
    orderDetails: {},
    orderRequest: false,
    orderRequestFailed: false,
    orderVisible: false
}

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
            }
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderRequestFailed: false,
                orderDetails: {...action.orderDetails},
                orderVisible: true
            }
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderRequestFailed: true,
                orderDetails: {}
            }
        }
        case CLOSE_ORDER_DETAILS: {
            return {
                ...state,
                orderVisible: false,
                orderDetails: {}
            }
        }
        default: {
            return state
        }
    }
}