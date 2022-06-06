import React, {useEffect} from 'react';
import ingredientDetailsPageStyles from './ingredient-details-page.module.css'
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_DETAILS, OPEN_DETAILS} from "../../services/actions/ingredient-details";

export default function IngredientDetailsPage() {
    const {ingredients} = useSelector(state => state.ingredientsList)
    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: OPEN_DETAILS,
            ingredient: ingredients.find((item) => item._id === id)
        })
        return () => {
            dispatch({
                type: CLOSE_DETAILS,
            })
        }
    })

    return (
        <section className={ingredientDetailsPageStyles.main}>
            <IngredientDetails />
        </section>
    )
}