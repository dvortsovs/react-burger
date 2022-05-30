import React, {useState} from 'react';
import profilePageStyles from './profile-page.module.css'
import Form from "../../components/form/form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import NavProfile from "../../components/nav-profile/nav-profile";

export default function ProfilePage() {
    const [emailValue, setEmailValue] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    return (
        <section className={`${profilePageStyles.main}`}>
            <NavProfile caption={'В этом разделе вы можете изменить свои персональные данные'}/>
            <Form styles={{justifyContent: 'start'}}>
                <Input
                    type='text'
                    placeholder='Имя'
                    value={nameValue}
                    icon={'EditIcon'}
                    onChange={(e) => setNameValue(e.target.value)}
                    size='default'
                />
                <Input
                    type='email'
                    placeholder='Логин'
                    value={emailValue}
                    icon={'EditIcon'}
                    onChange={(e) => setEmailValue(e.target.value)}
                    errorText='error'
                    error={false}
                    size='default'
                />
                <Input
                    type='password'
                    placeholder='Пароль'
                    icon={'EditIcon'}
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    errorText='error'
                    error={false}
                    size='default'
                />
            </Form>
        </section>
    )
}