import React from "react";
import LocaleContext from "../contexts/LocaleContext";

function LoadingDataMessage() {
    const { locale } = React.useContext(LocaleContext);

    return (
        <div className="loading-message">
            <p>{locale === 'id' ? 'Memuat data ...' : 'Loading data ...'}</p>
        </div>
    )
}

export default LoadingDataMessage;