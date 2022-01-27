import { Dispatch, SetStateAction } from 'react';

export interface NotesProps {
  note: NoteProps;
}

export interface NoteProps {
  id: string;

  title: string;
  author: string;
  content: string;
}

export interface NoteModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  note: NoteProps;
}
