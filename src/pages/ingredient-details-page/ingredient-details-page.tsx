import React, {useEffect} from 'react';
import ingredientDetailsPageStyles from './ingredient-details-page.module.css'
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {useParams} from "react-router-dom";
import {closeIngredientDetails, openIngredientDetails} from "../../services/reducers/ingredient-details";
import {useAppDispatch, useAppSelector} from "../../services/hooks";

export default function IngredientDetailsPage() {
    const {ingredients} = useAppSelector(state => state.ingredientsList);
    const {id} = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const ingredient = ingredients.find((item) => item._id === id)
        if (ingredient)
            dispatch(openIngredientDetails(ingredient))
        return () => {
            dispatch(closeIngredientDetails())
        }
    })

    return (
        <section className={ingredientDetailsPageStyles.main}>
            <IngredientDetails/>
        </section>
    )
}