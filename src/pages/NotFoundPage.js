import React from "react";
import LocaleContext from "../contexts/LocaleContext";

function NotFoundPage() {
    const { locale } = React.useContext(LocaleContext);
    
    return (
        <div className="not-found">
            <p>404</p>
            <p>{locale === 'id' ? 'Halaman tidak ditemukan' : 'Page not found'}</p>
        </div>
    )
}

export default NotFoundPage;