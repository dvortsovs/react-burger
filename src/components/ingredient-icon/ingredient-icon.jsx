import React from 'react';
import ingredientIconStyles from './ingredient-icon.module.css'

export default function IngredientIcon({src, alt, styles}) {

    return (
        <img style={styles} className={`${ingredientIconStyles.image}`} src={src} alt={alt}/>
    )
}