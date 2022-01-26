import Image from 'next/image';
import atom from '../../../public/atom.png';
import database from '../../../public/database.png';
import google from '../../../public/google.png';
import { NextPage } from 'next';
import { NavbarProps } from '../../../Utils/Interfaces/Navbar';
import { auth } from '../../firebase/firebase-config';
import { signOut } from 'firebase/auth';

const Navbar: NextPage<NavbarProps> = ({
  setIsModalOpen,
  isModalOpen,
  user,
}) => {
  const handleBtn = async () => {
    if (user === undefined || user === null) {
      setIsModalOpen({ ...isModalOpen, loginModal: true });
    } else {
      await signOut(auth);
      localStorage.clear();
    }
  };
  return (
    <div className="flex flex-col items-center">
      <nav className="mt-20 flex h-20 items-center justify-center">
        <div>
          <Image src={google} alt="google keep icon" height={48} width={48} />
        </div>
        <p className="mx-4 -mt-4 text-2xl font-bold text-slate-800">+</p>
        <div>
          <Image src={atom} alt="next js icon" height={48} width={48} />
        </div>
        <p className="mx-4 -mt-4 text-2xl font-bold text-slate-800">+</p>
        <div>
          <Image src={database} alt="firebase icon" height={48} width={48} />
        </div>
      </nav>
      <div className="mb-4 mt-2 flex w-60 justify-around">
        <button
          onClick={handleBtn}
          className="rounded-lg bg-emerald-400 px-5 py-2 text-lg font-semibold text-white transition delay-100 ease-in hover:bg-emerald-500 hover:shadow-md hover:shadow-emerald-500"
        >
          {user?.email !== undefined ? 'Sign Out' : 'Login'}
        </button>
        <button
          onClick={() =>
            setIsModalOpen({ ...isModalOpen, registerModal: true })
          }
          className="rounded-lg bg-emerald-400 px-5 py-2 text-lg font-semibold text-white transition delay-100 ease-in hover:bg-emerald-500 hover:shadow-md hover:shadow-emerald-500"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Navbar;
