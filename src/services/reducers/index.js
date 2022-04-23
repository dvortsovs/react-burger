import {combineReducers} from 'redux';
import {ingredientsReducer} from "./burger-ingredients";
import {burgerConstructorReducer} from "./burger-constructor";
import {ingredientDetailsReducer} from "./ingredient-details";
import {orderDetailsReducer} from "./order-details";

export const rootReducer = combineReducers({
    ingredientsList: ingredientsReducer,
    constructorList: burgerConstructorReducer,
    details: ingredientDetailsReducer,
    order: orderDetailsReducer
})