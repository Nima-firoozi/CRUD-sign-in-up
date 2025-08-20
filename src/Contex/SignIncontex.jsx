"use client";

import React, { useState, createContext, useContext } from "react";

const MyContext = createContext();

export default function SignInProvider({ children }) {
  const [signIn, setSignIn] = useState(true);

  const signInControl = () => {
    setSignIn((prevSignIn) => !prevSignIn);
  };
  return (
    <MyContext.Provider value={{ signIn, signInControl }}>
      {children}
    </MyContext.Provider>
  );
}
export const useSignIn = () => useContext(MyContext);
