import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Note {
  id: string;
  title: string;
  content: string;
  imgSrc: string;
}

const Trash: React.FC = () => {
  const [deletedNotes, setDeletedNotes] = useState<Note[]>([]);

  useEffect(() => {
    const savedDeletedNotes = localStorage.getItem('deletedNotes');
    if (savedDeletedNotes) {
      setDeletedNotes(JSON.parse(savedDeletedNotes));
    }
  }, []);

  const restoreNote = (id: string) => {
    const savedNotes = localStorage.getItem('notes');
    const notes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];
    const noteToRestore = deletedNotes.find(note => note.id === id);
    if (noteToRestore) {
      notes.unshift(noteToRestore);
      localStorage.setItem('notes', JSON.stringify(notes));
      setDeletedNotes(deletedNotes.filter(note => note.id !== id));
      localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes.filter(note => note.id !== id)));
    }
  };

  const deleteNotePermanently = (id: string) => {
    setDeletedNotes(deletedNotes.filter(note => note.id !== id));
    localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes.filter(note => note.id !== id)));
  };

  return (
    <div className="container mx-auto">
      <h1 className='text-5xl font-sans my-10'>Çöp Kutusu</h1>
      <div className='space-y-4'>
        {deletedNotes.map(note => (
          <div key={note.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
            <div>
              <h2 className="font-bold text-xl">{note.title}</h2>
              <p className="text-gray-700">{note.content}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => restoreNote(note.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Sayfaya Geri Ekle
              </button>
              <button onClick={() => deleteNotePermanently(note.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Geri dön
        </Link>
      </div>
    </div>
  );
}

export default Trash;
