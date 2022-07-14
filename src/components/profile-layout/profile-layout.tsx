import React, {FC} from 'react';
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import profileLayoutStyles from './profile-layout.module.css'
import {logout} from "../../services/actions/auth-provider";
import Loader from "../loader/loader";
import {useAppDispatch, useAppSelector} from "../../services/hooks";


const ProfileLayout: FC = () => {
    const {request} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = () => {
        dispatch(logout({replaceToCallback :() => navigate('/login', {replace: true})
    }))
    }

    return (
        <>
            <Loader stateDone={request}/>
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

export default ProfileLayout