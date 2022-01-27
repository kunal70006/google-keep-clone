import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import deleteIcon from '../../../public/delete.png';
import { auth, db } from '../../firebase/firebase-config';
import Error from '../../../Utils/Error/Error';
import { NextPage } from 'next';
import { NoteModalProps } from '../../../Utils/Interfaces/Notes';

const NoteModal: NextPage<NoteModalProps> = ({ isOpen, setIsOpen, note }) => {
  const [noteData, setNoteData] = useState({
    title: note?.title,
    content: note?.content,
  });

  const [error, setError] = useState({
    isModalOpen: false,
    message: '',
  });

  const clearErr = () => {
    setError({ ...error, isModalOpen: false, message: '' });
  };

  //   console.log(note);

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const user = auth.currentUser?.email;
    if (user === note?.author) {
      try {
        const res = await deleteDoc(doc(db, 'posts', note.id));
        // console.log(res);
        setError({
          ...error,
          isModalOpen: true,
          message: 'Note deleted successfully!',
        });
        setIsOpen(false);
      } catch (err) {
        console.log(err);
        setError({
          ...error,
          isModalOpen: true,
          message: 'Unable to delete this note :/',
        });
      }
    } else {
      setError({
        ...error,
        isModalOpen: true,
        message: 'You are not the author of this note.',
      });
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const docRef = doc(db, 'posts', note?.id);
    const user = auth.currentUser?.email;
    if (user === note?.author) {
      try {
        const res = await updateDoc(docRef, {
          content: noteData.content,
          title: noteData.title,
        });
        setError({
          ...error,
          isModalOpen: true,
          message: 'Note updated successfully!',
        });
        // console.log(res);
        setIsOpen(false);
      } catch (err) {
        console.log(err);
        setError({
          ...error,
          isModalOpen: true,
          message: 'Unable to update this note :/',
        });
      }
    } else {
      setError({
        ...error,
        isModalOpen: true,
        message: 'You are not the author of this note.',
      });
    }
  };

  return (
    <>
      {error.isModalOpen && <Error clearErr={clearErr} error={error} />}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className=" my-8 inline-block w-full max-w-2xl  transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle text-2xl shadow-xl transition-all">
                <form>
                  <Dialog.Title
                    as="h3"
                    className=" font-medium leading-6 text-gray-900"
                  >
                    <input
                      type="text"
                      value={noteData.title}
                      onChange={(e) =>
                        setNoteData({ ...noteData, title: e.target.value })
                      }
                      className="mt-4 w-2/3 rounded-lg  py-2 pl-4 font-semibold text-slate-800 placeholder:font-semibold placeholder:text-slate-400 focus:outline-none"
                    />
                  </Dialog.Title>
                  <div className="">
                    <textarea
                      rows={4}
                      cols={60}
                      value={noteData.content}
                      onChange={(e) =>
                        setNoteData({ ...noteData, content: e.target.value })
                      }
                      className="resize-none rounded-b-lg pl-4 pt-4 text-lg font-semibold text-slate-800  focus:outline-none"
                    />
                  </div>

                  <div className="mt-4 mr-8 flex items-center justify-between ">
                    <button
                      onClick={handleDelete}
                      className="border-transparent transition ease-in hover:-translate-y-2 focus:outline-none"
                    >
                      <Image
                        src={deleteIcon}
                        alt="delete icon"
                        height={24}
                        width={24}
                      />
                    </button>
                    <button
                      onClick={handleUpdate}
                      type="submit"
                      className="rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    >
                      Done
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NoteModal;
