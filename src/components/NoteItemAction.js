import React from "react";
import NoteItemArchiveButton from "./NoteItemArchiveButton";
import NoteItemDeleteButton from "./NoteItemDeleteButton";
import PropTypes from 'prop-types';

function NoteItemAction({ id, onDelete, onArchive, archived }) {
    return (
        <div className="note-item__action">
            <NoteItemDeleteButton id={id} onDelete={onDelete} />
            <NoteItemArchiveButton id={id} onArchive={onArchive} archived={archived} />
        </div>
    )
}

NoteItemAction.propTypes = {
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
    archived: PropTypes.bool.isRequired
}

export default NoteItemAction;