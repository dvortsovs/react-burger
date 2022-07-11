import React, {useEffect} from 'react';
import feedPageStyles from './feed-page.module.css'
import {
    WS_CONNECTION_START
} from "../../services/actions/web-socket";
import OrderCard from "../../components/order-card/order-card";
import Loader from "../../components/loader/loader";
import {wsConnectionClientClosed} from "../../services/reducers/web-socket";
import {useAppDispatch, useAppSelector} from "../../services/hooks";


export default function FeedPage() {
    const dispatch = useAppDispatch();
    const {messages} = useAppSelector(state => state.ws)

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START
        })
        return (() => {
                dispatch(wsConnectionClientClosed())
            }
        )
    }, [dispatch])

    return (messages ?
            <div className={`${feedPageStyles.main}`}>
                <h2 className={`text text_type_main-large mb-5`}>Лента заказов</h2>
                <div className={`${feedPageStyles.container}`}>
                    <section>
                        <ul className={`${feedPageStyles.orders}`}>
                            {
                                messages.orders.map((order, index) => {
                                    return (
                                        <li key={index} className={`${feedPageStyles.order}`}>
                                            <OrderCard order={order} to={`/feed/${order.number}`}/>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                    <section className={`${feedPageStyles.digits}`}>
                        <div className={`${feedPageStyles.table}`}>
                            <div className={feedPageStyles.column}>
                                <p className={`text text_type_main-medium mb-6`}>Готовы:</p>
                                <ul className={`${feedPageStyles.list}`}>
                                    {
                                        messages.orders.map((order, index) => {
                                            if (order.status === 'done' && index < 10) {
                                                return <li
                                                    key={index}
                                                    className={`${feedPageStyles.success} text text_type_digits-default `}>
                                                    {order.number}
                                                </li>
                                            } else return null
                                        })
                                    }
                                </ul>
                            </div>
                            <div className={feedPageStyles.column}>
                                <p className={`text text_type_main-medium mb-6`}>В работе:</p>
                                <ul className={`${feedPageStyles.list}`}>
                                    {
                                        messages.orders.map((order, index) => {
                                            if (order.status === 'pending' && index < 10) {
                                                return <li
                                                    key={index}
                                                    className={`text text_type_digits-default `}>
                                                    {order.number}
                                                </li>
                                            } else return null
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <p className={`text text_type_main-medium mt-15`}>Выполнено за все время:</p>
                        <p className={`${feedPageStyles.glow} text text_type_digits-large`}>{messages.total}</p>
                        <p className={`text text_type_main-medium mt-15`}>Выполнено за сегодня:</p>
                        <p className={`${feedPageStyles.glow} text text_type_digits-large`}>{messages.totalToday}</p>
                    </section>
                </div>
            </div> : <Loader stateDone={!messages}/>
    )
}