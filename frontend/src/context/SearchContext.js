import { createContext, useState } from 'react';

// search query Context
export const SearchContext = createContext();

export const SearchQueryProvider = ({ children }) => {
  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};