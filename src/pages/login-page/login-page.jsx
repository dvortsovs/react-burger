import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import loginPageStyles from './login-page.module.css'
import Form from "../../components/form/form";
import {validateForm} from "../../services/utils";
import {login} from "../../services/actions/auth-provider";
import Loader from "../../components/loader/loader";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {apiRequest} = useSelector(state => state.auth);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordHideState, setPasswordHideState] = useState('password');
    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);

    const fromPage = location.state?.from?.pathname === '/profile/logout' ? '/' : location.state?.from?.pathname || '/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(emailValue, passwordValue, () => navigate(fromPage, {replace: true})));
    }

    return (
        <>
            <Loader stateDone={apiRequest}/>
            <section className={`${loginPageStyles.main}`}>
                <Form onSubmit={submitHandler} title='Вход' links={[
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