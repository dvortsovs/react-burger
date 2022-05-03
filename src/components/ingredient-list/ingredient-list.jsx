import React from 'react';
import ingredientListStyle from './ingredient-list.module.css'
import IngredientCard from "../ingredient-card/ingredient-card";
import {useSelector} from "react-redux";
import ingredientListType from "../../constants/ingredientListType";


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
    type: ingredientListType.isRequired,
}

export default IngredientList