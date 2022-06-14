import React from 'react';
import ingredientIconStyles from './ingredient-icon.module.css'

export default function IngredientIcon({src, styles, background = 0}) {

    return (
        <div
            style={{...styles, backgroundImage: `url("${src}")`}}
            className={`${ingredientIconStyles.container} text text_type_digits-default`}>
            {background ? `+${background}` : ''}
        </div>
    )
}