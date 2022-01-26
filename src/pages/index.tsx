import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../components/Navbar/Navbar';
import CreateNote from '../components/CreateNote/CreateNote';
import LoginModal from '../components/LoginModal/LoginModal';
import RegisterModal from '../components/RegisterModal/RegisterModal';

import { onAuthStateChanged } from 'firebase/auth';
import ReadNotes from '../components/ReadNotes/ReadNotes';

export default function Home() {
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState({
    loginModal: false,
    registerModal: false,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
      console.log(currentUser);
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
  );
}
