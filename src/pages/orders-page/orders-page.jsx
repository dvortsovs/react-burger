import React, {useEffect} from 'react';
import ordersPageStyles from './orders-page.module.css'
import OrderCard from "../../components/order-card/order-card";
import {useDispatch, useSelector} from "react-redux";
import {
    WS_AUTH_CONNECTION_CLIENT_CLOSED,
    WS_AUTH_CONNECTION_START,
} from "../../services/actions/web-socket";
import {getCookie} from "../../services/utils";
import Loader from "../../components/loader/loader";

export default function OrdersPage() {
    const dispatch = useDispatch();
    const {messages} = useSelector(state => state.ws)

    const refreshSocketConnection = () => {
        dispatch({
            type: WS_AUTH_CONNECTION_START,
            payload: `?token=${getCookie('accessToken')}`
        })
    }

    useEffect(() => {
        dispatch({
            type: WS_AUTH_CONNECTION_START,
            payload: `?token=${getCookie('accessToken')}`
        })
        return (() => {
                dispatch({
                    type: WS_AUTH_CONNECTION_CLIENT_CLOSED
                })
            }
        )
    }, [dispatch])
    if (messages) {
        if (messages.success) {
            return (//todo fail when reload page
                    <section className={`${ordersPageStyles.main}`}>
                        <ul className={`${ordersPageStyles.orders}`}>
                            {
                                messages.orders.map((order, index) => {
                                    return (
                                        <li key={index} className={`${ordersPageStyles.order}`}>
                                            <OrderCard withStatus={true} order={order} to={`/profile/orders/${order.number}`}/>
                                        </li>
                                    )
                                }).reverse()
                            }
                        </ul>
                    </section>
            )
        } else refreshSocketConnection()
    } else return <Loader stateDone={!messages}/>
}