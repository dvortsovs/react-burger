import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import forgotPasswordPageStyles from './forgot-password-page.module.css'
import Form from "../../components/form/form";

export default function ForgotPasswordPage() {
    const [emailValue, setEmailValue] = useState('')
    // const inputRef = useRef(null)

    return (
        <section className={`${forgotPasswordPageStyles.main}`}>
            <Form title='Восстановление пароля' links={[
                {title: 'Вспомнили пароль?', link: '/login', linkTitle: 'Войти'},
            ]}>
                <Input
                    type='email'
                    placeholder='Укажите e-mail'
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    errorText='error'
                    error={false}
                    size='default'
                />
                <Button>Восстановить</Button>
            </Form>
        </section>
    )
}