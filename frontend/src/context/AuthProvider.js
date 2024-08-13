import React, { createContext, useContext, useEffect } from 'react';
import { useAtom } from 'jotai';
import { authAtom } from './Atoms';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useAtom(authAtom);
    const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setAuth({
          isAuthenticated: true,
          token,
          user: JSON.parse(localStorage.getItem('user')),
        });
      } 
    } catch (error) { 
      console.error('Failed to initialize authentication state:', error);
      logout();
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAuth]);

  const login = (token, user) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setAuth({ isAuthenticated: true, token, user });
      router.push('/');
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAuth({ isAuthenticated: false, token: '', user: null });
      router.push('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
