import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {ingredientsReducer} from "./burger-ingredients";
import {burgerConstructorReducer} from "./burger-constructor";
import {ingredientDetailsReducer} from "./ingredient-details";
import {orderDetailsReducer} from "./order-details";
import {authReducer} from "./auth-provider";
import {registrationReducer} from "./regstration-page";
import {signInReducer} from "./login-page";
import thunk from "redux-thunk";

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const rootReducer = combineReducers({
    ingredientsList: ingredientsReducer,
    constructorList: burgerConstructorReducer,
    details: ingredientDetailsReducer,
    order: orderDetailsReducer,
    auth: authReducer,
    registration: registrationReducer,
    signIn: signInReducer
})

export const store = createStore(rootReducer, enhancer);

