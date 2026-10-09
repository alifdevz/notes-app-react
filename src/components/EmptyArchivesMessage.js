import React from "react";
import LocaleContext from "../contexts/LocaleContext";

function EmptyArchivesMessage() {
    const { locale } = React.useContext(LocaleContext);

    return <p className="no-notes">{locale === 'id' ? 'Tidak ada arsip' : 'Archives empty'}</p>;
}

export default EmptyArchivesMessage;