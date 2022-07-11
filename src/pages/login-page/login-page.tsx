import React, {ChangeEvent, useState} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import loginPageStyles from './login-page.module.css'
import Form from "../../components/form/form";
import {validateForm} from "../../services/utils";
import {login} from "../../services/actions/auth-provider";
import Loader from "../../components/loader/loader";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {ILocationState} from "../../components/app/app";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const locationState = location.state as ILocationState
    const {apiRequest} = useAppSelector(state => state.apiRequests);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordHideState, setPasswordHideState] = useState<'password' | 'text'>('password');
    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);

    const fromPage = locationState?.from?.pathname === '/profile/logout' ? '/' : locationState?.from?.pathname || '/';

    const submitHandler = (e: ChangeEvent) => {
        e.preventDefault();
        dispatch(login(emailValue, passwordValue, () => navigate(fromPage, {replace: true})));
    }
//todo: add on login error modal
    return (
        <>
            <Loader stateDone={apiRequest}/>
            <section className={`${loginPageStyles.main}`}>
                <Form onSubmit={submitHandler} title='Вход' links={[
                    {title: 'Вы — новый пользователь?', link: '/register', linkCapture: 'Зарегистрироваться'},
                    {title: 'Забыли пароль?', link: '/forgot-password', linkCapture: 'Восстановить пароль'}
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
                        onChange={(e) => validateForm(e, 'text', setPasswordValue, setPassError)}
                        errorText='Поле не должно быть пустым'
                        error={passError}
                        size='default'
                    />
                    <Button>Войти</Button>
                </Form>
            </section>
        </>
    )
}