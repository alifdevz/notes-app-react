import React from "react";
import { Link, useLocation } from 'react-router-dom';
import {FaMoon, FaSun} from 'react-icons/fa';
import {AiOutlineTranslation} from 'react-icons/ai';
import {FiLogOut} from 'react-icons/fi';
import LocaleContext from "../contexts/LocaleContext";
import ThemeContext from "../contexts/ThemeContext";
import PropTypes from 'prop-types';

function Navigation({ logout, authedUser }) {
    const { pathname } = useLocation();
    const { locale, toggleLocale } = React.useContext(LocaleContext);
    const { theme, toggleTheme } = React.useContext(ThemeContext);

    return (
        <nav className="navigation">
            <h1><Link className="link" to={'/'}>{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link></h1>
            <div className="right-navigation">
                {((pathname === '/' || pathname === '/archives') && authedUser !== undefined)
                ? <Link className="link" to={'archives'}>{locale === 'id' ? 'Terarsip' : 'Archived'}</Link> 
                : null
                }
                <AiOutlineTranslation onClick={toggleLocale} className="translation-icon" />
                {theme !== 'light' ? <FaSun className="theme-icon" onClick={toggleTheme} /> : <FaMoon className="theme-icon" onClick={toggleTheme} />}
                {((pathname === '/' || pathname === '/archives') && authedUser !== undefined)
                ? <span title={locale === 'id' ? 'Keluar' : 'Logout'} className="logout" onClick={logout}><FiLogOut className="logout-image" /> <span className="logout-name">{authedUser.name}</span></span>
                : null
                }
            </div>
        </nav>
    )
}

Navigation.propTypes = {
    logout: PropTypes.func,
    authedUser: PropTypes.object
}

export default Navigation;