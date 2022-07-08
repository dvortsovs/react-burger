import {configureStore} from "@reduxjs/toolkit";
import ingredientsReducer from "./burger-ingredients";
import burgerConstructorReducer from "./burger-constructor";
import ingredientDetailsReducer from "./ingredient-details";
import bookingDetailsReducer from "./booking-details";
import authReducer from "./auth-provider";
import apiRequestsReducer from "./api-requests"
import wsReducer, {
    wsAuthConnectionClientClosed,
    wsAuthConnectionClosed,
    wsAuthConnectionError,
    wsAuthConnectionGetMessage,
    wsAuthConnectionSuccess,
    wsConnectionClientClosed,
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionGetMessage,
    wsConnectionSuccess
} from "./web-socket";
import feedDetailsReducer from "./feed-details";
import {
    WS_CONNECTION_START,
    WS_SEND_MESSAGE,
    WS_AUTH_CONNECTION_START,
    WS_AUTH_SEND_MESSAGE,
} from "../actions/web-socket";
import socketMiddleware from "../middleware/socket-middleware";
import {api} from "../../constants/api";

const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    wsClose: wsConnectionClientClosed,
    onOpen: wsConnectionSuccess,
    onClose: wsConnectionClosed,
    onError: wsConnectionError,
    onMessage: wsConnectionGetMessage
};

const wsWithAuthActions = {
    wsInit: WS_AUTH_CONNECTION_START,
    wsSendMessage: WS_AUTH_SEND_MESSAGE,
    wsClose: wsAuthConnectionClientClosed,
    onOpen: wsAuthConnectionSuccess,
    onClose: wsAuthConnectionClosed,
    onError: wsAuthConnectionError,
    onMessage: wsAuthConnectionGetMessage
};

export const store = configureStore({
    reducer: {
        ingredientsList: ingredientsReducer,
        constructorList: burgerConstructorReducer,
        details: ingredientDetailsReducer,
        booking: bookingDetailsReducer,
        auth: authReducer,
        apiRequests: apiRequestsReducer,
        ws: wsReducer,
        feedDetails: feedDetailsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [...Object.values(wsActions), ...Object.values(wsWithAuthActions)]
        }
    }).concat(socketMiddleware(`${api.urls.wsUrl}${api.urls.allOrders}`, wsActions),
        socketMiddleware(`${api.urls.wsUrl}${api.urls.orders}`, wsWithAuthActions)),
    devTools: true
});

