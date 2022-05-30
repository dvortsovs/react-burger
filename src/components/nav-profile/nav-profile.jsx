import React from 'react';
import {NavLink} from "react-router-dom";
import navProfileStyles from './nav-profile.module.css'

export default function NavProfile({caption}) {
    return (
        <div>
            <nav className={`mr-15`}>
                <ul className={`${navProfileStyles.list}`}>
                    <li className={`${navProfileStyles.item}`}>
                        <NavLink to={'/profile'}
                                 className={({isActive}) => isActive
                                     ? `${navProfileStyles.link} text text_type_main-medium text_color_primary`
                                     : `${navProfileStyles.link} text text_type_main-medium text_color_inactive`}>
                            Профиль</NavLink>
                    </li>
                    <li className={`${navProfileStyles.item}`}>
                        <NavLink to={'/order-history'}
                                 className={({isActive}) => isActive
                                     ? `${navProfileStyles.link} text text_type_main-medium text_color_primary`
                                     : `${navProfileStyles.link} text text_type_main-medium text_color_inactive`}>
                            История заказов</NavLink>
                    </li>
                    <li className={`${navProfileStyles.item}`}>
                        <NavLink to={'/logout'}
                                 className={({isActive}) => isActive
                                     ? `${navProfileStyles.link} text text_type_main-medium text_color_primary`
                                     : `${navProfileStyles.link} text text_type_main-medium text_color_inactive`}>
                            Выход</NavLink>
                    </li>
                </ul>
            </nav>
            <p className={`${navProfileStyles.caption} mt-20 text text_type_main-default text_color_inactive`}>{caption}</p>
        </div>
    )
}