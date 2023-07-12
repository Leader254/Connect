/* eslint-disable react/prop-types */
// import axios from 'axios';
// import { createContext, useEffect, useState, useReducer } from 'react';
import { createContext, useEffect, useReducer } from 'react';

// import { json } from 'react-router-dom';

// export const AuthContext = createContext();

// user context
const reducer = (state, action) => {
  switch (action.type) {
    case "login success":
      return {
        user: action.payload,
      }
    case "login failed":
      return {
        user: null,
      }
    case "logout":
      return {
        user: null,
      }
    default:
      return state;
  }
}

// export const AuthContextProvider = ({ children }) => {
//   const [currentuser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem('user')) || null
//   );
const initial_state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

export const AuthContext = createContext(initial_state);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial_state);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);




  // const login = async (inputs) => {
  //   const res = await axios.post("http://localhost:3000/api/auth/login", inputs, {
  //     withCredentials: true,
  //   });

  //   setCurrentUser(res.data)
  // };



  // useEffect(() => {
  //   localStorage.setItem('user', JSON.stringify(currentuser));
  // }, [currentuser])

  return (
    // <AuthContext.Provider value={{ currentuser, login }}>
    //   {children}
    // </AuthContext.Provider>
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
