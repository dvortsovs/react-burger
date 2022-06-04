const validateForm = (e, type, setValue, setError) => {
    switch (type) {
        case 'email':
            setValue(e.target.value)
            const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            setError(!reg.test(e.target.value))
            break
        case 'text':
            setValue(e.target.value)
            setError(e.target.value === '')
            break
        default: return
    }
}

export {validateForm}