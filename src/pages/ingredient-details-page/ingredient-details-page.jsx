import React, {useEffect} from 'react';
import ingredientDetailsPageStyles from './ingredient-details-page.module.css'
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {closeIngredientDetails, openIngredientDetails} from "../../services/reducers/ingredient-details";

export default function IngredientDetailsPage() {
    const {ingredients} = useSelector(state => state.ingredientsList)
    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(openIngredientDetails(ingredients.find((item) => item._id === id)))
        return () => {
            dispatch(closeIngredientDetails())
        }
    })

    return (
        <section className={ingredientDetailsPageStyles.main}>
            <IngredientDetails />
        </section>
    )
}