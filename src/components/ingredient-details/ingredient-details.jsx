import React from 'react';
import ingredientDetailsStyle from './ingredient-details.module.css'
import {useSelector} from "react-redux";

function IngredientDetails() {
    const {ingredientDetails} = useSelector(state => state.details)
    return (
        <div className={`${ingredientDetailsStyle.card} ml-15 mr-15`}>
            <img src={ingredientDetails.image_large} alt={ingredientDetails.name}/>
            <p className={`text text_type_main-medium mt-4`}>{ingredientDetails.name}</p>
            <ul className={`${ingredientDetailsStyle.list} mt-8 mb-5`}>
                <li className={`${ingredientDetailsStyle.item}`}>
                    <p className={`text text_type_main-default text_color_inactive`}>Калории,ккал</p>
                    <p className={`text text_type_digits-default text_color_inactive mt-2`}>{ingredientDetails.calories}</p>
                </li>
                <li className={`${ingredientDetailsStyle.item}`}>
                    <p className={`text text_type_main-default text_color_inactive`}>Белки, г</p>
                    <p className={`text text_type_digits-default text_color_inactive mt-2`}>{ingredientDetails.proteins}</p>
                </li>
                <li className={`${ingredientDetailsStyle.item}`}>
                    <p className={`text text_type_main-default text_color_inactive`}>Жиры, г</p>
                    <p className={`text text_type_digits-default text_color_inactive mt-2`}>{ingredientDetails.fat}</p>
                </li>
                <li className={`${ingredientDetailsStyle.item}`}>
                    <p className={`text text_type_main-default text_color_inactive`}>Углеводы, г</p>
                    <p className={`text text_type_digits-default text_color_inactive mt-2`}>{ingredientDetails.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}


export default IngredientDetails