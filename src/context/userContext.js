// intilisation of context
// initial value
// reducer function
// provider

import { createContext, useEffect, useReducer } from "react";

export const userContext = createContext(null);

const initialState = JSON.parse(localStorage.getItem("user")) || {
  user: null,
  isAuth: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const data = {
        user: action.payload,
        isAuth: true,
      };
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    case "LOGOUT":
      localStorage.clear();
      return {
        user: null,
        isAuth: false,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    console.log("user context", state);
  }, [state]);

  return (
    <userContext.Provider value={[state, dispatch]}>
      {children}
    </userContext.Provider>
  );
};
