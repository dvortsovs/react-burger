import React, {useEffect, useState} from 'react';
import ingredient from "../../constants/ingredient";
import ingredientCardStyle from './ingredient-card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {OPEN_DETAILS_MODAL} from "../../services/actions/ingredient-details";
import {useDrag} from "react-dnd";

function IngredientCard({ingredient}) {
    const {ingredients, bun} = useSelector(state => state.constructorList);
    const [count, setCount] = useState(null);

    useEffect(() => {
        ingredient.type === 'bun'
            ? ingredient._id === bun._id
                ? setCount(1)
                : setCount(0)
            :
            setCount(ingredients.reduce((acc, item) => {
                return item._id === ingredient._id
                    ? acc + 1
                    : acc
            }, 0))
    }, [ingredients, bun])

    const [{}, dragRef] = useDrag({
        type: 'ingredient',
        item: {ingredient},
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
            {count ? <Counter count={count}/> : null}
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