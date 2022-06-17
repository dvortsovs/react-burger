import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {ingredientsReducer} from "./burger-ingredients";
import {burgerConstructorReducer} from "./burger-constructor";
import {ingredientDetailsReducer} from "./ingredient-details";
import {orderDetailsReducer} from "./order-details";
import {authReducer} from "./auth-provider";
import {wsReducer} from "./web-socket";
import {feedDetailsReducer} from "./feed-details";
import {
    WS_GET_MESSAGE,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSED,
    WS_SEND_MESSAGE,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLIENT_CLOSED,
    WS_AUTH_CONNECTION_START,
    WS_AUTH_SEND_MESSAGE,
    WS_AUTH_CONNECTION_CLIENT_CLOSED,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_GET_MESSAGE
} from "../actions/web-socket";
import socketMiddleware from "../middleware/socket-middleware";
import thunk from "redux-thunk";
import {api} from "../../constants/api";

const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    wsClose: WS_CONNECTION_CLIENT_CLOSED,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

const wsWithAuthActions = {
    wsInit: WS_AUTH_CONNECTION_START,
    wsSendMessage: WS_AUTH_SEND_MESSAGE,
    wsClose: WS_AUTH_CONNECTION_CLIENT_CLOSED,
    onOpen: WS_AUTH_CONNECTION_SUCCESS,
    onClose: WS_AUTH_CONNECTION_CLOSED,
    onError: WS_AUTH_CONNECTION_ERROR,
    onMessage: WS_AUTH_GET_MESSAGE
};

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk,
    socketMiddleware(`${api.urls.wsUrl}${api.urls.allOrders}`, wsActions),
    socketMiddleware(`${api.urls.wsUrl}${api.urls.orders}`, wsWithAuthActions)));

const rootReducer = combineReducers({
    ingredientsList: ingredientsReducer,
    constructorList: burgerConstructorReducer,
    details: ingredientDetailsReducer,
    order: orderDetailsReducer,
    auth: authReducer,
    ws: wsReducer,
    feedDetails: feedDetailsReducer
})

export const store = createStore(rootReducer, enhancer);

