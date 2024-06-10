import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Note {
    id: string;
    title: string;
    content: string;
}

const NoteDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [note, setNote] = useState<Note | null>(null);

    useEffect(() => {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            const notes: Note[] = JSON.parse(savedNotes);
            const note = notes.find(note => note.id === id);
            setNote(note || null);
        }
    }, [id]);

    if (!note) {
        return <div>Note not found</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="max-w-3xl mx-auto my-10 p-4 rounded shadow-lg">
                <div className="px-6 py-4">
                    <div className="font-bold text-3xl mb-4">{note.title}</div>
                    <p className="text-gray-700 text-lg">{note.content}</p>
                </div>
                <div className="flex justify-end mt-4">
                    <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Geri
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NoteDetail;
