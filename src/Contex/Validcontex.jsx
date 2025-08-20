"use client";

import React, { useState, createContext, useContext } from "react";

const MyContext = createContext();

export default function ValidProvider({ children }) {
  const [valid, setValid] = useState(true);

  const validTrue = () => {
    setValid(true);
  };
  const validFalse = () => {
    setValid(false);
  };
  return (
    <MyContext.Provider value={{ valid, validTrue, validFalse }}>
      {children}
    </MyContext.Provider>
  );
}
export const useValid = () => useContext(MyContext);
