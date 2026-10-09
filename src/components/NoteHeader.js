import React from "react";
import Navigation from "./Navigation";
import PropTypes from 'prop-types';

function NoteHeader({ logout, authedUser }) {
    return (
        <div className="header">
            <Navigation logout={logout} authedUser={authedUser} />
            <hr />
        </div>
    )
}

NoteHeader.propTypes = {
    logout: PropTypes.func,
    authedUser: PropTypes.object
}

export default NoteHeader;