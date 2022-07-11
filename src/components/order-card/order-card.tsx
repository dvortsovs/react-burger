import React, {FC, useMemo} from 'react';
import orderCardStyles from './order-card.module.css'
import {Link, useLocation} from "react-router-dom";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import {defineDay} from "../../services/utils";
import {openFeedDetails, TFeedDetailsOrder} from "../../services/reducers/feed-details";
import {useAppDispatch, useAppSelector} from "../../services/hooks";

interface IOrderCardProps {
    to: string;
    order: TFeedDetailsOrder;
    withStatus?: boolean;
}

const OrderCard: FC<IOrderCardProps> = ({to, order, withStatus = false}) => {
    const {ingredients} = useAppSelector(state => state.ingredientsList);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const parsedCreatedDate = new Date(order.createdAt)

    const openDetails = () => {
        dispatch(openFeedDetails(order))
    }

    const day = defineDay(parsedCreatedDate)

    const totalPrice = useMemo(() => {
        return order.ingredients.reduce((sum, current) => {
            const price = ingredients.find(item => item._id === current)
            if (price) {
                return price.price + sum
            } else return sum
        }, 0)
    }, [order, ingredients])

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
                                src={`${ingredients.find(item => item._id === ingredient)?.image}`}
                                styles={{zIndex: `${array.length}`}}/>
                        }

                        if (index < 6) {
                            if (index > 4) {
                                return <IngredientIcon
                                    background={array.length - (index + 1)}
                                    key={index}
                                    src={`${ingredients.find(item => item._id === ingredient)?.image}`}
                                    styles={{marginLeft: '-16px', zIndex: `${array.length - index}`}}/>
                            }
                            return <IngredientIcon
                                key={index}
                                src={`${ingredients.find(item => item._id === ingredient)?.image}`}
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

export default OrderCard