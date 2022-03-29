import React from 'react';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientDetailsStyle from './ingredient-details.module.css'

function IngredientDetails({ingredient, handleCloseClick}) {
    return (
        <>
            <div className={`${ingredientDetailsStyle.header}`}>
                <h2 className={`text text_type_main-large`}>Детали ингредиента</h2>
                <button type="button" className={`${ingredientDetailsStyle.close}`} onClick={handleCloseClick}><CloseIcon type={"primary"} /></button>
            </div>
            <div className={`${ingredientDetailsStyle.card} ml-15 mr-15`}>
                <img className={``} src={ingredient.image_large} alt={ingredient.name} />
                <p className={`text text_type_main-medium mt-4`}>{ingredient.name}</p>
                <ul className={`${ingredientDetailsStyle.list} mt-8 mb-5`}>
                    <li className={`${ingredientDetailsStyle.item}`}>
                        <p className={`text text_type_main-default text_color_inactive`}>Калории,ккал</p>
                        <p className={`text text_type_digits-default text_color_inactive mt-2`}>{ingredient.calories}</p>
                    </li>
                    <li className={`${ingredientDetailsStyle.item}`}>
                        <p className={`text text_type_main-default text_color_inactive`}>Белки, г</p>
                        <p className={`text text_type_digits-default text_color_inactive mt-2`}>{ingredient.proteins}</p>
                    </li>
                    <li className={`${ingredientDetailsStyle.item}`}>
                        <p className={`text text_type_main-default text_color_inactive`}>Жиры, г</p>
                        <p className={`text text_type_digits-default text_color_inactive mt-2`}>{ingredient.fat}</p>
                    </li>
                    <li className={`${ingredientDetailsStyle.item}`}>
                        <p className={`text text_type_main-default text_color_inactive`}>Углеводы, г</p>
                        <p className={`text text_type_digits-default text_color_inactive mt-2`}>{ingredient.carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default IngredientDetails