import React, {useState} from 'react';
import {NavLink, Outlet} from "react-router-dom";
import profileLayoutStyles from './profile-layout.module.css'

const profileCaption = 'В этом разделе вы можете изменить свои персональные данные';
const ordersCaption = 'В этом разделе вы можете просмотреть свою историю заказов';

export default function ProfileLayout() {
    const [caption, setCaption] = useState(profileCaption);

    return (
        <section className={`${profileLayoutStyles.main}`}>
            <div>
                <nav className={`mr-15`}>
                    <ul className={`${profileLayoutStyles.list}`}>
                        <li className={`${profileLayoutStyles.item}`}>
                            <NavLink onClick={() => setCaption(profileCaption)} to={''} end
                                     className={({isActive}) => isActive
                                         ? `${profileLayoutStyles.link} text text_type_main-medium text_color_primary`
                                         : `${profileLayoutStyles.link} text text_type_main-medium text_color_inactive`}>
                                Профиль</NavLink>
                        </li>
                        <li className={`${profileLayoutStyles.item}`}>
                            <NavLink to={'orders'} onClick={() => setCaption(ordersCaption)}
                                     className={({isActive}) => isActive
                                         ? `${profileLayoutStyles.link} text text_type_main-medium text_color_primary`
                                         : `${profileLayoutStyles.link} text text_type_main-medium text_color_inactive`}>
                                История заказов</NavLink>
                        </li>
                        <li className={`${profileLayoutStyles.item}`}>
                            <NavLink to={'logout'} onClick={() => setCaption('')}
                                     className={({isActive}) => isActive
                                         ? `${profileLayoutStyles.link} text text_type_main-medium text_color_primary`
                                         : `${profileLayoutStyles.link} text text_type_main-medium text_color_inactive`}>
                                Выход</NavLink>
                        </li>
                    </ul>
                </nav>
                <p className={`${profileLayoutStyles.caption} mt-20 text text_type_main-default text_color_inactive`}>{caption}</p>
            </div>
            <Outlet />
        </section>
    )
}