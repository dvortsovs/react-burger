import {configureStore} from "@reduxjs/toolkit";
import ingredientsReducer from "./burger-ingredients";
import burgerConstructorReducer from "./burger-constructor";
import ingredientDetailsReducer from "./ingredient-details";
import bookingDetailsReducer from "./booking-details";
import authReducer from "./auth-provider";
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
import socketMiddleware from "../middleware/socket-middleware";
import {api} from "../../constants/api";

const wsActions = {
    wsInit: 'wsReducer/wsConnectionStart',
    wsClose: wsConnectionClientClosed,
    onOpen: wsConnectionSuccess,
    onClose: wsConnectionClosed,
    onError: wsConnectionError,
    onMessage: wsConnectionGetMessage
};

const wsWithAuthActions = {
    wsInit: 'wsReducer/wsAuthConnectionStart',
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
        ws: wsReducer,
        feedDetails: feedDetailsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: <any>[...Object.values(wsActions), ...Object.values(wsWithAuthActions)]
        }
    }).concat(socketMiddleware(`${api.urls.wsUrl}${api.urls.allOrders}`, wsActions),
        socketMiddleware(`${api.urls.wsUrl}${api.urls.orders}`, wsWithAuthActions)),
    devTools: true
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
