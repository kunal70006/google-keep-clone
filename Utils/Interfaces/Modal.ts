import { Dispatch, SetStateAction } from 'react';

export interface ModalProps {
  setIsModalOpen: Dispatch<SetStateAction<isModalOpen>>;
  isModalOpen: isModalOpen;
  closeModal(): void;
}

export interface isModalOpen {
  loginModal?: boolean;
  registerModal?: boolean;
}
