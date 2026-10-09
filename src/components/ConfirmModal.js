import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

function ConfirmModal({ title, message, confirmLabel, cancelLabel, onConfirm, onCancel }) {
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        // Fokus awal di tombol "Batal" agar tidak terhapus tanpa sengaja (mis. menekan Enter)
        cancelButtonRef.current.focus();

        // Tutup dengan tombol Escape
        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                onCancel();
            }
        };
        document.addEventListener('keydown', onKeyDown);

        // Cegah halaman di belakang ikut ter-scroll selama modal terbuka
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [onCancel]);

    // Portal: modal dirender langsung di <body> supaya tidak terpotong oleh elemen induk
    return createPortal(
        <div className="modal-overlay" onClick={onCancel}>
            <div
                className="modal"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                aria-describedby="modal-message"
                onClick={(event) => event.stopPropagation()}
            >
                <h3 id="modal-title" className="modal__title">{title}</h3>
                <p id="modal-message" className="modal__message">{message}</p>
                <div className="modal__actions">
                    <button type="button" ref={cancelButtonRef} className="modal__button modal__button--cancel" onClick={onCancel}>
                        {cancelLabel}
                    </button>
                    <button type="button" className="modal__button modal__button--confirm" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

ConfirmModal.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    confirmLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

export default ConfirmModal;
