import React from 'react';
import orderListStyles from './order-list.module.css'
import OrderCard from "../order-card/order-card";

export default function OrderList({to}) {
    return (
            <ul className={`${orderListStyles.list}`}>
                <li className={`${orderListStyles.item}`}>
                    <OrderCard to={to} />
                    <OrderCard to={to} /><OrderCard to={to} />
                    <OrderCard to={to} />
                    <OrderCard to={to} /><OrderCard to={to} />



                </li>
            </ul>
    )
}