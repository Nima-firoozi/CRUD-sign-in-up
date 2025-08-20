"use client";
import UpFormProvider from "@/Contex/UpFormcontex";
import React from "react";
import UsersTable from "./UsersTable";
import UpForm from "./UpForm";
import Link from "next/link";
export default function ValidPage() {
  return (
    <UpFormProvider>
      <div className="w-full relative h-[100vh] flex flex-col items-center gap-7 justify-start p-10">
        <h2 className="w-full text-center text-amber-50 text-5xl font-bold">
          USERS
        </h2>
        <Link
          href="/"
          className="absolute font-bold text-white text-3xl p-5 border-white border-4 top-2 left-2 hover:bg-white hover:text-black duration-500 rounded-2xl">
          Back
        </Link>
        <UsersTable />
        <UpForm />
      </div>
    </UpFormProvider>
  );
}
