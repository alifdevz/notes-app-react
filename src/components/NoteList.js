import React from "react";
import EmptyNotesMessage from "./EmptyNotesMessage";
import GridNoteItems from "./GridNoteItems";
import PropTypes from 'prop-types';

function NoteList({ notes, onDelete, onArchive }) {

    return (
        <div className="note-list">
            {notes.length 
            ? <GridNoteItems notes={notes} onDelete={onDelete} onArchive={onArchive} />
            : <EmptyNotesMessage />}
        </div>
    )
}

NoteList.propTypes = {
    notes: PropTypes.array,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired
}

export default NoteList;