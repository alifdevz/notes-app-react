import React from "react";
import { Link } from "react-router-dom";
import { showFormattedDate } from '../utils/index'
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

function NoteItemContent({ id, title, body, createdAt }) {
    
    return (
        <div className="note-item__content">
            <h4 className="note-item__title"><Link className="link" to={`notes/${id}`}>{title}</Link></h4>
            <div className="note-item__date">{showFormattedDate(createdAt)}</div>
            <p className="note-item__body">{parse(body)}</p>
        </div>
    )
}

NoteItemContent.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string.isRequired
}

export default NoteItemContent;