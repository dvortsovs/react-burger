import React, {useMemo} from 'react';
import feedDetailsStyles from './feed-details.module.css'
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {defineDay} from "../../services/utils";
import {useAppSelector} from "../../services/hooks";

export default function FeedDetails() {
    const {order} = useAppSelector(state => state.feedDetails)
    const {ingredients} = useAppSelector(state => state.ingredientsList)
    const parsedCreatedDate = order ? new Date(order.createdAt) : null
    const totalPrice = useMemo(() => {
        if (order)
        return order.ingredients.reduce((sum, current) => {
            const price = ingredients.find(item => item._id === current)
            if (price) {
                return price.price + sum
            } else return sum
        }, 0)
    }, [order, ingredients])

    const day = defineDay(parsedCreatedDate)

    const status = order ? order.status === 'done'
        ? 'Выполнен'
        : order.status === 'pending'
            ? 'Готовится'
            : order.status === 'created'
                ? 'Создан'
                : '' : ''

    return (
        <div className={`${feedDetailsStyles.card}`}>
            <p className={`${feedDetailsStyles.id} text text_type_digits-default mb-10`}>#{order ? order.number : ''}</p>
            <p className={`${feedDetailsStyles.title} text text_type_main-medium mb-3`}>{order ? order.name : ''}</p>
            <p className={`${feedDetailsStyles.success} text text_type_main-default mb-15`}>{status}</p>
            <p className={`text text_type_main-medium mb-6`}>Состав:</p>
            <ul className={`${feedDetailsStyles.list} mb-10`}>
                {order ? order.ingredients.map((ingredient, index) => {
                    return (
                        <li key={index} className={`${feedDetailsStyles.item} mb-4`}>
                            <IngredientIcon
                                styles={{marginRight: '16px'}}
                                src={`${ingredients.find(item => item._id === ingredient)?.image}`}/>
                            <p className={`${feedDetailsStyles.name} text text_type_main-default`}>
                                {ingredients.find(item => item._id === ingredient)?.name}
                            </p>
                            <div className={`${feedDetailsStyles.price} mr-6`}>
                                <p className={`text text_type_digits-default mr-2`}>
                                    {`${
                                        order.ingredients.filter(item => item === ingredient).length
                                    } x ${
                                        ingredients.find(item => item._id === ingredient)?.price
                                    }`}
                                </p>
                                <CurrencyIcon type={"primary"}/></div>
                        </li>
                    )
                }) : null}
            </ul>
            <div className={`${feedDetailsStyles.total}`}>
                <p className={`text text_type_main-default text_color_inactive`}>
                    {`${day}, ${
                        parsedCreatedDate ? parsedCreatedDate.getHours() : ''
                    }:${parsedCreatedDate ? parsedCreatedDate.getMinutes() : ''} i-GMT+3`}
                </p>
                <div className={`${feedDetailsStyles.price}`}><p
                    className={`text text_type_digits-default mr-2`}>{totalPrice}</p><CurrencyIcon type={"primary"}/>
                </div>
            </div>
        </div>
    )
}