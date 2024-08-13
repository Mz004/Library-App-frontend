import { atom } from 'jotai';

// Atom to hold the list of books
export const booksAtom = atom([]);

// Atom to hold the search query parameters
export const searchQueryAtom = atom({
  title: '',
  author: '',
  category: '',
});

// Atom to hold the current user's state
export const userStateAtom = atom(null);

// Atom to set the current user's state
export const setUserAtom = atom(
  (get) => get(userStateAtom),
  (get, set, user) => set(userStateAtom, user)
);

// Atom to hold the list of favorite books
export const favoritesAtom = atom([]);

// Atom to hold authentication state
export const authAtom = atom({
  isAuthenticated: false,
  token: '',
  user: null,
});