import Link from "next/link";
import React from "react";

export default function NotValidPage() {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <p className="text-4xl font-bold text-amber-50">
        We couldn't verify your sign in attempt.
      </p>
      <Link
        href="/"
        className="p-5 rounded-3xl hover:bg-amber-50 hover:text-black hover:border-amber-50 duration-500 border-4 border-amber-50 text-center text-4xl font-bold mt-4">
        BACK
      </Link>
    </div>
  );
}
