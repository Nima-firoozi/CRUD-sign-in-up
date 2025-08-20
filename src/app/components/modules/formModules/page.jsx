import React from "react";
import Form from "./Form";
import { Bounce, ToastContainer } from "react-toastify";

export default function page() {
  return (
    <section className="w-[100vw] h-[100vh] flex items-center justify-center formback perspective-distant">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Form />
    </section>
  );
}
