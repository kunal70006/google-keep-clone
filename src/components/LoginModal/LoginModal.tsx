import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { NextPage } from 'next';
import { ModalProps } from '../../../Utils/Interfaces/Modal';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';

const LoginModal: NextPage<ModalProps> = ({
  setIsModalOpen,
  isModalOpen,
  closeModal,
}) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      console.log(user);
    } catch (err: any) {
      console.log(err.message);
    }
    closeModal();
  };
  return (
    <>
      <Transition appear show={isModalOpen.loginModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
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
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity" />
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
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-gray-900"
                >
                  Login
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    className="mt-4 w-2/3 rounded-lg border-2 py-2 pl-4 font-semibold text-slate-800 placeholder:font-semibold placeholder:text-slate-400 focus:outline-none"
                  />
                  <input
                    type="password"
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    placeholder="Password"
                    className="mt-4 w-2/3 rounded-lg border-2 py-2 pl-4 font-semibold text-slate-800 placeholder:font-semibold placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    onClick={loginUser}
                  >
                    Login
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LoginModal;
