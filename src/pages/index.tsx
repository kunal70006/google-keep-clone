import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase-config';
import Navbar from '../components/Navbar/Navbar';
import CreateNote from '../components/CreateNote/CreateNote';
import LoginModal from '../components/LoginModal/LoginModal';
import RegisterModal from '../components/RegisterModal/RegisterModal';
import { isModalOpen } from '../../Utils/Interfaces/Modal';
import { onAuthStateChanged } from 'firebase/auth';
import ReadNotes from '../components/ReadNotes/ReadNotes';
import Head from 'next/head';

export default function Home() {
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState<isModalOpen>({
    loginModal: false,
    registerModal: false,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
      // console.log(currentUser);
      localStorage.setItem('firebaseEmail', currentUser?.email);
    });

    return () => setUser({});
  }, []);

  function closeModal() {
    const obj = {
      loginModal: false,
      registerModal: false,
    };
    setIsModalOpen(obj);
  }

  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="IE-edge" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <title>Google Keep Clone</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-orange-50">
        <Navbar
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          user={user}
        />
        <CreateNote />
        {isModalOpen.loginModal ? (
          <LoginModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            closeModal={closeModal}
          />
        ) : (
          <RegisterModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            closeModal={closeModal}
          />
        )}
        <ReadNotes />
      </div>
    </>
  );
}
