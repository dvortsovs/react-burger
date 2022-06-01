import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import loginPageStyles from './login-page.module.css'
import Form from "../../components/form/form";
import {validateForm} from "../../services/utils";

export default function LoginPage() {
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [passwordHideState, setPasswordHideState] = useState('password')
    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);
    // const inputRef = useRef(null)


    return (
        <section className={`${loginPageStyles.main}`}>
            <Form title='Вход' links={[
                {title: 'Вы — новый пользователь?', link: '/register', linkTitle: 'Зарегистрироваться'},
                {title: 'Забыли пароль?', link: '/forgot-password', linkTitle: 'Восстановить пароль'}
            ]}>
                <Input
                    type='email'
                    placeholder='E-mail'
                    value={emailValue}
                    onChange={(e) => validateForm(e, 'email', setEmailValue, setEmailError)}
                    errorText='Некорректный e-mail'
                    error={emailError}
                    size='default'
                />
                <Input
                    type={passwordHideState}
                    placeholder='Пароль'
                    icon={"ShowIcon"}
                    onIconClick={() => passwordHideState === 'password' ? setPasswordHideState('text') : setPasswordHideState('password')}
                    value={passwordValue}
                    onChange={(e) => validateForm(e, 'pass', setPasswordValue, setPassError)}
                    errorText='Поле не должно быть пустым'
                    error={passError}
                    size='default'
                />
                <Button>Войти</Button>
            </Form>
        </section>
    )
}