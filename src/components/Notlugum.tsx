import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { FaArrowLeftLong, FaArrowRightLong, FaTrashCan } from 'react-icons/fa6';

interface Note {
  id: string;
  title: string;
  content: string;
  imgSrc: string;
}

const Notlugum: React.FC = () => {
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

  const [open, setOpen] = useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  }

  return (
    <>
      <div className='container mx-auto'>
        <div className="mb-40 mt-10 flex justify-between">
          <h1 className='text-5xl font-sans font-bold'>Notlugum</h1>
          <div className="space-x-4">
            <Link to="/createnote">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Not Oluştur
              </button>
            </Link>

          </div>
        </div>
        <div className='flex gap-10 flex-wrap'>
          {notes.map(note => (
            <div key={note.id} className="max-w-sm w-full sm:w-80 h-96 rounded overflow-hidden shadow-lg hover:shadow-2xl duration-300 mb-4 relative">
              <Link to={`/note/${note.id}`}>
                <img className="w-full h-48 object-cover" src={note.imgSrc} alt={note.title} />
                <div className="px-6 py-4 h-48 overflow-hidden">
                  <div className="font-bold text-xl mb-2">{note.title}</div>
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
      <div className="relative">
        <FaArrowRightLong className="fixed top-4 left-4 cursor-pointer hover:text-blue-500 duration-300 text-[20px]" onClick={toggleSlider} />
        <Transition show={open}>
          <Dialog className="relative z-10" onClose={setOpen}>
            <Transition.Child
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                  <Transition.Child
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                      <Transition.Child
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute right-0 top-0">
                          <FaArrowLeftLong className='absolute top-4 left-4 cursor-pointer hover:text-blue-500 duration-300 text-[20px]' onClick={() => setOpen(false)} />
                        </div>
                      </Transition.Child>
                      <div className="flex h-full flex-col bg-white py-6 shadow-xl">
                        <div className="px-4 sm:spx-6">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">Notluğum</Dialog.Title>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <div className="flex justify-around mb-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              Tüm Notlar
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              Önemli Notlar
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-end mt-auto px-4 sm:px-6">
                          <Link to="/trash">
                            <FaTrashCan className='cursor-pointer hover:text-blue-700 text-[20px] duration-300' />
                          </Link>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}

export default Notlugum;
