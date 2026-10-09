import React, { useEffect, useState } from "react";
import NoteHeader from "./components/NoteHeader";
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import NotFoundPage from "./pages/NotFoundPage";
import DetailPage from "./pages/DetailPage";
import {FaPlusCircle} from 'react-icons/fa'
import AddNotePage from "./pages/AddNotePage";
import HomePage from "./pages/HomePage";
import ArchivesPage from "./pages/ArchivesPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import LocaleContext from "./contexts/LocaleContext";
import ThemeContext from "./contexts/ThemeContext";

function PersonalNotesApp() {
    const { pathname } = useLocation();
    const [authedUser, setAuthedUser] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const navigate = useNavigate();

    const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');
    const toggleLocale = () => {
        setLocale((prevLocale) => {
            const newLocale = prevLocale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return newLocale; 
        })
    }
    const localeContextValue = React.useMemo(() => {
        return {
            locale,
            toggleLocale
        }
    }, [locale]);

    const [theme, setTheme] = useState(localStorage.getItem('theme') ||'light');
    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    }
    const themeContextValue = React.useMemo(() => {
        return {
            theme,
            toggleTheme
        }
    }, [theme]);

    useEffect(() => {
        async function getAuthedUser() {
            const { data } = await getUserLogged();
            setAuthedUser(data);
            setInitializing(false);
        }

        getAuthedUser();
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    async function onLoginSuccess({ accessToken }) {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();
        setAuthedUser(data);
        navigate('/');
    }

    function onLogout() {
        setAuthedUser(null);
        putAccessToken('');
    }
    
    if (initializing) {
        return null;
    }

    if (authedUser === null) {
        return (
            <>
                <ThemeContext.Provider value={themeContextValue}>
                    <LocaleContext.Provider value={localeContextValue}>
                        <header>
                            <NoteHeader />
                        </header>
                        <main>
                            <Routes>
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                            </Routes>
                        </main>
                    </LocaleContext.Provider>
                </ThemeContext.Provider>
            </>
        )
    }

    return (
        <>
            <ThemeContext.Provider value={themeContextValue}>
                <LocaleContext.Provider value={localeContextValue}>
                    <header>
                        <NoteHeader logout={onLogout} authedUser={authedUser} />
                    </header>
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/archives" element={<ArchivesPage />} />
                            <Route path="/notes/:id" element={<DetailPage />} />
                            <Route path="archives/notes/:id" element={<DetailPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                            <Route path="notes/new" element={<AddNotePage />} />
                        </Routes>
                    </main>
                    {pathname === '/'
                    ? <div className="add-new-note-botton" title={locale === 'id' ? 'Tambah Catatan' : 'Add Note'}>
                        <Link className="link" to={'notes/new'}><FaPlusCircle size={63}/></Link>
                      </div>
                    : null}
                </LocaleContext.Provider>
            </ThemeContext.Provider>
        </>
    )
}

export default PersonalNotesApp;