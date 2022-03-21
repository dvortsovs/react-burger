import React from 'react';
import ingredientCardStyle from './ingredient-card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientCard({ingredient}) {
    return(
        <li className={`${ingredientCardStyle.card}`} key={ingredient._id}>
            <img className={`ml-4 mr-4`} src={ingredient.image} alt={ingredient.name} />
            <Counter count={1} />
            <div className={`${ingredientCardStyle.price} mt-1 `}>
                <p className={`mr-2 text text_type_digits-default`}>{ingredient.price}</p>
                <CurrencyIcon type={"primary"} />
            </div>
            <p className={`text text_type_main-default mt-1`}>{ingredient.name}</p>
        </li>
    )
}

export default IngredientCard