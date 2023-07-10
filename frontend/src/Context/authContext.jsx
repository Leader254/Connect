import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentuser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = () => {
    setCurrentUser({ id: 1, username: 'Sam Dev', profilePic: 'https://avatars.githubusercontent.com/u/105350534?s=400&u=c7ff6e1bce4f9113d125619eb28fa7520a8022e4&v=4'});

  };

useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentuser));
},[currentuser])

  return (
    <AuthContext.Provider value={{ currentuser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
