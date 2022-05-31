import React from 'react';
import formStyles from './form.module.css'
import {Link} from "react-router-dom";

export default function Form({title, children, links, styles, onSubmit}) {
    return (
        <div className={`${formStyles.container}`} style={styles ? {...styles} : null}>
            {title ? <h1 className={`text text_type_main-medium mb-6`}>
                {title}
            </h1> : null}
            <form onSubmit={onSubmit} className={`${formStyles.form}`}>
                {children}
            </form>
            {links ? links.map((item, index) => {
                if (index === 0) {
                    return (
                        <p key={index} className={`text text_type_main-default text_color_inactive mt-20`}>
                            {item.title}
                            <Link
                                to={item.link}
                                className={`${formStyles.link} text text_type_main-default ml-2`}
                            >
                                {item.linkTitle}
                            </Link>
                        </p>
                    )
                } else {
                    return (
                        <p key={index} className={`text text_type_main-default text_color_inactive mt-4`}>
                            {item.title}
                            <Link
                                to={item.link}
                                className={`${formStyles.link} text text_type_main-default ml-2`}
                            >
                                {item.linkTitle}
                            </Link>
                        </p>
                    )
                }
            }) : null}
        </div>
    )
}