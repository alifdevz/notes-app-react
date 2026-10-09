import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from 'prop-types';

function GridNoteItems({ notes, onDelete, onArchive }) {
    return (
        <div className="grid-container">
            {notes.map(note => <NoteItem 
                                    key={note.id} 
                                    note={note} 
                                    onDelete={onDelete} 
                                    onArchive={onArchive}
                                />)
            }
        </div>
    )
}

GridNoteItems.propTypes = {
    notes: PropTypes.array,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired
}

export default GridNoteItems;