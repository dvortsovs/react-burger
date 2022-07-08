import React, {useMemo} from 'react';
import ingredient from "../../constants/ingredient";
import ingredientCardStyle from './ingredient-card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {openIngredientDetails} from "../../services/reducers/ingredient-details";

function IngredientCard({ingredient}) {
    const {ingredients, bun} = useSelector(state => state.constructorList);
    const location = useLocation();

    const count = useMemo(() => {
        if (ingredient.type === 'bun') {
            if (ingredient._id === bun._id) {
                return 1
            } else {
                return 0
            }
        } else {
            return ingredients.reduce((acc, item) => {
                return item.data._id === ingredient._id
                    ? acc + 1
                    : acc
            }, 0)
        }
    }, [ingredients, bun])

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: {ingredient},
    })
    const dispatch = useDispatch();
    const openDetails = (ingredient) => {
        dispatch(openIngredientDetails(ingredient))
    }

    return (
        <Link onClick={() => openDetails(ingredient)}
              state={{background: location, ingredient: ingredient}}
              to={`/ingredients/${ingredient._id}`}
              ref={dragRef}
              className={`${ingredientCardStyle.card}`}>
            <img className={`ml-4 mr-4`} src={ingredient.image} alt={ingredient.name}/>
            {count ? <Counter count={count}/> : null}
            <div className={`${ingredientCardStyle.price} mt-1 `}>
                <p className={`mr-2 text text_type_digits-default`}>{ingredient.price}</p>
                <CurrencyIcon type={"primary"}/>
            </div>
            <p className={`text text_type_main-default mt-1`}>{ingredient.name}</p>
        </Link>
    )
}

IngredientCard.propTypes = {
    ingredient: ingredient.isRequired,
}

export default IngredientCard