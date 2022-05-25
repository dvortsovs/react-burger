import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import registerPageStyles from './register-page.module.css'

export default function RegisterPage() {
    const [value, setValue] = useState('')
    // const inputRef = useRef(null)
    return (
        <div className={`${registerPageStyles.main}`}>
            <div className={`${registerPageStyles.container}`}>
                <h1 className={`text text_type_main-medium mb-6`}>
                    Регистрация
                </h1>
                <form className={`${registerPageStyles.form}`}>
                    <Input
                        type='text'
                        placeholder='Имя'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        size='default'
                    />
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
                        type='password'
                        placeholder='Пароль'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        size='default'
                        icon='ShowIcon'
                    />
                    <Button type='primary' size='medium'>
                        Зарегистрироваться
                    </Button>
                </form>
                <p className={`text text_type_main-default text_color_inactive mt-20`}>
                    Уже зарегистрированы?
                    <Link
                        to='/login'
                        className={`${registerPageStyles.link} text text_type_main-default ml-2`}
                    >
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    )
}