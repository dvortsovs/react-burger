import React, {useMemo} from 'react';
import orderCardStyles from './order-card.module.css'
import {Link, useLocation} from "react-router-dom";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import {useDispatch, useSelector} from "react-redux";
import {OPEN_FEED_DETAILS} from "../../services/actions/feed-details";

export default function OrderCard({to, order, withStatus = false}) {
    const {ingredients} = useSelector(state => state.ingredientsList);
    const location = useLocation();
    const dispatch = useDispatch();
    const date = new Date()
    const parsedCreatedDate = new Date(order.createdAt)

    const openDetails = () => {
        dispatch({
            type: OPEN_FEED_DETAILS,
            order: order
        })
    }

    const defineDay = () => {
        const dayDifference = date.getDate() - parsedCreatedDate.getDate()
        if (dayDifference === 0) {
            return 'Сегодня'
        }
        if (dayDifference === 1) {
            return 'Вчера'
        }
        if (dayDifference < 5) {
            return `${dayDifference} дня назад`
        }
        if (5 < dayDifference < 21) {
            return `${dayDifference} дней назад`
        }
    }
    const day = useMemo(() => defineDay(), [date])

    const totalPrice = useMemo(() => {
        return order.ingredients.reduce((sum, current) => {
            return ingredients.find(item => item._id === current).price + sum
        }, 0)
    }, [order.price])

    const status = order.status === 'done'
        ? 'Выполнен'
        : order.status === 'pending'
            ? 'Готовится'
            : order.status === 'created'
                ? 'Создан'
                : ''

    return (
        <Link
            onClick={openDetails}
            state={{background: location, order: order}}
            to={to}
            className={`${orderCardStyles.container} p-6 mb-4`}>
            <p className={`text text_type_digits-default`}>#{order.number}</p>
            <p className={`${orderCardStyles.time} text text_type_main-default text_color_inactive`}>
                {`${day}, ${parsedCreatedDate.getHours()}:${parsedCreatedDate.getMinutes()} i-GMT+3`}
            </p>
            <div className={`${orderCardStyles.box}`}>
                <h3 className={`text text_type_main-medium`}>
                    {order.name}
                </h3>
                {withStatus &&
                    <p className={`${order.status === 'done'
                        ? orderCardStyles.success
                        : ''} text text_type_main-default mt-2`}>
                        {status}
                    </p>
                }
            </div>
            <figure className={`${orderCardStyles.figure}`}>
                {order.ingredients.map((ingredient, index, array) => {
                    if (ingredient !== null) {
                        if (index === 0) {
                            return <IngredientIcon
                                key={index}
                                src={`${ingredients.find(item => item._id === ingredient).image}`}
                                styles={{zIndex: `${array.length}`}}/>
                        }

                        if (index < 6) {
                            if (index > 4) {
                                return <IngredientIcon
                                    background={array.length - (index + 1)}
                                    key={index}
                                    src={`${ingredients.find(item => item._id === ingredient).image}`}
                                    styles={{marginLeft: '-16px', zIndex: `${array.length - index}`}}/>
                            }
                            return <IngredientIcon
                                key={index}
                                src={`${ingredients.find(item => item._id === ingredient).image}`}
                                styles={{marginLeft: '-16px', zIndex: `${array.length - index}`}}/>
                        }
                    }
                    return null
                })}
            </figure>
            <div className={`${orderCardStyles.price}`}>
                <p className={`text text_type_digits-default mr-2`}>
                    {totalPrice}
                </p>
                <CurrencyIcon type={"primary"}/>
            </div>
        </Link>
    )
}