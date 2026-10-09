import React from "react";
import PropTypes from 'prop-types';
import {AiFillFileZip, AiFillFolderOpen} from 'react-icons/ai';
import LocaleContext from "../contexts/LocaleContext";

function NoteItemArchiveButton({ id, onArchive, archived }) {
    const { locale } = React.useContext(LocaleContext);

    return (
        <>
            {!archived 
            ? <AiFillFileZip title={locale === 'id' ? 'Arsipkan' : 'Archive'} className="note-item__archive-button" size={45} onClick={() => onArchive(id)} />
            : <AiFillFolderOpen title={locale === 'id' ? 'Batal Arsip' : 'Cancel archiving'} className="note-item__archive-button" size={45} onClick={() => onArchive(id)} />}
        </>
    )
}

NoteItemArchiveButton.propTypes = {
    id: PropTypes.string.isRequired,
    onArchive: PropTypes.func.isRequired,
    archived: PropTypes.bool.isRequired
}

export default NoteItemArchiveButton;