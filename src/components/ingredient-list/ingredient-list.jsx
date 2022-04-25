import React from 'react';
import PropTypes from 'prop-types';
import ingredientListStyle from './ingredient-list.module.css'
import IngredientCard from "../ingredient-card/ingredient-card";
import {useSelector} from "react-redux";


const IngredientList = React.forwardRef(({type}, ref) => {
    const ingredients = useSelector(state => state.ingredientsList.ingredients)
    return (
        <article ref={ref}>
            <h2 className={`mt-10 mb-6 text text_type_main-medium`}>{type.title}</h2>
            <ul className={`${ingredientListStyle.list} ml-4 mr-4`}>
                {ingredients.map((ingredient) => {
                    if (ingredient.type === type.type) {
                        return <IngredientCard ingredient={ingredient}
                                               key={ingredient._id}/>
                    } else return null
                })}
            </ul>
        </article>
    )
})

IngredientList.propTypes = {
    type: PropTypes.objectOf(PropTypes.string),
}

export default IngredientList