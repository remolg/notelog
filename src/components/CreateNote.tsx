import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface Note {
  id: string;
  title: string;
  content: string;
  imgSrc: string;
}

const CreateNote: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 50) {
      setTitle(inputValue);
    }
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      imgSrc: "https://v1.tailwindcss.com/img/card-top.jpg"
    };

    const savedNotes = localStorage.getItem('notes');
    const notes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];
    notes.unshift(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));

    navigate('/');
  };

  return (
    <div className='container mx-auto'>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className=" border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                  Başlık
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={handleTitleChange}
                      required
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      maxLength={40}
                    />
                  </div>
                  {title.length > 50 && (
                    <p className="text-red-500 text-sm mt-1">Başlık maksimum 50 karakter olmalıdır.</p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  About
                </label>
                <div className="my-2">
                  <textarea
                    id="content"
                    value={content}
                    onChange={handleContentChange}
                    required
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className='flex gap-3'>
                  <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Oluştur
                  </button>
                  <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Geri dön
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div >
  );
}

export default CreateNote;
