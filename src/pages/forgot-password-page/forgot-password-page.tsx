import React, {ChangeEvent, useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import forgotPasswordPageStyles from './forgot-password-page.module.css'
import Form from "../../components/form/form";
import {validateForm} from "../../services/utils";
import {useLocation, useNavigate} from "react-router-dom";
import {forgotPasswordRequest} from "../../services/actions/auth-provider";
import Loader from "../../components/loader/loader";
import {useAppDispatch, useAppSelector} from "../../services/hooks";


export default function ForgotPasswordPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {apiRequest} = useAppSelector(state => state.apiRequests);
    const [emailValue, setEmailValue] = useState('');
    const [emailError, setEmailError] = useState(false);

    const submitHandler = (e: ChangeEvent) => {
        e.preventDefault();
        dispatch(forgotPasswordRequest(emailValue, () => navigate('/reset-password', {state: {from: location}})));
    }

    return (
        <>
            <Loader stateDone={apiRequest}/>
            <section className={`${forgotPasswordPageStyles.main}`}>
                <Form onSubmit={submitHandler} title='Восстановление пароля' links={[
                    {title: 'Вспомнили пароль?', link: '/login', linkCapture: 'Войти'},
                ]}>
                    <Input
                        type='email'
                        placeholder='Укажите e-mail'
                        value={emailValue}
                        onChange={(e) => validateForm(e, 'email', setEmailValue, setEmailError)}
                        errorText='Некорректный e-mail'
                        error={emailError}
                        size='default'
                    />
                    <Button>Восстановить</Button>
                </Form>
            </section>
        </>
    )
}