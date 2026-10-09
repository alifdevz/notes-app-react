import React from "react";
import LocaleContext from "../contexts/LocaleContext";
import useInput from "../hooks/useInput";
import PropTypes from 'prop-types';

function RegisterInput({ register }) {
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [confirmPassword, onConfirmPasswordChange] = useInput('');
    const { locale } = React.useContext(LocaleContext);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        password === confirmPassword 
            ? register({ name: name, email: email, password: password})
            : alert(locale === 'id' ? 'Password and konfirmasi password harus sama!' : 'Password and password confirm must be the same!');
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <label htmlFor="name">{locale === 'id' ? 'Nama' : 'Name'}</label>
            <input type="text" id="name" value={name} onChange={onNameChange} />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={onEmailChange} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={onPasswordChange} />
            <label htmlFor="confirm-password">{locale === 'id' ? 'Konfirmasi password' : 'Confirm Password'}</label>
            <input type="password" id="confirm-password" value={confirmPassword} onChange={onConfirmPasswordChange} />
            <button type="submit">{locale === 'id' ? 'Daftar' : 'Register'}</button>
        </form>
    )
}

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired
}

export default RegisterInput;