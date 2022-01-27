import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../../firebase/firebase-config';
import Error from '../../../Utils/Error/Error';
import { ErrorStateProps } from '../../../Utils/Interfaces/Error';

const CreateNote = () => {
  const [titleFocus, setTitleFocus] = useState(false);
  const [error, setError] = useState<ErrorStateProps>({
    isModalOpen: false,
    message: '',
  });

  const clearErr = () => {
    setError({ ...error, isModalOpen: false, message: '' });
  };
  const [note, setNote] = useState({
    title: '',
    content: '',
  });
  const postCollectionRef = collection(db, 'posts');
  const postNote = async (e: any) => {
    e.preventDefault();
    // console.log(auth.currentUser?.email);

    if (
      localStorage.getItem('firebaseEmail') !== undefined ||
      localStorage.getItem('firebaseEmail') !== 'undefined'
    ) {
      try {
        await addDoc(postCollectionRef, {
          title: note.title,
          content: note.content,
          author: auth?.currentUser?.email,
        });
        setNote({ ...note, title: '', content: '' });
        setError({
          ...error,
          isModalOpen: true,
          message: 'Note Created!',
        });
      } catch (err: any) {
        console.log(err);
        setError({
          ...error,
          isModalOpen: true,
          message: 'User not Signed In',
        });
      }
    } else {
      setError({ ...error, isModalOpen: true, message: 'User not Signed In' });
    }
  };

  return (
    <>
      {error.isModalOpen && <Error clearErr={clearErr} error={error} />}
      <div className="flex w-full justify-center">
        <form className="flex flex-col">
          <input
            type="text"
            placeholder="Title"
            value={note.title || ''}
            style={titleFocus ? { display: 'block' } : { display: 'none' }}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            className="mt-4 rounded-t-lg pl-4 pt-4 text-lg font-semibold text-slate-800 drop-shadow-lg placeholder:font-semibold placeholder:text-slate-400 focus:outline-none"
          />
          <textarea
            placeholder="Take a note..."
            rows={4}
            cols={60}
            value={note.content || ''}
            onFocus={() => setTitleFocus(true)}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            className="resize-none rounded-b-lg pl-4 pt-4 text-lg font-semibold text-slate-800 drop-shadow-lg placeholder:font-semibold placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="-mt-4 ml-2 flex h-8 w-8  items-center justify-center bg-emerald-400 text-3xl font-semibold  text-white drop-shadow-lg"
            style={{ borderRadius: '50%' }}
            onClick={postNote}
          >
            <span className="-mt-1">&#43;</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateNote;
