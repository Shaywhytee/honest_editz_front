import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem('token') || "";
  const [token, setToken] = useState(initialToken);
  const [loggedIn, setLoggedIn] = useState(!!initialToken);
  const [loginError, setLoginError] = useState(false);

  const login = (newToken) => {
    setToken(newToken);
    setLoggedIn(true);
    setLoginError(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken("");
    setLoggedIn(false);
    setLoginError(false);
  };

  
  useEffect(() => {
    console.log(loggedIn); // Log the value of loggedIn in subsequent renders
  }, [loggedIn]);
  
  return (
    <AuthContext.Provider
      value={{ token, login, logout, loggedIn, setLoginError}}
    >
      {children}
    </AuthContext.Provider>
  );
};