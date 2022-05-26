import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import resetPasswordPageStyles from './reset-password-page.module.css'

export default function ResetPasswordPage() {
    const [value, setValue] = useState('')
    // const inputRef = useRef(null)
    return (
        <div className={`${resetPasswordPageStyles.main}`}>
            <div className={`${resetPasswordPageStyles.container}`}>
                <h1 className={`text text_type_main-medium mb-6`}>
                    Восстановление пароля
                </h1>
                <form className={`${resetPasswordPageStyles.form}`}>
                    <Input
                        type='password'
                        placeholder='Введите новый пароль'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        errorText='error'
                        error={false}
                        size='default'
                        icon={"ShowIcon"}
                    />
                    <Input
                        type='text'
                        placeholder='Введите код из письма'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        errorText='error'
                        error={false}
                        size='default'
                    />
                    <Button type='primary' size='medium'>
                        Сохранить
                    </Button>
                </form>
                <p className={`text text_type_main-default text_color_inactive mt-20`}>
                    Вспомнили пароль?
                    <Link
                        to='/login'
                        className={`${resetPasswordPageStyles.link} text text_type_main-default ml-2`}
                    >
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    )
}