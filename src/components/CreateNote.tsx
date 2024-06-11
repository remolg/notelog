import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  imgSrc: boolean | string;
  isChecked: boolean;
}
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const CreateNote: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);
  const [imgSrc, setImgSrc] = useState(false)
  const navigate = useNavigate();

  const handleImageAdd = () => {
    setImgSrc(!imgSrc);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [title, setTitle] = useState<string>('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTitle(inputValue);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      isChecked,
      date: formattedDate,
      imgSrc
    };

    const savedNotes = localStorage.getItem('notes');
    const notes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];
    notes.unshift(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto sm:w-[768px] border mt-10 p-10 rounded-lg shadow-lg">
      <div className='flex flex-col'>
        <label htmlFor="title" className="block font-semibold text-xl text-gray-600">
          Not Başlığı
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
          className="block w-2/3 mt-4 flex-1 border py-2 pl-1 text-sm text-gray-900 sm:text-base"
          maxLength={24}
        />
      </div>
      <div className='mt-10'>
        <label htmlFor="title" className="block font-semibold text-xl text-gray-600">
          Almak İstediğin Not
        </label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          required
          rows={4}
          className="block w-full mt-4 rounded-md border py-2 pl-1 text-sm text-gray-900 sm:text-base"
        />
      </div>
      <fieldset className='mt-10'>
        <legend className="font-semibold text-xl text-gray-600 mt-10">Öncelik</legend>
        <div className="mt-6 space-y-6">
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input onChange={handleCheckboxChange} id="comments" name="comments" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="comments" className="font-medium text-gray-900">Önemli</label>
              <p className="text-gray-500">Eğer notunuz renkli bir şekilde gözükmesini isterseniz işaretleyin</p>
            </div>
          </div>
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input onChange={handleImageAdd} id="comments" name="comments" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="comments" className="font-medium text-gray-900">Görsel Koy</label>
              <p className="text-gray-500">Eğer notunuzda görsel olmasını istiyorsaniz işaretleyin</p>
            </div>
          </div>
        </div>
      </fieldset>
      <div className='flex justify-end items-center mt-4 gap-3'>
        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Oluştur
        </button>
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Geri dön
        </Link>
      </div>
    </form>
  );
}

export default CreateNote;








