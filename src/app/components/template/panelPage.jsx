"use client";
import React from "react";
import { useValid } from "@/Contex/Validcontex";
import NotValidPage from "../modules/panelModules/NotValidPage";
import ValidPage from "../modules/panelModules/ValidPage";
import { Bounce, ToastContainer } from "react-toastify";
export default function panelPage() {
  const { valid } = useValid();
  if (valid) {
    return (
      <>
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
        <ValidPage />
      </>
    );
  } else {
    return <NotValidPage />;
  }
}
