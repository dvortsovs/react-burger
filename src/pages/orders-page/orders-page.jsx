import React from 'react';
import ordersPageStyles from './orders-page.module.css'
import OrderList from "../../components/order-list/order-list";

export default function OrdersPage() {
    return (
        <section className={`${ordersPageStyles.main}`}>
            <OrderList to={'123'} />
        </section>
    )
}