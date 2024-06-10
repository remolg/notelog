import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashCan } from 'react-icons/fa6';
import SliderMenu from './SliderMenu';

interface Note {
  id: string;
  title: string;
  content: string;
  imgSrc: string;
  date: string;
  isChecked: boolean;
}

const ImportantNote: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    const savedDeletedNotes = localStorage.getItem('deletedNotes');
    const deletedNotes: Note[] = savedDeletedNotes ? JSON.parse(savedDeletedNotes) : [];
    const noteToDelete = notes.find(note => note.id === id);
    if (noteToDelete) {
      deletedNotes.unshift(noteToDelete);
      localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes));
    }
  };

  return (
    <>
      <div className='container mx-auto'>
        <div className="mb-40 mt-10 flex justify-between">
          <h1 className='text-5xl font-sans font-bold'>Önemi Notlar

          </h1>
          <div className="space-x-4">
            <Link to="/createnote">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Not Oluştur
              </button>
            </Link>

          </div>
        </div>
        <div className='flex gap-10 flex-wrap'>
          {notes.filter(note => note.isChecked).map(note => (
            <div key={note.id} className={`max-w-sm w-full sm:w-80 h-96 rounded overflow-hidden shadow-lg hover:shadow-2xl duration-300 mb-4 relative ${note.isChecked ? "bg-blue-300" : ""}`}>
              <Link to={`/note/${note.id}`}>
                <img className="w-full h-48 object-cover" src={note.imgSrc} alt={note.title} />
                <div className="px-6 py-4 h-48 overflow-hidden">
                  <div className='flex justify-between'>
                    <div className="font-bold text-xl mb-2">{note.title}</div>
                    <div>{note.date}</div>
                  </div>
                  <p className="text-gray-700 text-base">
                    {note.content.length > 100 ? note.content.substring(0, 100) + "... devamını okumak için tıkla" : note.content}
                  </p>
                </div>
              </Link>
              <FaTrashCan onClick={() => deleteNote(note.id)} className='absolute bottom-4 right-4 text-black hover:text-red-500 cursor-pointer duration-300' />
            </div>
          ))}
        </div>
      </div>
      <SliderMenu />
    </>
  );
}

export default ImportantNote
  ;
