import React from 'react';
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import profileLayoutStyles from './profile-layout.module.css'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../services/actions/auth-provider";
import Loader from "../loader/loader";


export default function ProfileLayout() {
    const {apiRequest} = useSelector(state => state.apiRequests);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = () => {
        dispatch(logout(() => navigate('/login', {replace: true})))
    }

    return (
        <>
            <Loader stateDone={apiRequest}/>
            <section className={`${profileLayoutStyles.main}`}>
                <div>
                    <nav className={`mr-15`}>
                        <ul className={`${profileLayoutStyles.list}`}>
                            <li className={`${profileLayoutStyles.item}`}>
                                <NavLink to={''} end
                                         className={({isActive}) => isActive
                                             ? `${profileLayoutStyles.link} text text_type_main-medium text_color_primary`
                                             : `${profileLayoutStyles.link} text text_type_main-medium text_color_inactive`}>
                                    Профиль</NavLink>
                            </li>
                            <li className={`${profileLayoutStyles.item}`}>
                                <NavLink to={'orders'}
                                         className={({isActive}) => isActive
                                             ? `${profileLayoutStyles.link} text text_type_main-medium text_color_primary`
                                             : `${profileLayoutStyles.link} text text_type_main-medium text_color_inactive`}>
                                    История заказов</NavLink>
                            </li>
                            <li className={`${profileLayoutStyles.item}`}>
                                <NavLink to={'logout'} onClick={logoutHandler}
                                         className={({isActive}) => isActive
                                             ? `${profileLayoutStyles.link} text text_type_main-medium text_color_primary`
                                             : `${profileLayoutStyles.link} text text_type_main-medium text_color_inactive`}>
                                    Выход</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <p className={`${profileLayoutStyles.caption} mt-20 text text_type_main-default text_color_inactive`}>
                        {location.pathname === '/profile/orders'
                            ? 'В этом разделе вы можете просмотреть свою историю заказов'
                            : 'В этом разделе вы можете изменить свои персональные данные'}
                    </p>
                </div>
                <Outlet/>
            </section>
        </>
    )
}