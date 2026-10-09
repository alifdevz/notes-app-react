import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getNote } from "../utils/network-data";
import LoadingDataMessage from  '../components/LoadingDataMessage';
import Detail from "../components/Detail";
import NotFoundPage from './NotFoundPage';

function DetailPage() {
    const { id } = useParams();
    const [note, setNote] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        async function getNoteDetail() {
            const { error, data } = await getNote(id);
            setLoading(false);
            setError(error);
            setNote(data);
        }

        getNoteDetail();
    }, [id]);

    if (isLoading) {
        return <LoadingDataMessage />
    }
    
    return (
        <>
            {error ? <NotFoundPage /> : <Detail title={note.title} createdAt={note.createdAt} body={note.body} />}
        </>
    )
    
}

export default DetailPage;