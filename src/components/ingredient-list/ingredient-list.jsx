import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import ingredientListStyle from './ingredient-list.module.css'
import {DataContext} from "../../services/data-context";
import IngredientCard from "../ingredient-card/ingredient-card";


function IngredientList({ type, handleModalOpen}) {
    const { data } = useContext(DataContext)
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
    type: PropTypes.objectOf(PropTypes.string),
    handleModalOpen: PropTypes.func.isRequired
}

export default IngredientList