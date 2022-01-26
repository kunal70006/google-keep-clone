import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase-config';

const ReadNotes = () => {
  const [notes, setNotes] = useState([]);
  let tempArr: any = [];
  useEffect(() => {
    const get = async () => {
      const querySnapshot: any = await getDocs(collection(db, 'posts'));
      querySnapshot.forEach((doc: any) => {
        // doc.data() is never undefined for query doc snapshots
        tempArr.push(doc.data());
      });

      setNotes(tempArr);
    };
    get();
    console.log(notes);
  }, [tempArr]);
  return (
    // <div className=" mx-8 my-12 flex flex-wrap justify-center">
    <div
      className=" mx-8 my-12 grid place-content-center gap-4"
      style={{ gridTemplateColumns: 'repeat(auto-fill, 26rem)' }}
    >
      {notes &&
        notes.map((note: any) => (
          <div
            className=" mx-4 my-8 flex cursor-pointer flex-col rounded-lg bg-white px-4 pt-4 text-slate-800 transition-all duration-150 ease-linear hover:-translate-y-4 hover:shadow-white hover:drop-shadow-lg"
            style={{ minHeight: '8rem', minWidth: '24rem' }}
          >
            <div className="break-words">
              <h1 className=" text-xl font-semibold">{note.title}</h1>
            </div>
            <div className="break-words">
              <p className="mt-2 text-lg">{note.content}</p>
            </div>
            <div className="mb-4 flex w-full justify-end break-words">
              <p className="mt-8 font-light italic">Author: {note.author}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ReadNotes;
