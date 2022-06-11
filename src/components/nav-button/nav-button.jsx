import React, {useCallback} from 'react';
import buttonStyles from './nav-button.module.css'
import {BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useMatch} from "react-router-dom";

export default function NavButton({title, icon, to, personal=false, styles}) {
    const match = useMatch({path: to, end: !personal})
    const ingredientsMatch = useMatch({path: `${to}ingredients`, end: false})

    const selectIcon = useCallback(() => {
        switch (icon) {
            case 'burger':
                return (<BurgerIcon type={match || ingredientsMatch ? "primary" : "secondary"} />)
            case 'list':
                return (<ListIcon type={match ? "primary" : "secondary"} />)
            case 'profile':
                return (<ProfileIcon type={match ? "primary" : "secondary"} />)
            default: return null
        }
    }, [match, icon, ingredientsMatch])

    return (
        <Link to={to} className={`${buttonStyles.button} ${personal ? buttonStyles.personal : ''} ${styles}`}>
            {selectIcon()}
            <span
                className={`text text_type_main-default ${match || ingredientsMatch ? "text_color_primary" : "text_color_inactive"} ml-2`}>{title}</span>
        </Link>
    )
}