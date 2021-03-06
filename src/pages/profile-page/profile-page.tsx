import React, {FormEvent, useEffect, useState} from 'react';
import Form from "../../components/form/form";
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import profilePageStyles from './profile-page.module.css'
import {validateForm} from "../../services/utils";
import {changeUserInfoRequest, updateUserInfoRequest} from "../../services/actions/auth-provider";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import Loader from "../../components/loader/loader";

export default function ProfilePage() {
    const dispatch = useAppDispatch();
    const {user, request} = useAppSelector(state => state.auth)
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

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        setNameEdit(false);
        setPassEdit(false);
        setEmailEdit(false);
        dispatch(changeUserInfoRequest({
            name: nameValue,
            email: emailValue,
            password: passwordValue
        }));
    }

    return (
        <> <Loader stateDone={request}/>
            <Form onSubmit={submitHandler} styles={{justifyContent: 'start'}}>
                <Input
                    type='text'
                    placeholder='??????'
                    value={nameValue}
                    icon={nameEdit ? 'CloseIcon' : 'EditIcon'}
                    onIconClick={() => setNameEdit(!nameEdit)}
                    onChange={(e) => validateForm(e, 'text', setNameValue, setNameError)}
                    errorText='???????? ???? ???????????? ???????? ????????????'
                    error={nameError}
                    size='default'
                    disabled={!nameEdit}
                />
                <Input
                    type='email'
                    placeholder='??????????'
                    value={emailValue}
                    icon={emailEdit ? 'CloseIcon' : 'EditIcon'}
                    onIconClick={() => setEmailEdit(!emailEdit)}
                    onChange={(e) => validateForm(e, 'email', setEmailValue, setEmailError)}
                    errorText='???????????????????????? e-mail'
                    error={emailError}
                    size='default'
                    disabled={!emailEdit}
                />
                <Input
                    type='password'
                    placeholder='????????????'
                    icon={passEdit ? 'CloseIcon' : 'EditIcon'}
                    onIconClick={() => setPassEdit(!passEdit)}
                    value={passwordValue}
                    onChange={(e) => validateForm(e, 'text', setPasswordValue, setPassError)}
                    errorText='???????? ???? ???????????? ???????? ????????????'
                    error={passError}
                    size='default'
                    disabled={!passEdit}
                />
                {nameEdit || emailEdit || passEdit
                    ? <div className={`${profilePageStyles.container}`}>
                        <Button onClick={cancelButtonHandler} type='secondary'>????????????</Button>
                        <Button>??????????????????</Button>
                    </div>
                    : null}
            </Form>
        </>
    )
}