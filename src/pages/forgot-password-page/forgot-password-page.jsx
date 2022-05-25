import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import forgotPasswordPageStyles from './forgot-password-page.module.css'

export default function ForgotPasswordPage() {
    const [value, setValue] = useState('')
    // const inputRef = useRef(null)
    return (
        <div className={`${forgotPasswordPageStyles.main}`}>
            <div className={`${forgotPasswordPageStyles.container}`}>
                <h1 className={`text text_type_main-medium mb-6`}>
                    Восстановление пароля
                </h1>
                <form className={`${forgotPasswordPageStyles.form}`}>
                    <Input
                        type='email'
                        placeholder='Укажите e-mail'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        errorText='error'
                        error={false}
                        size='default'
                    />
                    <Button type='primary' size='medium'>
                        Восстановить
                    </Button>
                </form>
                <p className={`text text_type_main-default text_color_inactive mt-20`}>
                    Вспомнили пароль?
                    <Link
                        to='/login'
                        className={`${forgotPasswordPageStyles.link} text text_type_main-default ml-2`}
                    >
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    )
}