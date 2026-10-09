import React from "react";
import { AiFillCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { addNote } from "../utils/network-data";
import useInputForBody from "../hooks/useInputForBody";
import useInput from "../hooks/useInput";
import LocaleContext from "../contexts/LocaleContext";

function AddNotePage() {
    const navigate = useNavigate()
    const [title, onTitleChange] = useInput('');
    const [body, onBodyChange] = useInputForBody('');
    const { locale } = React.useContext(LocaleContext);

    async function onSubmitHandler(event) {
        event.preventDefault();
        await addNote({title, body});
        navigate('/');
    }

    return (
        <form className="new-note-form">
            <input
                className="title-input"
                type="text" 
                placeholder={locale === 'id' ? 'Tulis judul catatan Anda di sini...' : 'Write your note title here...'}
                value={title}
                onChange={onTitleChange}
            />
            <div 
                className="body-input"
                contentEditable 
                data-placeholder={locale === 'id' ? 'Tulis catatan Anda di sini...' : 'Write your note here...'}
                onInput={onBodyChange}
            />
            <AiFillCheckCircle title={locale === 'id' ? 'Simpan' : 'Save'} onClick={onSubmitHandler} className="check-circle" size={65} />
        </form>
    )
}

export default AddNotePage;