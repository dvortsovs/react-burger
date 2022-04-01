import React from 'react';
import PropTypes from 'prop-types';
import ingredient from "../../constants/ingredient";
import ingredientListStyle from './ingredient-list.module.css'
import IngredientCard from "../ingredient-card/ingredient-card";

function IngredientList({data, type, handleModalOpen}) {
    return (
        <article>
            <h2 className={`mt-10 mb-6 text text_type_main-medium`}>{type.title}</h2>
            <ul className={`${ingredientListStyle.list} ml-4 mr-4`}>
                {data.map((ingredient) => {
                    if (ingredient.type === type.type) {
                        return <IngredientCard handleModalOpen={handleModalOpen} ingredient={ingredient}
                                               key={ingredient._id}/>
                    } else return null
                })}
            </ul>
        </article>
    )
}

IngredientList.propTypes = {
    data: PropTypes.arrayOf(ingredient).isRequired,
    type: PropTypes.objectOf(PropTypes.string),
    handleModalOpen: PropTypes.func.isRequired
}

export default IngredientList