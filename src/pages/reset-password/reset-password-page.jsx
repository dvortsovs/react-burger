import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import resetPasswordPageStyles from './reset-password-page.module.css'
import Form from "../../components/form/form";

export default function ResetPasswordPage() {
    const [codeValue, setCodeValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [passwordHideState, setPasswordHideState] = useState('password')
    // const inputRef = useRef(null)

    return (
        <section className={`${resetPasswordPageStyles.main}`}>
            <Form title='Восстановление пароля' links={[
                {title: 'Вспомнили пароль?', link: '/login', linkTitle: 'Войти'},
            ]}>
                <Input
                    type={passwordHideState}
                    placeholder='Введите новый пароль'
                    icon={"ShowIcon"}
                    onIconClick={() => passwordHideState === 'password' ? setPasswordHideState('text') : setPasswordHideState('password')}
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    errorText='error'
                    error={false}
                    size='default'
                />
                <Input
                    type='text'
                    placeholder='Введите код из письма'
                    value={codeValue}
                    onChange={(e) => setCodeValue(e.target.value)}
                    errorText='error'
                    error={false}
                    size='default'
                />
                <Button>Сохранить</Button>
            </Form>
        </section>
    )
}