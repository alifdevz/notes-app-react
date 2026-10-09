import React, { useCallback, useState } from "react";
import PropTypes from 'prop-types';
import {AiOutlineDelete} from 'react-icons/ai';
import LocaleContext from "../contexts/LocaleContext";
import ConfirmModal from "./ConfirmModal";

function NoteItemDeleteButton({ id, onDelete }) {
    const { locale } = React.useContext(LocaleContext);
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const isIndonesian = locale === 'id';

    const closeConfirm = useCallback(() => setConfirmOpen(false), []);

    function onConfirmDelete() {
        setConfirmOpen(false);
        onDelete(id);
    }

    return (
        <>
            <AiOutlineDelete title={isIndonesian ? 'Hapus' : 'Delete'} className="note-item__delete-button" size={45} onClick={() => setConfirmOpen(true)} />
            {isConfirmOpen
            ? <ConfirmModal
                title={isIndonesian ? 'Hapus catatan?' : 'Delete note?'}
                message={isIndonesian
                    ? 'Catatan yang dihapus tidak dapat dikembalikan.'
                    : 'This note will be permanently deleted. This cannot be undone.'}
                confirmLabel={isIndonesian ? 'Hapus' : 'Delete'}
                cancelLabel={isIndonesian ? 'Batal' : 'Cancel'}
                onConfirm={onConfirmDelete}
                onCancel={closeConfirm}
              />
            : null}
        </>
    )
}

NoteItemDeleteButton.propTypes = {
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default NoteItemDeleteButton;
