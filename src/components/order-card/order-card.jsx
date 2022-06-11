import React from 'react';
import orderCardStyles from './order-card.module.css'
import {Link} from "react-router-dom";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientIcon from "../ingredient-icon/ingredient-icon";

export default function OrderCard() {
    return (
        <Link to='/' className={`${orderCardStyles.container} p-6 mb-4`}>
            <p className={`text text_type_digits-default`}>#123151</p>
            <p className={`${orderCardStyles.time} text text_type_main-default text_color_inactive`}>
                Сегодня, 16:20 i-GMT+3
            </p>
            <h3 className={`${orderCardStyles.title} text text_type_main-medium`}>
                Death Star Starship Main бургер
            </h3>
            <figure className={`${orderCardStyles.figure}`}>
                <IngredientIcon alt={``} src={`https://code.s3.yandex.net/react/code/bun-02.png`} styles={{zIndex: '4'}}/>
                <IngredientIcon alt={``} src={`https://code.s3.yandex.net/react/code/bun-02.png`} styles={{marginLeft: '-16px', zIndex: '3'}}/>
                <IngredientIcon alt={``} src={`https://code.s3.yandex.net/react/code/bun-02.png`} styles={{marginLeft: '-16px', zIndex: '2'}}/>
                <IngredientIcon alt={``} src={`https://code.s3.yandex.net/react/code/bun-02.png`} styles={{marginLeft: '-16px', zIndex: '1'}}/>
            </figure>
            <div className={`${orderCardStyles.price}`}>
                <p className={`text text_type_digits-default mr-2`}>
                    123
                </p>
                <CurrencyIcon type={"primary"} />
            </div>
        </Link>
    )
}