import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const storedAuth = JSON.parse(localStorage.getItem('auth'));
  const [auth, setAuth] = useState(storedAuth || { isAuthenticated: false, token: null });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated && storedAuth) {
      setAuth(storedAuth);
    }
  }, [auth, storedAuth]);

  const login = (token) => {
    const newAuth = { isAuthenticated: true, token };
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
  };

  const setAuthentication = () => {
    setAuth(storedAuth || { isAuthenticated: false, token: null });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, token: null });
    localStorage.removeItem('auth');
  };

  const errorHandler = (error) => {
    setError(error);
  };

  const Loader = (value) => {
    setIsLoading(value);
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, error, errorHandler, isLoading, Loader, setAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};
