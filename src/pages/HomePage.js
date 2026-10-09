import React, { useEffect, useState } from "react";
import EmptyNotesMessage from "../components/EmptyNotesMessage";
import NoteList from "../components/NoteList";
import SearchNote from "../components/SearchNote";
import { useSearchParams } from 'react-router-dom';
import { archiveNote, deleteNote, getActiveNotes } from "../utils/network-data";
import LoadingDataMessage from "../components/LoadingDataMessage";
import LocaleContext from "../contexts/LocaleContext";

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = useState([]);
    const [keyword, setKeyword] = useState(() => {
        return searchParams.get('keyword') || '';
    });
    const [isLoading, setLoading] = useState(true);
    const { locale } = React.useContext(LocaleContext);

    useEffect(() => {
        async function getNotesFromApi() {
            const { data } = await getActiveNotes();
            setLoading(false);
            setNotes(data);
        }

        getNotesFromApi();
    }, []);

    const onSearchHandler = (keyword) => {
        setKeyword(keyword);
        setSearchParams({ keyword });
    }

    const filteredNotes = notes.filter(note => note.title.toUpperCase().includes(keyword.toUpperCase()));
    
    async function onDeleteHandler(id) {
        await deleteNote(id);
        const { data } = await getActiveNotes();
        setNotes(data);
    }

    async function onArchiveHandler(id) {
        await archiveNote(id);
        const { data } = await getActiveNotes();
        setNotes(data);
    }

    return (
        <>
            <div className="home-page">
                <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Note'}</h2>
                <SearchNote keyword={keyword} keywordChange={onSearchHandler} />
            </div>
            {isLoading ? <LoadingDataMessage /> : notes.length
            ? <NoteList 
                notes={filteredNotes}
                onDelete={onDeleteHandler}
                onArchive={onArchiveHandler} />
            : <EmptyNotesMessage />}
        </>
    )
}

export default HomePage;