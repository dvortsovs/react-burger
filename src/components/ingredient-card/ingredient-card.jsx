import React from 'react';
import ingredient from "../../constants/ingredient";
import ingredientCardStyle from './ingredient-card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from "react-redux";
import {OPEN_DETAILS_MODAL} from "../../services/actions/ingredient-details";
import {useDrag} from "react-dnd";

function IngredientCard({ingredient}) {
    const [{}, dragRef] = useDrag({
        type: 'ingredient',
        id: ingredient._id
    })
    const dispatch = useDispatch();
    const openDetails = (ingredient) => {
        dispatch({
            type: OPEN_DETAILS_MODAL,
            ingredient: ingredient
        })
    }
    return (
        <li ref={dragRef} className={`${ingredientCardStyle.card}`} onClick={() => {
            openDetails(ingredient)
        }}>
            <img className={`ml-4 mr-4`} src={ingredient.image} alt={ingredient.name}/>
            <Counter count={1}/>
            <div className={`${ingredientCardStyle.price} mt-1 `}>
                <p className={`mr-2 text text_type_digits-default`}>{ingredient.price}</p>
                <CurrencyIcon type={"primary"}/>
            </div>
            <p className={`text text_type_main-default mt-1`}>{ingredient.name}</p>
        </li>
    )
}

IngredientCard.propTypes = {
    ingredient: ingredient.isRequired,
}

export default IngredientCard