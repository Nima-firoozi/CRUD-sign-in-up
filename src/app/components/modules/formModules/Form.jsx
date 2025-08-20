"use client";

import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useSignIn } from "@/Contex/SignIncontex";

export default function Form() {
  const { signIn, signInControl } = useSignIn();

  return (
    <div
      className={` relative min-w-100 w-[30%] min-h-125 h-1/2 border-4 border-[#ffffffa6] rounded-3xl  backdrop-blur-[300px] shadow-2xl *:w-full *:h-full *:flex-wrap *:content-center *:justify-center ${
        signIn ? "rotate-y-0" : "rotate-y-180"
      } *:gap-5 duration-500 perspective-distant`}>
      <SignIn />
      <SignUp />
    </div>
  );
}
