import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import registerPageStyles from './register-page.module.css'
import Form from "../../components/form/form";
import {useDispatch} from "react-redux";
import {validateForm} from "../../services/utils";
import {useNavigate} from "react-router-dom";
import {getRegistration} from "../../services/actions/auth-provider";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordHideState, setPasswordHideState] = useState('password');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getRegistration(nameValue, emailValue, passwordValue, () => navigate('/', {replace: true})));
    }

    return (
        <section className={`${registerPageStyles.main}`}>
            <Form onSubmit={submitHandler} title='Регистрация' links={[
                {title: 'Уже зарегистрированы?', link: '/login', linkTitle: 'Войти'},
            ]}>
                <Input
                    type='text'
                    placeholder='Имя'
                    value={nameValue}
                    onChange={(e) => validateForm(e, 'text', setNameValue, setNameError)}
                    size='default'
                    error={nameError}
                    errorText='Поле не должно быть пустым'
                />
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
                    onIconClick={() => passwordHideState === 'password'
                        ? setPasswordHideState('text')
                        : setPasswordHideState('password')}
                    value={passwordValue}
                    onChange={(e) => validateForm(e, 'text', setPasswordValue, setPassError)}
                    errorText='Поле не должно быть пустым'
                    error={passError}
                    size='default'
                />
                <Button disabled={nameError || passError || emailError}>Зарегистрироваться</Button>
            </Form>
        </section>
    )
}