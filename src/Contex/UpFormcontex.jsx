"use client";

import React, { useState, createContext, useContext } from "react";

const MyContext = createContext();

export default function UpFormProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [dataUp, setDataUp] = useState({});

  const openForm = (data) => {
    setDataUp(data);
    setOpen(true);
  };
  const closeForm = () => {
    setOpen(false);
  };
  return (
    <MyContext.Provider value={{ open, openForm, closeForm, dataUp }}>
      {children}
    </MyContext.Provider>
  );
}
export const useUpForm = () => useContext(MyContext);
