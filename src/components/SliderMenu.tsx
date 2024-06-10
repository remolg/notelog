import { Dialog, Transition } from '@headlessui/react';
import { useState } from 'react';
import { FaArrowLeftLong, FaArrowRightLong, FaTrashCan } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const SliderMenu = () => {
    const [open, setOpen] = useState(false);

    const toggleSlider = () => {
        setOpen(!open);
    }
    return (
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
                                            <div className="container mx-auto px-4 sm:px-6">
                                                <div className="px-6 py-4">
                                                    <h2 className="text-xl font-semibold text-gray-900">Notluğum</h2>
                                                </div>
                                                <div className="flex flex-col">
                                                    <table className="min-w-full">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <Link to="/" className="block w-full text-left py-3 px-6 mb-2 bg-gray-100 hover:bg-gray-200 focus:bg-gray-100 transition-colors duration-200">
                                                                        Tüm Notlar
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <Link to="/importantnote" className="block w-full text-left py-3 px-6 bg-gray-100 hover:bg-gray-200 focus:bg-gray-100 transition-colors duration-200">
                                                                        Önemli Notlar
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
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
    )
}

export default SliderMenu