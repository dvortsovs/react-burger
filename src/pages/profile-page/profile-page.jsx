import React, {useState} from 'react';
import Form from "../../components/form/form";
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import profilePageStyles from './profile-page.module.css'

export default function ProfilePage() {
    const [emailValue, setEmailValue] = useState('fane28@mail.ru');
    const [nameValue, setNameValue] = useState('vasya');
    const [passwordValue, setPasswordValue] = useState('123123');
    const [nameEdit, setNameEdit] = useState(false);
    const [emailEdit, setEmailEdit] = useState(false);
    const [passEdit, setPassEdit] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Form onSubmit={onSubmit} styles={{justifyContent: 'start'}}>
                <Input
                    type='text'
                    placeholder='Имя'
                    value={nameValue}
                    icon={nameEdit ? 'CloseIcon' : 'EditIcon'}
                    onIconClick={() => setNameEdit(!nameEdit)}
                    onChange={(e) => setNameValue(e.target.value)}
                    size='default'
                    disabled={!nameEdit}
                />
                <Input
                    type='email'
                    placeholder='Логин'
                    value={emailValue}
                    icon={emailEdit ? 'CloseIcon' : 'EditIcon'}
                    onIconClick={() => setEmailEdit(!emailEdit)}
                    onChange={(e) => setEmailValue(e.target.value)}
                    errorText='error'
                    error={false}
                    size='default'
                    disabled={!emailEdit}
                />
                <Input
                    type='password'
                    placeholder='Пароль'
                    icon={passEdit ? 'CloseIcon' : 'EditIcon'}
                    onIconClick={() => setPassEdit(!passEdit)}
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    errorText='error'
                    error={false}
                    size='default'
                    disabled={!passEdit}
                />
                {nameEdit || emailEdit || passEdit
                    ? <div className={`${profilePageStyles.container}`}>
                        <Button onClick={() => {
                         setNameEdit(false);
                         setPassEdit(false);
                         setEmailEdit(false);
                        }} type='secondary'>Отмена</Button>
                        <Button onClick={() => console.log('api req')}>Сохранить</Button>
                </div>
                    : null}
            </Form>
        </>
    )
}