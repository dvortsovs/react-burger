import React from 'react';
import ingredientListStyle from './ingredient-list.module.css'
import IngredientCard from "../ingredient-card/ingredient-card";

function IngredientList({data, type}) {
    return(
        <article>
            <h2 className={`mt-10 mb-6 text text_type_main-medium`}>{type.title}</h2>
            <ul className={`${ingredientListStyle.list} ml-4 mr-4`}>
                {data.map((ingredient) => {
                    if (ingredient.type === type.type) {
                        return <IngredientCard ingredient={ingredient} />
                    } else return null
                })}
            </ul>
        </article>
    )
}

export default IngredientList