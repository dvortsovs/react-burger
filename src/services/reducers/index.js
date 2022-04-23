import { combineReducers } from 'redux';
import {ingredientsReducer} from "./burger-ingredients";
import {burgerConstructorReducer} from "./burger-constructor";

export const rootReducer = combineReducers({
    ingredientsList: ingredientsReducer,
    constructorList: burgerConstructorReducer
})