import React, {ChangeEvent, useEffect, useState} from 'react';
import Form from "../../components/form/form";
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import profilePageStyles from './profile-page.module.css'
import {validateForm} from "../../services/utils";
import {changeUserInfoRequest, updateUserInfoRequest} from "../../services/actions/auth-provider";
import {useAppDispatch, useAppSelector} from "../../services/hooks";

export default function ProfilePage() {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.auth)
    const [emailValue, setEmailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [nameEdit, setNameEdit] = useState(false);
    const [emailEdit, setEmailEdit] = useState(false);
    const [passEdit, setPassEdit] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);

    useEffect(() => {
        dispatch(updateUserInfoRequest());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setNameValue(user.name);
            setEmailValue(user.email);
        }
    }, [user]);

    const cancelButtonHandler = () => {
        if (user) {
            setNameEdit(false);
            setPassEdit(false);
            setEmailEdit(false);
            setNameValue(user.name);
            setEmailValue(user.email);
            setPasswordValue('');
        }
    }

    const submitHandler = (e: ChangeEvent) => {
        e.preventDefault();
        setNameEdit(false);
        setPassEdit(false);
        setEmailEdit(false);
        dispatch(changeUserInfoRequest(nameValue, emailValue, passwordValue));
    }

    return (
        <>
            <Form onSubmit={submitHandler} styles={{justifyContent: 'start'}}>
                <Input
                    type='text'
                    placeholder='Имя'
                    value={nameValue}
                    icon={nameEdit ? 'CloseIcon' : 'EditIcon'}
                    onIconClick={() => setNameEdit(!nameEdit)}
                    onChange={(e) => validateForm(e, 'text', setNameValue, setNameError)}
                    errorText='Поле не должно быть пустым'
                    error={nameError}
                    size='default'
                    disabled={!nameEdit}
                />
                <Input
                    type='email'
                    placeholder='Логин'
                    value={emailValue}
                    icon={emailEdit ? 'CloseIcon' : 'EditIcon'}
                    onIconClick={() => setEmailEdit(!emailEdit)}
                    onChange={(e) => validateForm(e, 'email', setEmailValue, setEmailError)}
                    errorText='Некорректный e-mail'
                    error={emailError}
                    size='default'
                    disabled={!emailEdit}
                />
                <Input
                    type='password'
                    placeholder='Пароль'
                    icon={passEdit ? 'CloseIcon' : 'EditIcon'}
                    onIconClick={() => setPassEdit(!passEdit)}
                    value={passwordValue}
                    onChange={(e) => validateForm(e, 'text', setPasswordValue, setPassError)}
                    errorText='Поле не должно быть пустым'
                    error={passError}
                    size='default'
                    disabled={!passEdit}
                />
                {nameEdit || emailEdit || passEdit
                    ? <div className={`${profilePageStyles.container}`}>
                        <Button onClick={cancelButtonHandler} type='secondary'>Отмена</Button>
                        <Button>Сохранить</Button>
                </div>
                    : null}
            </Form>
        </>
    )
}