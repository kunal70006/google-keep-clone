import { Dispatch, SetStateAction } from 'react';
import { isModalOpen } from './Modal';

export interface NavbarProps {
  setIsModalOpen: Dispatch<SetStateAction<isModalOpen>>;
  isModalOpen: isModalOpen;
  user: {
    email?: string;
  };
}
