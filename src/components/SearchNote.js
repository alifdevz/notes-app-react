import React from "react";
import PropTypes from 'prop-types';
import LocaleContext from "../contexts/LocaleContext";

function SearchNote({ keyword, keywordChange}) {
    const { locale } = React.useContext(LocaleContext);
    return (
        <input
            className="search-bar"
            type="text"
            placeholder={locale === 'id' ? 'Cari berdasarkan nama ...' : 'Search by name ...'}
            value={keyword}
            onChange={(event) => keywordChange(event.target.value)}
        />
    )
}

SearchNote.propTypes = {
    keyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired,
}

export default SearchNote;