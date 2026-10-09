import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import LocaleContext from "../contexts/LocaleContext";
import { register } from "../utils/network-data";

function RegisterPage() {
    const navigate = useNavigate();
    const { locale } = React.useContext(LocaleContext);

    async function onRegisterHandler(user) {
        const { error } = await register(user);
        if (!error) {
            navigate('/login');
        }
    }

    return (
        <div className="register-page">
            <h2>{locale === 'id' ? 'Isi form untuk mendaftar akun.' : 'Fill the form to register account.'}</h2>
            <br />
            <RegisterInput register={onRegisterHandler} />
            <p>{locale === 'id' ? 'Sudah punya akun?' : 'Already have an account?'} <Link to="/login">{locale === 'id' ? 'Login di sini' : 'Login here'}</Link></p>
        </div>
    )
}

export default RegisterPage;