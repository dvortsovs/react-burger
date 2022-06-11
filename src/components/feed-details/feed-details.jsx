import React from 'react';
import feedDetailsStyles from './feed-details.module.css'
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export default function FeedDetails() {
    const count = 2
    const price = 300
    return (
        <div className={`${feedDetailsStyles.card}`}>
            <p className={`${feedDetailsStyles.id} text text_type_digits-default mb-10`}>#123123</p>
            <p className={`text text_type_main-medium mb-3`}>Black Hole Singularity острый бургер</p>
            <p className={`${feedDetailsStyles.success} text text_type_main-default mb-15`}>Выполнен</p>
            <p className={`text text_type_main-medium mb-6`}>Состав:</p>
            <ul className={`${feedDetailsStyles.list} mb-10`}>
                <li className={`${feedDetailsStyles.item} mb-4`}>
                    <IngredientIcon styles={{marginRight: '16px'}} src={'https://code.s3.yandex.net/react/code/bun-02.png'} />
                    <p className={`${feedDetailsStyles.name} text text_type_main-default`}>Флюоресцентная булка R2-D3</p>
                    <div className={`${feedDetailsStyles.price} mr-6`}><p className={`text text_type_digits-default mr-2`}>{`${count} x ${price}`}</p><CurrencyIcon type={"primary"}/></div>
                </li>
            </ul>
            <div className={`${feedDetailsStyles.total}`}>
                <p className={`text text_type_main-default text_color_inactive`}>Вчера, 13:50 i-GMT+3</p>
                <div className={`${feedDetailsStyles.price}`}><p className={`text text_type_digits-default mr-2`}>{`${count} x ${price}`}</p><CurrencyIcon type={"primary"}/></div>
            </div>
        </div>
    )
}