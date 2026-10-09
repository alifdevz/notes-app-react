import React from "react";
import { showFormattedDate } from "../utils/index";
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

function Detail({ title, createdAt, body }) {
    return (
        <section className="note-details">
            <h3 className="note-detail-title">{title}</h3>
            <p className="note-detail-date">{showFormattedDate(createdAt)}</p>
            <p>{parse(body)}</p>
        </section>
    )
}

Detail.propTypes = {
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
}

export default Detail;