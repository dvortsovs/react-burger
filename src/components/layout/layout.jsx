import React from 'react';
import {Outlet} from "react-router-dom";
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './layout.module.css';
import NavButton from "../nav-button/nav-button";

function Layout() {

    return (
        <>
            <header className={`${appHeaderStyles.header}`}>
                <div className={`${appHeaderStyles.content}`}>
                    <nav className={`${appHeaderStyles.nav}`}>
                        <ul className={`${appHeaderStyles.list} mt-4 mb-4`}>
                            <li className={`mr-2`}>
                                <NavButton to={'/'} icon={'burger'} title={'Конструктор'} styles={"pt-4 pr-5 pb-4"} />
                            </li>
                            <li className={``}>
                                <NavButton to={'/order-list'} icon={'list'} title={'Лента заказов'} styles={"pt-4 pr-5 pb-4 pl-5"}/>
                            </li>
                        </ul>
                    </nav>
                    <Logo/>
                    <NavButton to={'/profile'} personal={true} icon={'profile'} title={'Личный кабинет'} styles={"pt-4 pb-4 pl-5"}/>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout