import React from 'react';
import ingredientListStyle from './ingredient-list.module.css'
import IngredientCard from "../ingredient-card/ingredient-card";
import {useAppSelector} from "../../services/hooks";
import TIngredient from "../../constants/ingredient";

interface IIngredientListProps {
    type: string;
    title: string;
}

const IngredientList = React.forwardRef<HTMLElement, IIngredientListProps>(({type, title}, ref) => {
    const ingredients = useAppSelector(state => state.ingredientsList.ingredients)
    return (
        <article ref={ref}>
            <h2 className={`mt-10 mb-6 text text_type_main-medium`}>{title}</h2>
            <ul className={`${ingredientListStyle.list} ml-4 mr-4`}>
                {ingredients.map((ingredient: TIngredient) => {
                    if (ingredient.type === type) {
                        return <IngredientCard ingredient={ingredient}
                                               key={ingredient._id}/>
                    } else return null
                })}
            </ul>
        </article>
    )
})

export default IngredientList