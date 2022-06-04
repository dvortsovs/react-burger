import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {api} from "../../constants/api";
import forgotPasswordPageStyles from './forgot-password-page.module.css'
import Form from "../../components/form/form";
import {validateForm} from "../../services/utils";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {apiRequest} from "../../services/actions/api-request";


export default function ForgotPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [emailError, setEmailError] = useState(false);
    // const inputRef = useRef(null)

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(apiRequest(
            `${api.urls.baseUrl}${api.urls.forgotPassword}`,
            'POST',
            api.headers,
            {"email": emailValue},
            () => navigate('/reset-password')
            ))
    }

    return (
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
    )
}