import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import loginPageStyles from './login-page.module.css'

export default function LoginPage() {
    const [value, setValue] = useState('')
    // const inputRef = useRef(null)
    return (
        <div className={`${loginPageStyles.container}`}>
            <h1 className={`text text_type_main-medium mb-6`}>
                Вход
            </h1>
            <form className={`${loginPageStyles.form}`}>
                <Input
                    type='email'
                    placeholder='E-mail'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    errorText='error'
                    error={false}
                    size='default'
                />
                <Input
                    type='text'
                    placeholder='Пароль'
                    value={value}
                    onChange={() => console.log('123')}
                    size='default'
                    icon='ShowIcon'
                />
                <Button type='primary' size='medium'>
                    Войти
                </Button>
            </form>
            <p className={`text text_type_main-default text_color_inactive mt-20`}>
                Вы — новый пользователь?
                <Link
                    to='/register'
                    className={`${loginPageStyles.link} text text_type_main-default ml-2`}
                >
                    Зарегистрироваться
                </Link>
            </p>
            <p className={`text text_type_main-default text_color_inactive mt-4`}>
                Забыли пароль?
                <Link
                    to='/forgot-password'
                    className={`${loginPageStyles.link} text text_type_main-default ml-2`}
                >
                    Восстановить пароль
                </Link>
            </p>
        </div>
    )
}