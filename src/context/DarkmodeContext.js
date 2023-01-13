// intilisation of context
// initial value
// reducer function
// provider

import { createContext, useEffect, useReducer } from "react";

const light = {
  background: "#fff",
  font1: "#000",
  font2: "#white",
  pinchat: "#F7F7F7",
  pinSelect: "#2F80ED",
};
const dark = {
  background: "#000",
  font1: "#fff",
  font2: "#000",
  pinchat: "#2F80ED",
  pinSelect: "#F7F7F7",
};

export const darkContext = createContext(null);

const initialState = JSON.parse(localStorage.getItem("theme")) || {
  ...light,
};

const darkReducer = (state, action) => {
  switch (action.type) {
    case "MAKE_DARK":
      localStorage.setItem("theme", JSON.stringify(dark));
      return dark;
    case "MAKE_LIGHT":
      localStorage.setItem("theme", JSON.stringify(light));
      return light;
    default:
      return state;
  }
};

export const DarkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(darkReducer, initialState);

  useEffect(() => {
    console.log("theme context", state);
  }, [state]);

  return (
    <darkContext.Provider value={[state, dispatch]}>
      {children}
    </darkContext.Provider>
  );
};
