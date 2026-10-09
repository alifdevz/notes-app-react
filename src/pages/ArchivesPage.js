import React, { useEffect, useState } from "react";
import NoteList from "../components/NoteList";
import SearchNote from "../components/SearchNote";
import { useSearchParams } from 'react-router-dom';
import EmptyArchivesMessage from "../components/EmptyArchivesMessage";
import { deleteNote, getArchivedNotes, unarchiveNote } from "../utils/network-data";
import LoadingDataMessage from "../components/LoadingDataMessage";
import LocaleContext from "../contexts/LocaleContext";

function ArchivesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = useState([]);
    const [keyword, setKeyword] = useState(() => {
        return searchParams.get('keyword') || '';
    });
    const [isLoading, setLoading] = useState(true);
    const { locale } = React.useContext(LocaleContext);

    useEffect(() => {
        async function getNotesFromApi() {
            const { data } = await getArchivedNotes();
            setLoading(false);
            setNotes(data);
        }

        getNotesFromApi();
    }, []);

    function onSearchHandler(keyword) {
        setKeyword(keyword);
        setSearchParams({ keyword });
    }

    const filteredNotes = notes.filter(note => note.title.toUpperCase().includes(keyword.toUpperCase()));
    
    async function onDeleteHandler(id) {
        await deleteNote(id);
        const { data } = await getArchivedNotes();
        setNotes(data);
    }

    async function onUnArchiveHandler(id) {
        await unarchiveNote(id);
        const { data } = await getArchivedNotes();
        setNotes(data);
    }

    return (
        <>
            <div className="archives-page">
                <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Note'}</h2>
                <SearchNote keyword={keyword} keywordChange={onSearchHandler} />
            </div>
            {isLoading ? <LoadingDataMessage /> : notes.length
            ? <NoteList
                notes={filteredNotes}
                onDelete={onDeleteHandler}
                onArchive={onUnArchiveHandler}/>
            : <EmptyArchivesMessage />}
        </>
    )
}

export default ArchivesPage;