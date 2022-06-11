import React from 'react';
import orderListStyles from './order-list.module.css'
import OrderCard from "../order-card/order-card";

export default function OrderList() {
    return (
            <ul className={`${orderListStyles.list}`}>
                <li className={`${orderListStyles.item}`}>
                    <OrderCard />
                    <OrderCard /><OrderCard />
                    <OrderCard />
                    <OrderCard /><OrderCard />



                </li>
            </ul>
    )
}