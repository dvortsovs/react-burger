import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import forgotPasswordPageStyles from './forgot-password-page.module.css'
import Form from "../../components/form/form";
import {validateForm} from "../../services/utils";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {forgotPasswordRequest} from "../../services/actions/auth-provider";
import Loader from "../../components/loader/loader";


export default function ForgotPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {apiRequest} = useSelector(state => state.auth);
    const [emailValue, setEmailValue] = useState('');
    const [emailError, setEmailError] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPasswordRequest(emailValue, () => navigate('/reset-password', {state:{from: location}})));
    }

    return (
        <>
            <Loader stateDone={apiRequest}/>
            <section className={`${forgotPasswordPageStyles.main}`}>
                <Form onSubmit={submitHandler} title='Восстановление пароля' links={[
                    {title: 'Вспомнили пароль?', link: '/login', linkTitle: 'Войти'},
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