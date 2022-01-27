import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase-config';
import Note from '../Note/Note';
import { NoteProps } from '../../../Utils/Interfaces/Notes';

const ReadNotes = () => {
  const [notes, setNotes] = useState<any>([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'));
    const unsub = onSnapshot(q, (snap) => {
      let postArr: any = [];
      snap.forEach((doc) => {
        postArr.push({ ...doc.data(), id: doc.id });
      });
      setNotes(postArr);
      // console.log(postArr);
    });
    // const get = async () => {
    // const querySnapshot: any = await getDocs(collection(db, 'posts'));
    // querySnapshot.forEach((doc: any) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   // console.log(doc.id);
    //   const obj = {
    //     data: doc.data(),
    //     id: doc.id,
    //   };
    //   setNotes((oldNotes: any) => [...oldNotes, obj]);
    // });
    // };
    // get();

    return () => {
      unsub();
      setNotes([]);
    };
  }, []);
  return (
    <div
      className=" mx-8 my-12 grid place-content-center gap-4"
      style={{ gridTemplateColumns: 'repeat(auto-fill, 26rem)' }}
    >
      {notes &&
        notes.map((note: NoteProps, index: number) => (
          <Note note={note} key={note?.id + index} />
        ))}
    </div>
  );
};

export default ReadNotes;
