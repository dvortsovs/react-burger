import React from 'react';
import {Outlet} from "react-router-dom";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './layout.module.css';

function Layout() {

    return (
        <>
            <header className={`${appHeaderStyles.header}`}>
                <div className={`${appHeaderStyles.content}`}>
                    <nav className={`${appHeaderStyles.nav}`}>
                        <ul className={`${appHeaderStyles.list} mt-4 mb-4`}>
                            <li className={`mr-2`}>
                                <button type="button" className={`${appHeaderStyles.button} pt-4 pr-5 pb-4`}>
                                    <BurgerIcon type={"primary"}/>
                                    <span
                                        className={`text text_type_main-default text_color_primary ml-2`}>Конструктор</span>
                                </button>
                            </li>
                            <li className={``}>
                                <button type="button" className={`${appHeaderStyles.button} pt-4 pr-5 pb-4 pl-5`}>
                                    <ListIcon type={"secondary"}/>
                                    <span
                                        className={`text text_type_main-default text_color_inactive ml-2`}>Лента заказов</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <Logo/>
                    <button type="button"
                            className={`${appHeaderStyles.button} ${appHeaderStyles.personal} pt-4 pr-5 pb-4 pl-5`}>
                        <ProfileIcon type={"secondary"}/>
                        <span className={`text text_type_main-default text_color_inactive ml-2`}>Личный кабинет</span>
                    </button>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout