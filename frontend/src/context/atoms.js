import { atom } from 'jotai';

export const booksAtom = atom([]);
export const searchQueryAtom = atom({
  title: '',
  author: '',
  category: '',
});
