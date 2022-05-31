import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import registerPageStyles from './register-page.module.css'
import Form from "../../components/form/form";
import {validateForm} from "../../services/utils";

export default function RegisterPage() {
    const [emailValue, setEmailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordHideState, setPasswordHideState] = useState('password');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);
    // const inputRef = useRef(null)

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <section className={`${registerPageStyles.main}`}>
            <Form onSubmit={onSubmit} title='Регистрация' links={[
                {title: 'Уже зарегистрированы?', link: '/login', linkTitle: 'Войти'},
            ]}>
                <Input
                    type='text'
                    placeholder='Имя'
                    value={nameValue}
                    onChange={(e) => validateForm(e, 'name', setNameValue, setNameError)}
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
                    onChange={(e) => validateForm(e, 'pass', setPasswordValue, setPassError)}
                    errorText='Поле не должно быть пустым'
                    error={passError}
                    size='default'
                />
                <Button disabled={nameError || passError || emailError}>Зарегистрироваться</Button>
            </Form>
        </section>
    )
}