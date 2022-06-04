import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import resetPasswordPageStyles from './reset-password-page.module.css'
import {validateForm} from "../../services/utils";
import Form from "../../components/form/form";
import {useDispatch} from "react-redux";
import {apiRequest} from "../../services/actions/api-request";
import {api} from "../../constants/api";
import {useNavigate} from "react-router-dom";

export default function ResetPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [codeValue, setCodeValue] = useState('')
    const [codeError, setCodeError] = useState(false)
    const [passwordValue, setPasswordValue] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [passwordHideState, setPasswordHideState] = useState('password')
    // const inputRef = useRef(null)

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(apiRequest(
            `${api.urls.baseUrl}${api.urls.forgotPassword}${api.urls.reset}`,
            'POST',
            api.headers,
            {
                "password": passwordValue,
                "token": codeValue
            },
            () => navigate('/login', {replace: true})
        ))
    }

    return (
        <section className={`${resetPasswordPageStyles.main}`}>
            <Form onSubmit={submitHandler} title='Восстановление пароля' links={[
                {title: 'Вспомнили пароль?', link: '/login', linkTitle: 'Войти'},
            ]}>
                <Input
                    type={passwordHideState}
                    placeholder='Введите новый пароль'
                    icon={"ShowIcon"}
                    onIconClick={() => passwordHideState === 'password' ? setPasswordHideState('text') : setPasswordHideState('password')}
                    value={passwordValue}
                    onChange={(e) => validateForm(e, 'text', setPasswordValue, setPasswordError)}
                    errorText='Поле не должно быть пустым'
                    error={passwordError}
                    size='default'
                />
                <Input
                    type='text'
                    placeholder='Введите код из письма'
                    value={codeValue}
                    onChange={(e) => validateForm(e, 'text', setCodeValue, setCodeError)}
                    errorText='Поле не должно быть пустым'
                    error={codeError}
                    size='default'
                />
                <Button>Сохранить</Button>
            </Form>
        </section>
    )
}