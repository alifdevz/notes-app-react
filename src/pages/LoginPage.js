import React from "react";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import LocaleContext from "../contexts/LocaleContext";
import { login } from "../utils/network-data";
import PropTypes from 'prop-types';

function LoginPage({ loginSuccess }) {
    const { locale } = React.useContext(LocaleContext);

    async function onLoginHandler({email, password}) {
        const { error, data } = await login({email, password});
        if (!error) {
            loginSuccess(data);
        }
    }

    return (
        <div className="login-page">
            <h2>{locale === 'id' ? 'Yuk, login untuk menggunakan aplikasi.' : 'Please login to use the app.'}</h2>
            <br />
            <LoginInput login={onLoginHandler} />
            <p>{locale === 'id' ? 'Belum punya akun?' : 'Don\'t have an account?'} <Link to="/register">{locale === 'id' ? 'Daftar di sini' : 'Register here'}</Link></p>
        </div>
    )
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired
}

export default LoginPage;