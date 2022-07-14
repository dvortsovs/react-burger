import React, {CSSProperties, FC} from 'react';
import ingredientIconStyles from './ingredient-icon.module.css'

interface IIngredientIconProps {
    src: string;
    styles: CSSProperties;
    background?: number;
}

const IngredientIcon: FC<IIngredientIconProps> = ({src, styles, background = 0}) => {

    return (
        <div
            style={{...styles, backgroundImage: `url("${src}")`}}
            className={`${ingredientIconStyles.container} text text_type_digits-default`}>
            {background ? `+${background}` : ''}
        </div>
    )
}

export default IngredientIcon