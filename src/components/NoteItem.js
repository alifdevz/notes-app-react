import React from "react";
import NoteItemAction from "./NoteItemAction";
import NoteItemContent from "./NoteItemContent";
import PropTypes from 'prop-types';

function NoteItem({ note, onDelete, onArchive }) {
    return (
        <div className="note-item">
            <NoteItemContent {...note} />
            <NoteItemAction id={note.id}
                            onDelete={onDelete} 
                            onArchive={onArchive} 
                            archived={note.archived} 
            />
        </div>
    )
}

NoteItem.propTypes = {
    note: PropTypes.object,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired
}

export default NoteItem;