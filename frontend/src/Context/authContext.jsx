/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from 'react';

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

const initial_state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

export const AuthContext = createContext(initial_state);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial_state);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);


  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
