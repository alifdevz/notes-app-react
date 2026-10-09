import React from "react";
import LocaleContext from "../contexts/LocaleContext";

function EmptyNotesMessage() {
    const { locale } = React.useContext(LocaleContext);

    return <p className="no-notes">{locale === 'id' ? 'Tidak ada catatan' : 'Notes empty'}</p>;
}

export default EmptyNotesMessage;