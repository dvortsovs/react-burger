import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import registerPageStyles from './register-page.module.css'
import Form from "../../components/form/form";

export default function RegisterPage() {
    const [emailValue, setEmailValue] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [passwordHideState, setPasswordHideState] = useState('password')
    // const inputRef = useRef(null)

    return (
        <section className={`${registerPageStyles.main}`}>
            <Form title='Регистрация' links={[
                {title: 'Уже зарегистрированы?', link: '/login', linkTitle: 'Войти'},
            ]}>
                <Input
                    type='text'
                    placeholder='Имя'
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    size='default'
                />
                <Input
                    type='email'
                    placeholder='E-mail'
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    errorText='error'
                    error={false}
                    size='default'
                />
                <Input
                    type={passwordHideState}
                    placeholder='Пароль'
                    icon={"ShowIcon"}
                    onIconClick={() => passwordHideState === 'password' ? setPasswordHideState('text') : setPasswordHideState('password')}
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    errorText='error'
                    error={false}
                    size='default'
                />
                <Button>Войти</Button>
            </Form>
        </section>
    )
}