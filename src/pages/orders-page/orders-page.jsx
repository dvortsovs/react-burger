import React, {useEffect} from 'react';
import ordersPageStyles from './orders-page.module.css'
import OrderCard from "../../components/order-card/order-card";
import {useDispatch, useSelector} from "react-redux";
import {WS_CONNECTION_CLIENT_CLOSED, WS_CONNECTION_START} from "../../services/actions/web-socket";

export default function OrdersPage() {
    const dispatch = useDispatch();
    const {messages} = useSelector(state => state.ws)

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START
        })
        return (() => {
                dispatch({
                    type: WS_CONNECTION_CLIENT_CLOSED
                })
            }
        )
    }, [dispatch])

    return (
        <section className={`${ordersPageStyles.main}`}>
            <ul className={`${ordersPageStyles.orders}`}>
                {
                    messages.orders.map((order, index) => {
                        return (
                            <li key={index} className={`${ordersPageStyles.order}`}>
                                <OrderCard order={order} to={`/feed/${order.number}`}/>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}