import React, {useEffect} from 'react';
import ordersPageStyles from './orders-page.module.css'
import OrderCard from "../../components/order-card/order-card";
import {
    WS_AUTH_CONNECTION_START,
} from "../../services/actions/web-socket";
import {getCookie} from "../../services/utils";
import Loader from "../../components/loader/loader";
import {wsAuthConnectionClientClosed} from "../../services/reducers/web-socket";
import {useAppDispatch, useAppSelector} from "../../services/hooks";

const OrdersPage = () => {
    const dispatch = useAppDispatch();
    const {messages} = useAppSelector(state => state.ws)

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
                dispatch(wsAuthConnectionClientClosed())
            }
        )
    }, [dispatch])
    if (messages) {
        if (messages.success) {
            return (
                <section className={`${ordersPageStyles.main}`}>
                    <ul className={`${ordersPageStyles.orders}`}>
                        {
                            messages.orders.map((order, index) => {
                                return (
                                    <li key={index} className={`${ordersPageStyles.order}`}>
                                        <OrderCard withStatus={true} order={order}
                                                   to={`/profile/orders/${order.number}`}/>
                                    </li>
                                )
                            }).reverse()
                        }
                    </ul>
                </section>
            )
        } else refreshSocketConnection()
    } else return <Loader stateDone={!messages}/>
    return null
}

export default OrdersPage