import { useState } from 'react';
import Image from 'next/image';
import pencil from '../../../public/pencil.png';
import NoteModal from '../NoteModal/NoteModal';
import { NextPage } from 'next';
import { NotesProps } from '../../../Utils/Interfaces/Notes';

const Note: NextPage<NotesProps> = ({ note }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <NoteModal note={note} isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : null}
      <div
        onClick={() => setIsOpen(true)}
        className=" mx-4 my-8 flex cursor-pointer flex-col rounded-lg bg-white px-4 pt-4 text-slate-800 transition-all duration-150 ease-linear hover:-translate-y-4 hover:shadow-white hover:drop-shadow-lg"
        style={{ minHeight: '8rem', minWidth: '24rem' }}
      >
        <div className="flex justify-between break-words">
          <h1 className=" text-xl font-semibold">{note.title}</h1>
          <div>
            <Image src={pencil} alt="edit icon" height={16} width={16} />
          </div>
        </div>
        <div className="break-words">
          <p className="mt-2 text-lg">{note.content}</p>
        </div>
        <div className="mb-4 flex w-full justify-end break-words">
          <p className=" mt-8 font-light italic">Author: {note.author}</p>
        </div>
      </div>
    </>
  );
};

export default Note;
