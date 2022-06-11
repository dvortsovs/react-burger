import React from 'react';
import feedPageStyles from './feed-page.module.css'
import OrderList from "../../components/order-list/order-list";

export default function FeedPage() {
    const arr = []

    for (let i = 0; i < 1; i++) {
        arr.push(i)
    }

    return (
        <div className={`${feedPageStyles.main}`}>
            <h2 className={`text text_type_main-large mb-5`}>Лента заказов</h2>
            <div className={`${feedPageStyles.container}`}>
                <section>
                    <OrderList/>
                </section>
                <section className={`${feedPageStyles.digits}`}>
                    <div className={`${feedPageStyles.table}`}>
                        <div className={feedPageStyles.column}>
                            <p className={`text text_type_main-medium mb-6`}>Готовы:</p>
                            <ul className={`${feedPageStyles.list}`}>
                                {arr.map(() => <li
                                    className={`${feedPageStyles.success} text text_type_digits-default `}>666666</li>)}
                            </ul>
                        </div>
                        <div className={feedPageStyles.column}>
                            <p className={`text text_type_main-medium mb-6`}>В работе:</p>
                            <ul className={`${feedPageStyles.list}`}>
                                {arr.map(() => <li className={`text text_type_digits-default `}>666666</li>)}
                            </ul>
                        </div>
                    </div>
                    <p className={`text text_type_main-medium mt-15`}>Выполнено за все время:</p>
                    <p className={`${feedPageStyles.glow} text text_type_digits-large`}>28 752</p>
                    <p className={`text text_type_main-medium mt-15`}>Выполнено за сегодня:</p>
                    <p className={`${feedPageStyles.glow} text text_type_digits-large`}>138</p>
                </section>
            </div>
        </div>
    )
}