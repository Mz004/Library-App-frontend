import { createContext, useState } from 'react';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <BooksContext.Provider value={{ books, setBooks, selectedBook, setSelectedBook }}>
      {children}
    </BooksContext.Provider>
  );
};
